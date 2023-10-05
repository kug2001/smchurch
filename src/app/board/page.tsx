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
  THead,
  TotalCount,
  Br,
  FamilyContainer,
  FamilyMsg,
  FamilyTitle
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
import React, { useEffect, useState } from 'react';
import { Pagination } from '@/components/common/Pagination/Pagination';
import useResize from '@/hooks/browser/useResize';
import { slice } from 'ramda';
import { SwiperModule } from '@/components/block/swiper/SwiperModule';
import { FamilyData } from '@/app/admin/new-family/page';
import { useNewFamily } from '@/hooks/firebase/useNewFamily';
// import { ContentBlock, EditorState, RichUtils } from 'draft-js';

const columnHelper = createColumnHelper<BoardData>();

export default function BoardPage() {
  const { getBoard } = useBoard();
  const { getNewFamily } = useNewFamily();
  const route = useRouter();
  const [pageNum, setPageNum] = useState(1);
  const [pagePerItem, setPagePerItem] = useState(10);
  const [tableData, setTableData] = useState<any[]>([]);
  const { data: boardData, isLoading: isLoadingBoard } = useSWR(
    'board',
    getBoard
  );
  const { data: familyData, isLoading: isLoadingFamily } = useSWR<FamilyData[]>(
    'newFamily',
    getNewFamily
  );
  const { width } = useResize();
  const [totalCount, setTotalCount] = useState(0);

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
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  useEffect(() => {
    if (boardData) {
      setTableData(boardData);
    }
  }, [boardData]);

  useEffect(() => {
    if (boardData) {
      const start = (pageNum - 1) * pagePerItem;
      const end = pageNum * pagePerItem;
      const data = slice(start, end, boardData);
      setTableData(data);
    }
  }, [pageNum, pagePerItem]);

  return (
    <LocalLoader isLoading={isLoadingBoard && isLoadingFamily}>
      <SectionContainer bgColor={'#fff'} style={{ minHeight: 'inherit' }}>
        <InnerSection>
          <BoardTitle>서문교회 소식</BoardTitle>
          <TotalCount>전체 {boardData && boardData.length}</TotalCount>
          <ListContainer>
            {boardData &&
              boardData.map(({ idx, category, title, createDate }) => (
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
          <Pagination
            totalCount={boardData ? boardData.length : 0}
            pageNum={pageNum}
            pagePerItem={pagePerItem}
            bundleSize={width > 768 ? 10 : 5}
            handlePage={num => setPageNum(num)}
            handleNext={num => setPageNum(num)}
            handlePrev={num => setPageNum(num)}
          />
        </InnerSection>
      </SectionContainer>
      <SectionContainer bgColor={'#7d5d6022'} style={{ minHeight: 'inherit' }}>
        <InnerSection className={'new_family'}>
          <FamilyContainer>
            <h2 className="screen_out">새가족 안내</h2>
            <FamilyTitle>새가족 안내</FamilyTitle>
            <FamilyMsg>
              예수님의 사랑으로 여러분을 환영합니다. <Br />
              제주서문교회의 동역자가 되시기를 원하시는 분은
              <Br className={'mo'} />
              새가족부의 안내를 받으실 수 있습니다.
              <Br />
              새가족 등록 후 5주 간에 새가족공부를 마친 후{' '}
              <Br className={'mo'} />
              제주서문교회 공동체의 일원이 될 수 있습니다.
            </FamilyMsg>
          </FamilyContainer>
          {familyData && <SwiperModule data={familyData} />}
        </InnerSection>
      </SectionContainer>
    </LocalLoader>
  );
}
