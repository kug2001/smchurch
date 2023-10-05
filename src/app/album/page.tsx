/** @jsxImportSource @emotion/react */
'use client';
import React, { useEffect, useState } from 'react';
import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import 'swiper/css';

import { LocalLoader } from '@/components/common/loader/LocalLoader';
import { useHistoryBook } from '@/hooks/firebase/useHistoryBook';
import useSWR from 'swr';
import { AlbumTitle } from '@/app/album/album.styles';
import {
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
  TotalCount
} from '@/app/board/Board.styles';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { BoardData } from '@/app/admin/board/page';
import { slice } from 'ramda';
import { Pagination } from '@/components/common/Pagination/Pagination';
import useResize from '@/hooks/browser/useResize';

const columnHelper = createColumnHelper<BoardData>();
export default function NewFamilyPage() {
  const { getHistoryBook } = useHistoryBook();
  const [pageNum, setPageNum] = useState(1);
  const { width } = useResize();
  const [pagePerItem, setPagePerItem] = useState(10);
  const { data: historyData, isLoading } = useSWR('history', getHistoryBook);
  const [tableData, setTableData] = useState<any[]>([]);

  const columns = [
    columnHelper.accessor('category', {
      header: () => <span>유형</span>,
      cell: () => '엘범'
    }),
    columnHelper.accessor('title', {
      header: () => <span>제목</span>,
      cell: info => (
        <CellLink href={`/album/${info.row.original.idx}`}>
          <span>{info.getValue()}</span>
        </CellLink>
      )
    }),
    columnHelper.accessor('createDate', {
      header: () => <span>생성일</span>,
      cell: info => info.getValue()
    })
  ];

  useEffect(() => {
    if (historyData) {
      setTableData(historyData);
    }
  }, [historyData]);

  useEffect(() => {
    if (historyData) {
      const start = (pageNum - 1) * pagePerItem;
      const end = pageNum * pagePerItem;
      const data = slice(start, end, historyData);
      setTableData(data);
    }
  }, [pageNum, pagePerItem]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <LocalLoader isLoading={isLoading}>
      <SectionContainer bgColor={'#fff'}>
        <InnerSection>
          <AlbumTitle>서문교회 엘범</AlbumTitle>
          <TotalCount>전체 {historyData && historyData.length}</TotalCount>
          <ListContainer>
            {historyData &&
              historyData.map(({ idx, title, createDate }) => (
                <li key={idx}>
                  <ListLink href={`/album/${idx}`}>
                    <ListTitle>{title}</ListTitle>
                    <ListInfoBox>
                      <ListInfo>{'엘범'}</ListInfo>
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
            totalCount={historyData ? historyData.length : 0}
            pageNum={pageNum}
            pagePerItem={pagePerItem}
            bundleSize={width > 768 ? 10 : 5}
            handlePage={num => setPageNum(num)}
            handleNext={num => setPageNum(num)}
            handlePrev={num => setPageNum(num)}
          />
        </InnerSection>
      </SectionContainer>
    </LocalLoader>
  );
}
