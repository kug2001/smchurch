'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams, useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useState } from 'react';
import useSWR from 'swr';
import { AdminLoader } from '@/components/admin/AdminLoader';
import { useBoard } from '@/hooks/firebase/useBoard';
import { BoardData } from '@/app/admin/board/page';
import '@/assets/styles/editor.css';
import dynamic from 'next/dynamic';
import { BoardEditorProps } from '@/components/block/editor/BoardEditor';
import { ArrowLeft } from 'lucide-react';

const BoardEditor = dynamic<BoardEditorProps>(
  () =>
    import('@/components/block/editor/BoardEditor').then(m => m.BoardEditor),
  { ssr: false }
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
    <AdminLoader isLoading={isLoading}>
      {data && (
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
              <h1 className="text-2xl font-semibold tracking-tight">
                게시판 수정
              </h1>
              <p className="text-sm text-muted-foreground">
                게시판의 내용을 수정합니다.
              </p>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">게시물 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={e => handleOnSubmit(e, data.idx)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">유형</Label>
                    <Input
                      id="category"
                      name="category"
                      type="text"
                      required
                      defaultValue={data.category || ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">제목</Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      required
                      defaultValue={data.title || ''}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contents">내용</Label>
                  <div className="[&>div]:h-[400px]">
                    <BoardEditor
                      onChangeEditor={md => setMdContent(md)}
                      initMdContent={data.contents}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">공지사항 수정하기</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </AdminLoader>
  );
}
