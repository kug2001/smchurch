'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  GraduationCap,
  Briefcase,
  ChevronRight,
  Users
} from 'lucide-react';
import useSWR from 'swr';
import { useWorker, WorkerGroup } from '@/hooks/firebase/useWorker';

const careerList = [
  { career: '총신대학 신학과', type: 'edu' },
  { career: '총신신대원 목회학', type: 'edu' },
  { career: '일산 예수인교회부목사', type: 'work' },
  { career: '수지 더사랑의교회수석목사', type: 'work' },
  { career: '우리주님의교회 개척목사', type: 'work' },
  { career: '제주서문교회 목사', type: 'work' },
  { career: '청소년진로코치(꿈을심는교육연구원)', type: 'work' }
];

export default function WorkerClient() {
  const { getWorker } = useWorker();
  const { data: workerList, isLoading } = useSWR<WorkerGroup[]>(
    'worker',
    getWorker
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-zinc-100 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-zinc-900 pb-24 pt-16 md:pb-32 md:pt-20">
        <div className="absolute inset-0 bg-[url('/img/info_bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto max-w-[1024px] px-5 md:px-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            Our Servants
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            섬기는 이
          </h1>
          <Separator className="mt-6 max-w-[80px] bg-white/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto -mt-16 max-w-[1024px] px-5 pb-20 md:-mt-20 md:px-10">
        {/* Pastor Card */}
        <Card className="mb-10 overflow-hidden border-0 shadow-xl">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Photo */}
              <div className="relative flex-shrink-0 bg-zinc-100">
                <Image
                  src="/img/pastor.jpg"
                  alt="담임목사 최성철"
                  width={320}
                  height={400}
                  className="h-[320px] w-full object-cover object-top md:h-auto md:w-[280px]"
                />
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-6 md:p-8">
                {/* Name & Title */}
                <div className="mb-1">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    담임목사
                  </span>
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  최성철
                </h2>
                <a
                  href="mailto:ttomini@naver.com"
                  target="_blank"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5" />
                  ttomini@naver.com
                </a>

                <Separator className="my-5" />

                {/* Career */}
                <div className="space-y-2.5">
                  {careerList.map(({ career, type }, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-foreground/80"
                    >
                      {type === 'edu' ? (
                        <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary/60" />
                      ) : (
                        <Briefcase className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary/60" />
                      )}
                      <span>{career}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workers Section */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-4.5 w-4.5 text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            교회 임직자
          </h2>
        </div>
        {isLoading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {workerList && workerList.length > 0 ? (
              workerList.map(({ job, workers, idx }) => (
                <Card
                  key={idx}
                  className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <div className="bg-zinc-800 px-5 py-3">
                      <h3 className="text-sm font-bold text-white">{job}</h3>
                    </div>
                    <div className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {workers
                          .split(',')
                          .map(s => s.trim())
                          .filter(Boolean)
                          .map((worker, wIdx) => (
                            <span
                              key={wIdx}
                              className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-medium text-foreground/80"
                            >
                              <ChevronRight className="h-3 w-3 text-primary/50" />
                              {worker}
                            </span>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-2 py-10 text-center text-muted-foreground">
                등록된 임직자가 없습니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
