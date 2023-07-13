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
} from '@/app/admin/new-family/styles';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDatabase } from '@/provider/FirebaseProvider';
import { BaseSyntheticEvent } from 'react';

export default function NewFamilyUpdatePage() {
  const route = useRouter();
  const params = useSearchParams();
  const { updateNewFamily } = useDatabase();

  console.log('params', params.get('name'));

  const handleNewFamily = () => route.back();

  const handleOnSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const idx = params.get('idx');
    if (!idx) return;
    const { value: name } = e.currentTarget.name;
    const { value: date } = e.currentTarget.date;
    const { value: imgUrl } = e.currentTarget.imgUrl;
    updateNewFamily(idx, { name, imgUrl, date }).then(() => {
      route.push('/admin/new-family');
    });
  };

  return (
    <InnerContainer>
      <Title>
        {params.get('name')} 새신자 수정
        <AddBtn onClick={handleNewFamily}>새신자 현황</AddBtn>
      </Title>
      <Description>새신자 정보를 수정 합니다.</Description>
      <FormContainer onSubmit={e => handleOnSubmit(e)}>
        <FieldBox>
          <Label htmlFor="name">이 름</Label>
          <TextField
            id="name"
            name="name"
            type="text"
            required={true}
            defaultValue={params.get('name') || ''}
          />
        </FieldBox>
        <FieldBox>
          <Label htmlFor="date">날 짜</Label>
          <TextField
            id="date"
            name="date"
            type="date"
            required={true}
            defaultValue={params.get('date') || ''}
          />
        </FieldBox>
        <FieldBox>
          <Label htmlFor="imgUrl">이미지 Url</Label>
          <TextField
            id="imgUrl"
            name="imgUrl"
            type="text"
            required={true}
            defaultValue={params.get('imageUrl') || ''}
          />
        </FieldBox>
        <SubmitBtn>정보 수정하기</SubmitBtn>
      </FormContainer>
    </InnerContainer>
  );
}
