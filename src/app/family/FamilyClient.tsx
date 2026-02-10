'use client';
import React from 'react';

import { LocalLoader } from '@/components/common/loader/LocalLoader';
import useSWR from 'swr';
import { FamilyData } from '@/app/admin/new-family/page';
import { useNewFamily } from '@/hooks/firebase/useNewFamily';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import { AdvancedImage } from '@cloudinary/react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Heart, Calendar, Users } from 'lucide-react';
import { reverse } from 'ramda';

export default function FamilyClient() {
  const { getNewFamily } = useNewFamily();
  const { getCloudImg } = useCloudinary();

  const { data: familyData, isLoading: isLoadingFamily } = useSWR<FamilyData[]>(
    'newFamily',
    getNewFamily
  );

  return (
    <LocalLoader isLoading={isLoadingFamily}>
      <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-white">
        {/* Hero */}
        <div className="relative overflow-hidden bg-zinc-900 pb-24 pt-16 md:pb-32 md:pt-20">
          <div className="absolute inset-0 bg-[url('/img/info_bg.jpg')] bg-cover bg-center opacity-20" />
          <div className="relative mx-auto max-w-[1024px] px-5 md:px-10">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
              New Family
            </p>
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              새가족 안내
            </h1>
            <Separator className="mt-6 max-w-[80px] bg-white/30" />
          </div>
        </div>

        {/* Content */}
        <div className="relative mx-auto -mt-16 max-w-[1024px] px-5 pb-20 md:-mt-20 md:px-10">
          {/* Welcome, Card */}
          <Card className="mb-12 overflow-hidden border-0 shadow-xl">
            <CardContent className="p-0">
              <div className="flex flex-col items-center bg-gradient-to-br from-primary/5 to-transparent px-6 py-10 text-center md:px-16 md:py-14">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-foreground md:text-2xl">
                  예수님의 사랑으로 환영합니다
                </h2>
                <Separator className="mx-auto my-4 max-w-[40px] bg-primary/30" />
                <p className="max-w-[520px] text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
                  제주서문교회의 동역자가 되시기를 원하시는 분은 <br />
                  새가족부의 안내를 받으실 수 있습니다.
                  <br />
                  새가족 등록 후 5주 간의 새가족공부를 마치면 <br />
                  제주서문교회 공동체의 일원이 될 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Family Count */}
          {familyData && familyData.length > 0 && (
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                새가족 소개
              </h2>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {familyData.length}명
              </span>
            </div>
          )}

          {/* Card Grid */}
          {familyData && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {reverse(familyData).map(({ idx, name, date, publicId }) => (
                <Card
                  key={idx}
                  className="group overflow-hidden border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <div className="aspect-[16/9] overflow-hidden bg-zinc-100">
                      <AdvancedImage
                        cldImg={getCloudImg(publicId)}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="px-4 py-3">
                      <p className="truncate text-sm font-semibold text-foreground md:text-base">
                        {name}
                      </p>
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground md:text-xs">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        {date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </LocalLoader>
  );
}
