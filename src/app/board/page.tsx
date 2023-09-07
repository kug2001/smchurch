'use client';
import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import {
  BoardTitle,
  BodyTr,
  CellLink,
  HeadTr,
  ListContainer,
  ListInfo,
  ListInfoBox,
  ListLink,
  ListTitle,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  THead
} from '@/app/board/Board.styles';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { BoardData } from '@/app/admin/board/page';
import { useBoard } from '@/hooks/firebase/useBoard';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
// import { ContentBlock, EditorState, RichUtils } from 'draft-js';

const columnHelper = createColumnHelper<BoardData>();

export default function BoardPage() {
  const { getBoard } = useBoard();
  const route = useRouter();
  const { data: tableData, isLoading } = useSWR('board', getBoard);

  const columns = [
    columnHelper.accessor('category', {
      header: () => <span>유형</span>,
      cell: info => info.getValue()
    }),
    columnHelper.accessor('title', {
      header: () => <span>제목</span>,
      cell: info => (
        <CellLink href={`/board/${info.row.original.idx}`}>
          <span>{info.getValue()}</span>
        </CellLink>
      )
    }),
    columnHelper.accessor('createDate', {
      header: () => <span>생성일</span>,
      cell: info => info.getValue()
    })
  ];

  const table = useReactTable({
    data: tableData || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <LocalLoader isLoading={isLoading}>
      <SectionContainer bgColor={'#fff'}>
        <InnerSection>
          <BoardTitle>서문교회 소식</BoardTitle>
          <ListContainer>
            {tableData &&
              tableData.map(({ idx, category, title, createDate }) => (
                <li key={idx}>
                  <ListLink href={`/board/${idx}`}>
                    <ListTitle>{title}</ListTitle>
                    <ListInfoBox>
                      <ListInfo>{category}</ListInfo>
                      <ListInfo>{createDate}</ListInfo>
                    </ListInfoBox>
                  </ListLink>
                </li>
              ))}
          </ListContainer>
          <TableContainer>
            <Table>
              <THead>
                {table.getHeaderGroups().map(headerGroup => (
                  <HeadTr key={headerGroup.id}>
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
                  </HeadTr>
                ))}
              </THead>
              <Tbody>
                {table.getRowModel().rows.map(row => (
                  <BodyTr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </BodyTr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </InnerSection>
      </SectionContainer>
    </LocalLoader>
  );
}
