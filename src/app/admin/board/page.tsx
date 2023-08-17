'use client';

import {
  InnerContainer,
  Description,
  Title,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HeaderTr,
  AddBtn,
  UpdateBtn,
  DeleteBtn,
  Table,
  TableContainer,
  BtnConsole
} from '@/app/admin/styles';
import useSWR from 'swr';
import { useBoard } from '@/hooks/firebase/useBoard';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { LocalLoader } from '@/components/atoms/loader/LocalLoader';

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
      header: () => <span>유형</span>,
      cell: info => info.getValue()
    }),
    columnHelper.accessor('title', {
      header: () => <span>제목</span>,
      cell: info => info.getValue()
    }),
    columnHelper.accessor('createDate', {
      header: () => <span>생성일</span>,
      cell: info => info.getValue()
    }),
    columnHelper.accessor('idx', {
      header: () => <span>관리</span>,
      cell: info => (
        <BtnConsole>
          <UpdateBtn onClick={() => handleUpdateBoard(info.getValue())}>
            수정
          </UpdateBtn>
          <DeleteBtn onClick={() => handleDeleteBoard(info.getValue())}>
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
          서문교회 게시판 관리
          <AddBtn onClick={handleAddBoard}>게시판 내용 추가</AddBtn>
        </Title>
        <Description>서문교회 게시판 관리합니다.</Description>
        <TableContainer>
          <Table>
            <Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <HeaderTr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Th key={header.id} className={'board'}>
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
