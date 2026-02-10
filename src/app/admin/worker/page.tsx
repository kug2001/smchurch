'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from '@/components/ui/table';
import useSWR from 'swr';
import { useWorker, WorkerGroup } from '@/hooks/firebase/useWorker';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { AdminLoader } from '@/components/admin/AdminLoader';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const columnHelper = createColumnHelper<WorkerGroup>();

export default function WorkerAdminPage() {
  const { getWorker, deleteWorker } = useWorker();
  const route = useRouter();
  const { data: tableData, isLoading } = useSWR<WorkerGroup[]>(
    'worker',
    getWorker
  );

  const handleAdd = () => route.push('/admin/worker/add');

  const handleDelete = (idx: string) => {
    deleteWorker(idx).then(() => {
      window.location.reload();
    });
  };

  const handleUpdate = (idx: string) => {
    const queryData = `?idx=${idx}`;
    window.location.replace('/admin/worker/update' + queryData);
  };

  const columns = [
    columnHelper.accessor('job', {
      header: () => '직분',
      size: 120,
      cell: info => <span className="font-medium">{info.getValue()}</span>
    }),
    columnHelper.accessor('workers', {
      header: () => '이름 목록',
      cell: info => <span className="text-left">{info.getValue()}</span>
    }),
    columnHelper.accessor('order', {
      header: () => '순서',
      size: 80,
      cell: info => info.getValue()
    }),
    columnHelper.accessor('idx', {
      header: () => '관리',
      size: 100,
      cell: info => (
        <div className="flex gap-1.5 justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUpdate(info.getValue())}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => handleDelete(info.getValue())}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    })
  ];

  const table = useReactTable({
    data: tableData || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <AdminLoader isLoading={isLoading}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              임직자 관리
            </h1>
            <p className="text-sm text-muted-foreground">
              교회 임직자 목록을 관리합니다.
            </p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-1.5" />
            임직자 추가
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">임직자 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table className="table-fixed w-full">
                <TableHeader>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead
                          key={header.id}
                          className="text-center"
                          style={
                            header.getSize() !== 150
                              ? { width: `${header.getSize()}px` }
                              : undefined
                          }
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map(row => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <TableCell
                            key={cell.id}
                            className="text-center align-middle"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center text-muted-foreground"
                      >
                        등록된 임직자가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLoader>
  );
}
