'use client';
import useSWR from 'swr';
import { BoardData } from '@/app/admin/board/page';
import { useRouter, useParams } from 'next/navigation';
import { useBoard } from '@/hooks/firebase/useBoard';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import { BoardView } from '@/components/block/viewer/BoardView';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

export default function BoardDetailClient() {
  const route = useRouter();
  const { id } = useParams();
  const { getBoardByIdx } = useBoard();

  const { data, isLoading } = useSWR<BoardData>(
    'getTestimonyByIdx',
    getBoardByIdx(id)
  );

  return (
    <LocalLoader isLoading={isLoading}>
      <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-white">
        {/* Hero */}
        <div className="relative overflow-hidden bg-zinc-900 pb-24 pt-16 md:pb-32 md:pt-20">
          <div className="absolute inset-0 bg-[url('/img/info_bg.jpg')] bg-cover bg-center opacity-20" />
          <div className="relative mx-auto max-w-[1024px] px-5 md:px-10">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
              Community News
            </p>
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              공동체 소식
            </h1>
            <Separator className="mt-6 max-w-[80px] bg-white/30" />
          </div>
        </div>

        {/* Content */}
        <div className="relative mx-auto -mt-16 max-w-[800px] px-5 pb-20 md:-mt-20">
          {data && (
            <Card className="overflow-hidden border-0 shadow-xl">
              <CardContent className="p-6 md:p-8">
                {/* Title */}
                <h2 className="text-xl font-bold text-foreground md:text-2xl">
                  {data.title || ''}
                </h2>

                {/* Meta */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  {data.category && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      <Tag className="h-3 w-3" />
                      {data.category}
                    </span>
                  )}
                  {data.createDate && (
                    <span className="inline-flex items-center gap-1 text-xs">
                      <Calendar className="h-3 w-3" />
                      {data.createDate}
                    </span>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Body */}
                <div className="min-h-[300px]">
                  <BoardView mdContent={data.contents || ''} />
                </div>

                <Separator className="my-6" />

                {/* Back */}
                <Button
                  variant="outline"
                  onClick={() => route.push('/board')}
                  className="gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  목록으로
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </LocalLoader>
  );
}
