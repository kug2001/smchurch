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
import { useRouter, useSearchParams } from 'next/navigation';
// import { useBoard } from '@/components/hooks/firebase/useBoard';
import { BaseSyntheticEvent, useState } from 'react';
import useSWR from 'swr';
import { LocalLoader } from '@/components/atoms/loader/LocalLoader';
import { useBoard } from '@/hooks/firebase/useBoard';
import { BoardData } from '@/app/admin/board/page';
import { EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Editor } from '@/components/molecules/editor/Editor';
import '@/assets/styles/editor.css';

export default function BoardUpdatePage() {
  const route = useRouter();
  const params = useSearchParams();
  const { updateBoard, getBoardByIdx } = useBoard();
  const userIdx = params.get('idx');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { data, isLoading } = useSWR<BoardData>(
    'getTestimonyByIdx',
    getBoardByIdx(userIdx)
  );
  // @ts-ignore
  console.log('data', editorState.toJS().currentContent);

  const handleNewFamily = () => route.push('/admin/testimony');

  const handleOnSubmit = (e: BaseSyntheticEvent, idx: string) => {
    e.preventDefault();
    if (data === undefined) return;
    const { createDate } = data;
    const { value: title } = e.currentTarget.title;
    // @ts-ignore
    const contents = JSON.stringify(editorState.toJS().currentContent);
    const { value: category } = e.currentTarget.category;
    updateBoard(idx, { title, contents, category, createDate }).then(() => {
      route.push('/admin/board');
    });
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <LocalLoader isLoading={isLoading}>
      {data && (
        <InnerContainer>
          <Title>
            {`공지사항 수정`}
            <AddBtn onClick={handleNewFamily}>공지사항 목록</AddBtn>
          </Title>
          <Description>공지사항을 수정 합니다.</Description>
          <FormContainer onSubmit={e => handleOnSubmit(e, data.idx)}>
            <FieldBox>
              <Label htmlFor="category">카테고리</Label>
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
              <TextField
                id="contents"
                name="contents"
                type="text"
                required={true}
                defaultValue={data.contents || ''}
              />
            </FieldBox>
            <FieldBox>
              <Label htmlFor="contents">내 용</Label>
              <WrapEditor>
                <Editor
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </WrapEditor>
            </FieldBox>
            <SubmitBtn>공지사항 수정하기</SubmitBtn>
          </FormContainer>
        </InnerContainer>
      )}
    </LocalLoader>
  );
}
