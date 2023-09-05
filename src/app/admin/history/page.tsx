'use client';
import { useHistoryImage } from '@/hooks/firebase/useHistoryImage';
import useSWR from 'swr';
import {
  AddBtn,
  BtnConsole,
  CardBox,
  CardContainer,
  DeleteBtn,
  Description,
  InnerContainer,
  NewFamilyIma,
  Title
} from '@/app/admin/styles';
import { useRouter } from 'next/navigation';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import React from 'react';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import { ImageTit } from '@/app/admin/history/styles';

export default function NewFamilyPage() {
  const { getHistoryImage, deleteHistoryImage } = useHistoryImage();
  const route = useRouter();
  const { getCloudImg } = useCloudinary();
  const { data, isLoading } = useSWR('newFamily', getHistoryImage);

  const handleAddHistoryImage = () => route.push('/admin/history/add');

  const handleDeleteNewFamily = (id: string) => {
    deleteHistoryImage(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <LocalLoader isLoading={isLoading}>
      <InnerContainer>
        <Title>
          엘범 사진 추가
          <AddBtn onClick={handleAddHistoryImage}>사진 추가</AddBtn>
        </Title>
        <Description>공동체 소식의 엘범에 사진을 추가 합니다.</Description>
        <CardContainer>
          {data &&
            data.map(({ idx, publicId, title }) => (
              <CardBox key={publicId}>
                <NewFamilyIma
                  cldImg={getCloudImg(publicId)}
                  width={320}
                  height={200}
                />
                <ImageTit>{`제목 : ${title}`}</ImageTit>
                <BtnConsole variant={'outlined'}>
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
