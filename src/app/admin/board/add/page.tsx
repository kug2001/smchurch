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
import { useBoard } from '@/hooks/firebase/useBoard';

export default function BoardAddPage() {
  const route = useRouter();
  const { addBoard } = useBoard();
  const handleBoard = () => route.push('/admin/board');

  const handleOnSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { value: category } = e.currentTarget.category;
    const { value: title } = e.currentTarget.title;
    const { value: contents } = e.currentTarget.contents;
    addBoard(category, title, contents);
    route.push('/admin/board');
  };

  return (
    <InnerContainer>
      <Title>
        새로운 게시물 추가
        <AddBtn onClick={handleBoard}>게시판 관리 이동</AddBtn>
      </Title>
      <Description>새로운 게시물을 등록합니다.</Description>
      <FormContainer onSubmit={e => handleOnSubmit(e)}>
        <FieldBox>
          <Label htmlFor="category">구 분</Label>
          <TextField
            id="category"
            name="category"
            type="text"
            required={true}
          />
        </FieldBox>
        <FieldBox>
          <Label htmlFor="title">제 목</Label>
          <TextField id="title" name="title" type="text" required={true} />
        </FieldBox>
        <FieldBox>
          <Label htmlFor="contents">내 용</Label>
          <TextField
            id="contents"
            name="contents"
            type="text"
            required={true}
          />
        </FieldBox>

        <SubmitBtn>공지사항 등록하기</SubmitBtn>
      </FormContainer>
    </InnerContainer>
  );
}
