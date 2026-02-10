'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useState } from 'react';
import { useBoard } from '@/hooks/firebase/useBoard';
import { BoardEditorProps } from '@/components/block/editor/BoardEditor';
import dynamic from 'next/dynamic';
import { ArrowLeft } from 'lucide-react';

const BoardEditor = dynamic<BoardEditorProps>(
  () =>
    import('@/components/block/editor/BoardEditor').then(m => m.BoardEditor),
  { ssr: false }
);

export default function BoardAddPage() {
  const route = useRouter();
  const { addBoard } = useBoard();
  const [mdContent, setMdContent] = useState<string>('');

  const handleOnSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { value: category } = e.currentTarget.category;
    const { value: title } = e.currentTarget.title;
    await addBoard(category, title, mdContent);
    route.push('/admin/board');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => route.push('/admin/board')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          목록
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">게시물 추가</h1>
          <p className="text-sm text-muted-foreground">
            새로운 게시물을 등록합니다.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">게시물 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={e => handleOnSubmit(e)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">구분</Label>
                <Input id="category" name="category" type="text" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input id="title" name="title" type="text" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>내용</Label>
              <div className="[&>div]:h-[400px]">
                <BoardEditor onChangeEditor={md => setMdContent(md)} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">공지사항 등록하기</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
