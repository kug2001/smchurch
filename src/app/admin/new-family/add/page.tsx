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
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useState } from 'react';
import { useNewFamily } from '@/hooks/firebase/useNewFamily';

export default function NewFamilyAddPage() {
  const route = useRouter();
  const { addNewFamily } = useNewFamily();
  const [file, setFile] = useState(null);
  const handleNewFamily = () => route.back();

  const handleFileChange = (e: BaseSyntheticEvent) => {
    // console.log('imageFile', e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!file) return;
    const { value: name } = e.currentTarget.name;
    const { value: date } = e.currentTarget.date;
    const { files: imageFiles } = e.currentTarget.imageFile;

    try {
      await addNewFamily(name, imageFiles[0], date);
      route.push('/admin/new-family');
    } catch (err) {
      console.log(err);
    }
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
          <Label htmlFor="imageFile">파일 업로드</Label>
          <TextField
            id="imageFile"
            name="imageFile"
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
            required={true}
          />
        </FieldBox>
        <SubmitBtn>새신자 등록하기</SubmitBtn>
      </FormContainer>
    </InnerContainer>
  );
}
