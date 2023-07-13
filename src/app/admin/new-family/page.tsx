'use client';
import { useDatabase } from '@/provider/FirebaseProvider';
import useSWR from 'swr';
import {
  AddBtn,
  BtnConsole,
  CardBox,
  CardContainer,
  CardTxt,
  DeleteBtn,
  Description,
  InnerContainer,
  Title,
  UpdateBtn
} from '@/app/admin/new-family/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FamilyData {
  idx: number;
  imageUrl: string;
  name: string;
  date: string;
}

export default function NewFamilyPage() {
  const { getNewFamily, deleteNewFamily } = useDatabase();
  const route = useRouter();
  const { data, isLoading } = useSWR('newFamily', getNewFamily);

  const handleAddNewFamily = () => route.push('/admin/new-family/add');

  const handleUpdateNewFamily = (query: FamilyData) => {
    const { name, date, imageUrl, idx } = query;
    const queryData = `?idx=${idx}&name=${name}&date=${date}&imageUrl=${imageUrl}`;
    route.push('/admin/new-family/update' + queryData);
  };

  const handleDeleteNewFamily = (id: string) => {
    deleteNewFamily(id).then(() => {
      window.location.reload();
    });
  };

  if (isLoading) return <div>Loading 중</div>;
  return (
    <InnerContainer>
      <Title>
        새신자 추가
        <AddBtn onClick={handleAddNewFamily}>새신자 등록</AddBtn>
      </Title>
      <Description>새신자 등록현황을 보여줍니다.</Description>
      <CardContainer>
        {data &&
          data.map(({ idx, name, date, imageUrl }) => (
            <CardBox key={idx}>
              <Image src={'/'} alt={''} width={200} height={250} />
              <CardTxt>이름 : {name}</CardTxt>
              <CardTxt>등록 : {date}</CardTxt>
              <BtnConsole>
                <UpdateBtn onClick={() => handleUpdateNewFamily({ idx, name, date, imageUrl })}>
                  업데이트
                </UpdateBtn>
                <DeleteBtn onClick={() => handleDeleteNewFamily(idx)}>삭제</DeleteBtn>
              </BtnConsole>
            </CardBox>
          ))}
      </CardContainer>
    </InnerContainer>
  );
}
