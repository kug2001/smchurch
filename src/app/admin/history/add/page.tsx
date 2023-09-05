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
import { useHistoryImage } from '@/hooks/firebase/useHistoryImage';

export default function NewFamilyAddPage() {
  const route = useRouter();
  const { addHistoryImage } = useHistoryImage();
  const [file, setFile] = useState(null);
  const handleNewFamily = () => route.back();

  const handleFileChange = (e: BaseSyntheticEvent) => {
    // console.log('imageFile', e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!file) return;
    const { value: title } = e.currentTarget.title;
    const { files: imageFiles } = e.currentTarget.imageFile;

    try {
      await addHistoryImage(title, imageFiles[0]);
      route.push('/admin/history');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InnerContainer>
      <Title>
        엘범에 사진을 추가
        <AddBtn onClick={handleNewFamily}>엘범 현황</AddBtn>
      </Title>
      <Description>엘범에 새로운 사진을 등록합니다.</Description>
      <FormContainer onSubmit={e => handleOnSubmit(e)}>
        <FieldBox>
          <Label htmlFor="title">사진 타이틀</Label>
          <TextField id="title" name="title" type="text" required={true} />
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
        <SubmitBtn>사진 등록하기</SubmitBtn>
      </FormContainer>
    </InnerContainer>
  );
}
