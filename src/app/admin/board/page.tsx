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
import { useBoard } from '@/hooks/firebase/useBoard';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { AdminLoader } from '@/components/admin/AdminLoader';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export interface BoardData {
  idx: string;
  no: number;
  category: string;
  createDate: string;
  title: string;
  contents: string;
}

const columnHelper = createColumnHelper<BoardData>();

export default function BoardPage() {
  const { getBoard, deleteBoard } = useBoard();
  const route = useRouter();
  const { data: tableData, isLoading } = useSWR('board', getBoard);

  const handleAddBoard = () => route.push('/admin/board/add');

  const handleDeleteBoard = (idx: string) => {
    deleteBoard(idx).then(() => {
      window.location.reload();
    });
  };

  const handleUpdateBoard = (idx: string) => {
    const queryData = `?idx=${idx}`;
    window.location.replace('/admin/board/update' + queryData);
  };

  const columns = [
    columnHelper.accessor('category', {
      header: () => '유형',
      cell: info => (
        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
          {info.getValue()}
        </span>
      )
    }),
    columnHelper.accessor('title', {
      header: () => '제목',
      cell: info => (
        <span className="font-medium text-left">{info.getValue()}</span>
      )
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
            onClick={() => handleUpdateBoard(info.getValue())}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => handleDeleteBoard(info.getValue())}
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
              게시판 관리
            </h1>
            <p className="text-sm text-muted-foreground">
              서문교회 게시판을 관리합니다.
            </p>
          </div>
          <Button onClick={handleAddBoard}>
            <Plus className="h-4 w-4 mr-1.5" />
            게시물 추가
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">게시물 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead key={header.id} className="text-center">
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
                        등록된 게시물이 없습니다.
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
