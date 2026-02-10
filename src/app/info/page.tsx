import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '예배안내',
  description:
    '제주서문교회 예배시간 및 장소 안내 - 주일예배, 수요예배, 교육부서'
};

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { tableInfoData } from '@/app/info/const';
import { Clock, MapPin, BookOpen, Users, ChevronRight } from 'lucide-react';

const sectionIcons: Record<number, typeof Clock> = {
  0: Clock,
  1: BookOpen
};

const sectionDescriptions: Record<number, string> = {
  0: '제주서문교회의 예배에 함께하세요',
  1: '다음세대를 세우는 교육부서입니다'
};

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-zinc-900 pb-32 pt-16 md:pb-40 md:pt-20">
        <div className="absolute inset-0 bg-[url('/img/info_bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto max-w-[1024px] px-5 md:px-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            Worship Service
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            예배안내
          </h1>
          <Separator className="mt-6 max-w-[80px] bg-white/30" />
        </div>
      </div>

      {/* Cards */}
      <div className="relative mx-auto -mt-20 max-w-[1024px] px-5 pb-20 md:-mt-28 md:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tableInfoData.map(({ idx, header, body }) => {
            const Icon = sectionIcons[idx] || Users;
            const desc = sectionDescriptions[idx] || '';
            return (
              <Card key={idx} className="overflow-hidden border-0 shadow-xl">
                {/* Card Header */}
                <div className="bg-zinc-800 px-6 py-6 md:px-8 md:py-7">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                    <Icon className="h-5 w-5 text-zinc-800" />
                  </div>
                  <h2 className="text-lg font-bold text-white md:text-xl">
                    {header}
                  </h2>
                  {desc && (
                    <p className="mt-1.5 text-sm text-zinc-300">{desc}</p>
                  )}
                </div>

                {/* Rows */}
                <CardContent className="p-0">
                  {body.map((columns, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="flex items-center gap-4 border-b border-border/40 px-6 py-4 transition-colors last:border-b-0 hover:bg-muted/30 md:px-8"
                    >
                      {/* Name */}
                      <div className="flex min-w-0 flex-1 items-center gap-2.5">
                        <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-primary/50" />
                        <span className="text-sm font-semibold text-foreground">
                          {columns[0]?.column}
                        </span>
                      </div>
                      {/* Time */}
                      <span className="flex-shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-foreground/70">
                        {columns[1]?.column}
                      </span>
                      {/* Location */}
                      {columns[2]?.column && (
                        <span className="flex flex-shrink-0 items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {columns[2].column}
                        </span>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
