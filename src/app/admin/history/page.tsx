'use client';
import { useHistoryBook } from '@/hooks/firebase/useHistoryBook';
import useSWR from 'swr';
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
import { useRouter } from 'next/navigation';
import React from 'react';
import { AdminLoader } from '@/components/admin/AdminLoader';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';
import { BoardData } from '@/app/admin/board/page';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const columnHelper = createColumnHelper<BoardData>();
export default function HistoryPage() {
  const { getHistoryBook, deleteHistoryBook } = useHistoryBook();
  const route = useRouter();
  const { data: tableData, isLoading } = useSWR('historyBook', getHistoryBook);

  const handleAddHistoryBook = () => route.push('/admin/history/add');

  const handleDeleteHistoryBook = (id: string) => {
    deleteHistoryBook(id).then(() => {
      window.location.reload();
    });
  };

  const handleUpdateHistoryBook = (id: string) => {
    const queryData = `?id=${id}`;
    window.location.replace('/admin/history/update' + queryData);
  };

  const columns = [
    columnHelper.accessor('title', {
      header: () => '제목',
      cell: info => (
        <span className="font-medium text-left">{info.getValue()}</span>
      ),
      size: 600
    }),
    columnHelper.accessor('createDate', {
      header: () => '생성일',
      cell: info => (
        <span className="text-muted-foreground">{info.getValue()}</span>
      )
    }),
    columnHelper.accessor('idx', {
      header: () => '관리',
      cell: info => (
        <div className="flex gap-1.5 justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUpdateHistoryBook(info.getValue())}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => handleDeleteHistoryBook(info.getValue())}
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
            <h1 className="text-2xl font-semibold tracking-tight">앨범 관리</h1>
            <p className="text-sm text-muted-foreground">
              공동체 소식의 앨범 사진을 관리합니다.
            </p>
          </div>
          <Button onClick={handleAddHistoryBook}>
            <Plus className="h-4 w-4 mr-1.5" />
            앨범 추가
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">앨범 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead
                          key={header.id}
                          className="text-center"
                          style={{ width: `${header.getSize()}px` }}
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
                        등록된 앨범이 없습니다.
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
