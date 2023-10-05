'use client';
import { useHistoryBook } from '@/hooks/firebase/useHistoryBook';
import useSWR from 'swr';
import {
  AddBtn,
  BtnConsole,
  DeleteBtn,
  Description,
  HeaderTr,
  InnerContainer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Title,
  Tr,
  UpdateBtn
} from '@/app/admin/styles';
import { useRouter } from 'next/navigation';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import React from 'react';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';
import { BoardData } from '@/app/admin/board/page';

const columnHelper = createColumnHelper<BoardData>();
export default function NewFamilyPage() {
  const { getHistoryBook, deleteHistoryBook } = useHistoryBook();
  const route = useRouter();
  const { getCloudImg } = useCloudinary();
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
      header: () => <span>제목</span>,
      cell: info => info.getValue(),
      size: 600
    }),
    columnHelper.accessor('createDate', {
      header: () => <span>생성일</span>,
      cell: info => info.getValue()
    }),
    columnHelper.accessor('idx', {
      header: () => <span>관리</span>,
      cell: info => (
        <BtnConsole>
          <UpdateBtn onClick={() => handleUpdateHistoryBook(info.getValue())}>
            수정
          </UpdateBtn>
          <DeleteBtn onClick={() => handleDeleteHistoryBook(info.getValue())}>
            삭제
          </DeleteBtn>
        </BtnConsole>
      )
    })
  ];

  const table = useReactTable({
    data: tableData || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <LocalLoader isLoading={isLoading}>
      <InnerContainer>
        <Title>
          엘범 사진 추가
          <AddBtn onClick={handleAddHistoryBook}>사진 추가</AddBtn>
        </Title>
        <Description>공동체 소식의 엘범에 사진을 추가 합니다.</Description>
        <TableContainer>
          <Table>
            <Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <HeaderTr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Th
                      key={header.id}
                      className={'board'}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Th>
                  ))}
                </HeaderTr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map(row => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </InnerContainer>
    </LocalLoader>
  );
}
