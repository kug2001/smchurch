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
import { useRouter, useSearchParams } from 'next/navigation';
import { useTestimony } from '@/hooks/firebase/useTestimony';
import { BaseSyntheticEvent } from 'react';
import useSWR from 'swr';
import { TestimonyPerson } from '@/app/admin/testimony/page';

export default function TestimonyUpdatePage() {
  const route = useRouter();
  const params = useSearchParams();
  const { updateTestimony, getTestimonyByIdx } = useTestimony();
  const userIdx = params.get('idx');

  const { data, isLoading } = useSWR<TestimonyPerson>(
    'getTestimonyByIdx',
    getTestimonyByIdx(userIdx)
  );

  console.log('data', data);

  const handleNewFamily = () => route.push('/admin/testimony');

  const handleOnSubmit = (e: BaseSyntheticEvent, idx: string) => {
    e.preventDefault();
    const { value: name } = e.currentTarget.name;
    const { value: job } = e.currentTarget.job;
    const { value: testimony } = e.currentTarget.testimony;
    updateTestimony(idx, {
      name,
      job,
      testimony,
      publicId: data?.publicId || ''
    }).then(() => {
      route.push('/admin/testimony');
    });
  };

  if (isLoading && !data) return <>로딩중</>;
  // @ts-ignore
  // const { idx, name, job, testimony, imageUrl } = data;
  return (
    data && (
      <InnerContainer>
        <Title>
          {`${data.name}${data.job} 간증 수정`}
          <AddBtn onClick={handleNewFamily}>간증 등록 현황</AddBtn>
        </Title>
        <Description>간증자 정보를 수정 합니다.</Description>
        <FormContainer onSubmit={e => handleOnSubmit(e, data.idx)}>
          <FieldBox>
            <Label htmlFor="name">이 름</Label>
            <TextField
              id="name"
              name="name"
              type="text"
              required={true}
              defaultValue={data.name || ''}
            />
          </FieldBox>
          <FieldBox>
            <Label htmlFor="job">직 분</Label>
            <TextField
              id="job"
              name="job"
              type="text"
              required={true}
              defaultValue={data.job || ''}
            />
          </FieldBox>
          <FieldBox>
            <Label htmlFor="testimony">간증문</Label>
            <TextArea
              id="testimony"
              name="testimony"
              required={true}
              defaultValue={data.testimony || ''}
            />
          </FieldBox>
          <SubmitBtn>간증 수정하기</SubmitBtn>
        </FormContainer>
      </InnerContainer>
    )
  );
}
