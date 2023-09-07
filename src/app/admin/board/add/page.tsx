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
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useState } from 'react';
import { useBoard } from '@/hooks/firebase/useBoard';
import { BoardEditorProps } from '@/components/block/editor/BoardEditor';
import dynamic from 'next/dynamic'; // Editor's Style
const BoardEditor = dynamic<BoardEditorProps>(
  () =>
    import('@/components/block/editor/BoardEditor').then(m => m.BoardEditor),
  {
    ssr: false
  }
);

export default function BoardAddPage() {
  const route = useRouter();
  const { addBoard } = useBoard();
  const [mdContent, setMdContent] = useState<string>('');
  const handleBoard = () => route.push('/admin/board');
  // const [isEditorMount, setIsEditorMount] = useState(false);

  // useEffect(() => {
  //   if (!isEditorMount) {
  //     setIsEditorMount(true);
  //     return;
  //   }
  // }, [isEditorMount]);

  const handleOnSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { value: category } = e.currentTarget.category;
    const { value: title } = e.currentTarget.title;
    await addBoard(category, title, mdContent);
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
          <Label>내 용</Label>
          <WrapEditor>
            <BoardEditor onChangeEditor={md => setMdContent(md)} />
          </WrapEditor>
        </FieldBox>
        <SubmitBtn>공지사항 등록하기</SubmitBtn>
      </FormContainer>
    </InnerContainer>
  );
}
