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
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent } from 'react';
import { useDatabase } from '@/provider/FirebaseProvider';

export default function NewFamilyAddPage() {
  const route = useRouter();
  const { addNewFamily } = useDatabase();
  const handleNewFamily = () => route.back();

  const handleOnSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { value: name } = e.currentTarget.name;
    const { value: date } = e.currentTarget.date;
    const { value: imgUrl } = e.currentTarget.imgUrl;
    addNewFamily(name, imgUrl, date);
    route.push('/admin/new-family');
  };

  return (
    <InnerContainer>
      <Title>
        새신자 추가
        <AddBtn onClick={handleNewFamily}>새신자 현황</AddBtn>
      </Title>
      <Description>새신자 등록합니다.</Description>
      <FormContainer onSubmit={e => handleOnSubmit(e)}>
        <FieldBox>
          <Label htmlFor="name">이 름</Label>
          <TextField id="name" name="name" type="text" required={true} />
        </FieldBox>
        <FieldBox>
          <Label htmlFor="date">날 짜</Label>
          <TextField id="date" name="date" type="date" required={true} />
        </FieldBox>
        <FieldBox>
          <Label htmlFor="imgUrl">이미지 Url</Label>
          <TextField id="imgUrl" name="imgUrl" type="text" required={true} />
        </FieldBox>
        <SubmitBtn>새신자 등록하기</SubmitBtn>
      </FormContainer>
    </InnerContainer>
  );
}
