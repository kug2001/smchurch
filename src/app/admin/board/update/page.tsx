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
  Title,
  WrapEditor
} from '@/app/admin/styles';
import { useSearchParams, useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useState } from 'react';
import useSWR from 'swr';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import { useBoard } from '@/hooks/firebase/useBoard';
import { BoardData } from '@/app/admin/board/page';
import '@/assets/styles/editor.css';
import dynamic from 'next/dynamic';
import { BoardEditorProps } from '@/components/block/editor/BoardEditor';
const BoardEditor = dynamic<BoardEditorProps>(
  () =>
    import('@/components/block/editor/BoardEditor').then(m => m.BoardEditor),
  {
    ssr: false
  }
);

export default function BoardUpdatePage() {
  const route = useRouter();
  const params = useSearchParams();
  const { updateBoard, getBoardByIdx } = useBoard();
  const userIdx = params.get('idx');

  const { data, isLoading } = useSWR<BoardData>(
    'getTestimonyByIdx',
    getBoardByIdx(userIdx)
  );

  const [mdContent, setMdContent] = useState<string>('');
  // @ts-ignore
  const handleNewFamily = () => route.push('/admin/board');

  const handleOnSubmit = async (e: BaseSyntheticEvent, idx: string) => {
    e.preventDefault();
    if (data === undefined) return;
    const { createDate } = data;
    const { value: title } = e.currentTarget.title;
    const { value: category } = e.currentTarget.category;
    const contents = mdContent;
    await updateBoard(idx, { title, contents, category, createDate });
    route.push('/admin/board');
  };

  return (
    <LocalLoader isLoading={isLoading}>
      {data && (
        <InnerContainer>
          <Title>
            {`게시판 수정`}
            <AddBtn onClick={handleNewFamily}>게시판 목록</AddBtn>
          </Title>
          <Description>해당 게시판의 내용을 수정 합니다.</Description>
          <FormContainer onSubmit={e => handleOnSubmit(e, data.idx)}>
            <FieldBox>
              <Label htmlFor="category">유형</Label>
              <TextField
                id="category"
                name="category"
                type="text"
                required={true}
                defaultValue={data.category || ''}
              />
            </FieldBox>
            <FieldBox>
              <Label htmlFor="title">제 목</Label>
              <TextField
                id="title"
                name="title"
                type="text"
                required={true}
                defaultValue={data.title || ''}
              />
            </FieldBox>
            <FieldBox>
              <Label htmlFor="contents">내 용</Label>
              <WrapEditor>
                <BoardEditor
                  onChangeEditor={md => setMdContent(md)}
                  initMdContent={data.contents}
                />
              </WrapEditor>
            </FieldBox>
            <div>
              <SubmitBtn>공지사항 수정하기</SubmitBtn>
            </div>
          </FormContainer>
        </InnerContainer>
      )}
    </LocalLoader>
  );
}
