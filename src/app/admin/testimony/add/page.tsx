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
import { BaseSyntheticEvent } from 'react';
import { useTestimony } from '@/hooks/firebase/useTestimony';

export default function TestimonyAddPage() {
  const route = useRouter();
  const { addTestimony } = useTestimony();
  const handleTestimony = () => route.push('/admin/testimony');

  const handleOnSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { value: name } = e.currentTarget.name;
    const { value: job } = e.currentTarget.job;
    const { value: testimony } = e.currentTarget.testimony;
    const { value: imageUrl } = e.currentTarget.imageUrl;
    addTestimony(name, job, testimony, imageUrl);
    route.push('/admin/testimony');
  };

  return (
    <InnerContainer>
      <Title>
        간증 추가
        <AddBtn onClick={handleTestimony}>간증 등록 현황</AddBtn>
      </Title>
      <Description>새신자 등록합니다.</Description>
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
          <TextField
            id="testimony"
            name="testimony"
            type="text"
            required={true}
          />
        </FieldBox>
        <FieldBox>
          <Label htmlFor="imageUrl">이미지 Url</Label>
          <TextField
            id="imageUrl"
            name="imageUrl"
            type="text"
            required={true}
          />
        </FieldBox>
        <SubmitBtn>간증 등록하기</SubmitBtn>
      </FormContainer>
    </InnerContainer>
  );
}
