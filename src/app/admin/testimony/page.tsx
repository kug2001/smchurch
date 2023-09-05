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
  FaceImage,
  AddBtn,
  UpdateBtn,
  DeleteBtn,
  Table,
  TableContainer,
  BtnConsole
} from '@/app/admin/styles';
import useSWR from 'swr';
import { useTestimony } from '@/hooks/firebase/useTestimony';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';

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

  console.log(tableData);

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
      header: () => <span>사진</span>,
      cell: info => (
        <FaceImage
          //@ts-ignore
          cldImg={getCloudImg(info.getValue())}
          width={80}
          height={80}
        />
      )
    }),
    columnHelper.accessor('name', {
      header: () => <span>이름</span>,
      cell: info => info.getValue()
    }),
    columnHelper.accessor('job', {
      header: () => <span>직분</span>,
      cell: info => info.getValue()
    }),
    columnHelper.accessor('testimony', {
      header: () => <span>간증문</span>,
      cell: info => info.getValue()
    }),
    columnHelper.accessor('idx', {
      header: () => <span>관리</span>,
      cell: info => (
        <BtnConsole>
          <UpdateBtn onClick={() => handleUpdateTestimony(info.getValue())}>
            수정
          </UpdateBtn>
          <DeleteBtn onClick={() => handleDeleteTestimony(info.getValue())}>
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
          성도 간증 관리
          <AddBtn onClick={handleAddTestimony}>간증 추가</AddBtn>
        </Title>
        <Description>서문교회 성도들의 간증을 관리합니다.</Description>
        <TableContainer>
          <Table>
            <Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <HeaderTr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Th key={header.id} className={'testimony'}>
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
                    <Td key={cell.id} className={'testimony'}>
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
