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
import { useTestimony } from '@/hooks/firebase/useTestimony';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { AdminLoader } from '@/components/admin/AdminLoader';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import { AdvancedImage } from '@cloudinary/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export interface TestimonyPerson {
  idx: string;
  name: string;
  job: string;
  testimony: string;
  publicId: string;
}

const columnHelper = createColumnHelper<TestimonyPerson>();

export default function TestimonyPage() {
  const { getTestimony, deleteTestimony } = useTestimony();
  const route = useRouter();
  const { getCloudImg } = useCloudinary();
  const { data: tableData, isLoading } = useSWR<TestimonyPerson[]>(
    'testimony',
    getTestimony
  );

  const handleAddTestimony = () => route.push('/admin/testimony/add');

  const handleDeleteTestimony = (idx: string) => {
    deleteTestimony(idx).then(() => {
      window.location.reload();
    });
  };

  const handleUpdateTestimony = (idx: string) => {
    const queryData = `?idx=${idx}`;
    window.location.replace('/admin/testimony/update' + queryData);
  };

  const columns = [
    columnHelper.accessor('publicId', {
      header: () => '사진',
      size: 90,
      cell: info => (
        <AdvancedImage
          //@ts-ignore
          cldImg={getCloudImg(info.getValue())}
          width={72}
          height={72}
          className="rounded-md object-cover mx-auto"
        />
      )
    }),
    columnHelper.accessor('name', {
      header: () => '이름',
      size: 90,
      cell: info => <span className="font-medium">{info.getValue()}</span>
    }),
    columnHelper.accessor('job', {
      header: () => '직분',
      size: 90,
      cell: info => info.getValue()
    }),
    columnHelper.accessor('testimony', {
      header: () => '간증문',
      cell: info => (
        <p className="text-left whitespace-pre-wrap break-words">
          {info.getValue()}
        </p>
      )
    }),
    columnHelper.accessor('idx', {
      header: () => '관리',
      size: 100,
      cell: info => (
        <div className="flex gap-1.5 justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUpdateTestimony(info.getValue())}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => handleDeleteTestimony(info.getValue())}
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
              성도 간증 관리
            </h1>
            <p className="text-sm text-muted-foreground">
              서문교회 성도들의 간증을 관리합니다.
            </p>
          </div>
          <Button onClick={handleAddTestimony}>
            <Plus className="h-4 w-4 mr-1.5" />
            간증 추가
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">간증 목록</CardTitle>
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
                        등록된 간증이 없습니다.
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
