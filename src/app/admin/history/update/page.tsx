'use client';
import {
  AddBtn,
  Description,
  FieldBox,
  FormContainer,
  InnerContainer,
  Label,
  SubmitBtn,
  TextField,
  Title
} from '@/app/admin/styles';
import { useRouter, useSearchParams } from 'next/navigation';
import { BaseSyntheticEvent } from 'react';
import { useHistoryBook } from '@/hooks/firebase/useHistoryBook';
import useSWR from 'swr';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import { BookImg, BookImgContainer } from '@/app/admin/history/styles';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';

export default function NewFamilyUpdatePage() {
  const route = useRouter();
  const params = useSearchParams();
  const id = params.get('id');
  const { updateHistoryBook, getHistoryById } = useHistoryBook();
  const { getCloudImg } = useCloudinary();
  const { data, isLoading } = useSWR('historyById', getHistoryById(id));

  const handleGoHistory = () => route.push('/admin/history');

  const handleOnSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { value: title } = e.currentTarget.title;
    const { createDate, imgList } = data;
    const id = params.get('id');
    await updateHistoryBook(title, imgList, createDate, id);
    route.push('/admin/history');
  };

  return (
    <LocalLoader isLoading={isLoading}>
      <InnerContainer>
        <Title>
          {params.get('name')} 엘범 수정
          <AddBtn onClick={handleGoHistory}>앨범 목록</AddBtn>
        </Title>
        <Description>
          엘범을 수정합니다. 다만 이미지는 수정할 수 없습니다.(추후 업데이트
          예정)
        </Description>
        <BookImgContainer>
          {data &&
            data.imgList?.map((item: any, index: any) => (
              <BookImg
                key={index}
                cldImg={getCloudImg(item.public_id)}
                width={200}
                height={150}
              />
            ))}
        </BookImgContainer>
        <FormContainer onSubmit={e => handleOnSubmit(e)}>
          <FieldBox>
            <Label htmlFor="title">엘범 이름</Label>
            <TextField
              id="title"
              name="title"
              type="text"
              required={true}
              defaultValue={data?.title || ''}
            />
          </FieldBox>
          <SubmitBtn>수정하기</SubmitBtn>
        </FormContainer>
      </InnerContainer>
    </LocalLoader>
  );
}
