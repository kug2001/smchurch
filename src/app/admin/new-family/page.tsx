'use client';
import { useNewFamily } from '@/hooks/firebase/useNewFamily';
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
  NewFamilyIma,
  Title,
  UpdateBtn
} from '@/app/admin/styles';
import { useRouter } from 'next/navigation';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import React from 'react';
import { LocalLoader } from '@/components/common/loader/LocalLoader';

export interface FamilyData {
  idx: number;
  publicId: string;
  name: string;
  date: string;
}

export default function NewFamilyPage() {
  const { getNewFamily, deleteNewFamily } = useNewFamily();
  const route = useRouter();
  const { getCloudImg } = useCloudinary();
  const { data, isLoading } = useSWR('newFamily', getNewFamily);

  const handleAddNewFamily = () => route.push('/admin/new-family/add');

  const handleUpdateNewFamily = (query: FamilyData) => {
    const { name, date, publicId, idx } = query;
    const queryData = `?idx=${idx}&name=${name}&date=${date}&publicId=${publicId}`;
    route.push('/admin/new-family/update' + queryData);
  };

  const handleDeleteNewFamily = (id: string) => {
    deleteNewFamily(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <LocalLoader isLoading={isLoading}>
      <InnerContainer>
        <Title>
          새신자 추가
          <AddBtn onClick={handleAddNewFamily}>새신자 추가</AddBtn>
        </Title>
        <Description>새신자 현황에 대해 관리할 수 있습니다.</Description>
        <CardContainer>
          {data &&
            data.map(({ idx, name, date, publicId }) => (
              <CardBox key={idx}>
                <div>{}</div>
                <NewFamilyIma cldImg={getCloudImg(publicId)} />
                <CardTxt>이름 : {name}</CardTxt>
                <CardTxt>등록 : {date}</CardTxt>
                <BtnConsole variant={'outlined'}>
                  <UpdateBtn
                    onClick={() =>
                      handleUpdateNewFamily({ idx, name, date, publicId })
                    }
                  >
                    {'업데이트'}
                  </UpdateBtn>
                  <DeleteBtn onClick={() => handleDeleteNewFamily(idx)}>
                    {'삭제'}
                  </DeleteBtn>
                </BtnConsole>
              </CardBox>
            ))}
        </CardContainer>
      </InnerContainer>
    </LocalLoader>
  );
}
