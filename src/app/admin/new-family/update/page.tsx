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
import { useNewFamily } from '@/hooks/firebase/useNewFamily';
import { BaseSyntheticEvent } from 'react';

export default function NewFamilyUpdatePage() {
  const route = useRouter();
  const params = useSearchParams();
  const { updateNewFamily } = useNewFamily();

  const handleNewFamily = () => route.back();

  const handleOnSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const idx = params.get('idx');
    const publicId = params.get('publicId');
    if (!(idx && publicId)) return;
    const { value: name } = e.currentTarget.name;
    const { value: date } = e.currentTarget.date;
    updateNewFamily(idx, { name, date, publicId }).then(() => {
      route.push('/admin/new-family');
    });
  };

  return (
    <InnerContainer>
      <Title>
        {params.get('name')} 새신자 수정
        <AddBtn onClick={handleNewFamily}>새신자 현황</AddBtn>
      </Title>
      <Description>
        새신자 정보를 수정 합니다. 다만 이미지는 업데이트가 불가하고, 새로
        등록하셔야 합니다.
      </Description>
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
        <SubmitBtn>정보 수정하기</SubmitBtn>
      </FormContainer>
    </InnerContainer>
  );
}
