'use client';
import {
  AddBtn,
  Description,
  FieldBox,
  FormContainer,
  InnerContainer,
  Label,
  SubmitBtn,
  TextArea,
  TextField,
  Title
} from '@/app/admin/styles';
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useState } from 'react';
import { useTestimony } from '@/hooks/firebase/useTestimony';

export default function TestimonyAddPage() {
  const route = useRouter();
  const [file, setFile] = useState(null);
  const { addTestimony } = useTestimony();
  const handleTestimony = () => route.push('/admin/testimony');

  const handleFileChange = (e: BaseSyntheticEvent) => {
    // console.log('imageFile', e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const handleOnSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!file) return;
    const { value: name } = e.currentTarget.name;
    const { value: job } = e.currentTarget.job;
    const { value: testimony } = e.currentTarget.testimony;
    const { files: imageFiles } = e.currentTarget.imageFile;

    try {
      await addTestimony(name, job, testimony, imageFiles[0]);
      route.push('/admin/testimony');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InnerContainer>
      <Title>
        간증 추가
        <AddBtn onClick={handleTestimony}>간증 등록 현황</AddBtn>
      </Title>
      <Description>성도 간증을 등록합니다.</Description>
      <FormContainer onSubmit={e => handleOnSubmit(e)}>
        <FieldBox>
          <Label htmlFor="name">이 름</Label>
          <TextField id="name" name="name" type="text" required={true} />
        </FieldBox>
        <FieldBox>
          <Label htmlFor="job">직 분</Label>
          <TextField id="job" name="job" type="text" required={true} />
        </FieldBox>
        <FieldBox>
          <Label htmlFor="testimony">간 증</Label>
          <TextArea id="testimony" name="testimony" required={true} />
        </FieldBox>
        <FieldBox>
          <Label htmlFor="imageFile">사진 업로드</Label>
          <TextField
            id="imageFile"
            name="imageFile"
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
            required={true}
          />
        </FieldBox>
        <div>
          <SubmitBtn>간증 등록하기</SubmitBtn>
        </div>
      </FormContainer>
    </InnerContainer>
  );
}
