'use client';

import Script from 'next/script';
import { MapModule } from '@/components/block/map/MapModule';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

export default function WayClient() {
  const [src, setSrc] = useState('');

  useEffect(() => {
    if (process.env.KAKAO_APP_KEY) {
      setSrc(
        `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-white">
      {src !== '' && <Script src={src} strategy="beforeInteractive" />}

      {/* Hero */}
      <div className="relative overflow-hidden bg-zinc-900 pb-24 pt-16 md:pb-32 md:pt-20">
        <div className="absolute inset-0 bg-[url('/img/info_bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto max-w-[1024px] px-5 md:px-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            Location
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            오시는 길
          </h1>
          <Separator className="mt-6 max-w-[80px] bg-white/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto -mt-16 max-w-[800px] px-5 pb-20 md:-mt-20">
        <Card className="overflow-hidden border-0 shadow-xl">
          <CardContent className="p-0">
            {/* Info */}
            <div className="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
                  <address className="not-italic">
                    제주 제주시 용문로 17길 23-6
                  </address>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span>064-712-5591</span>
                </div>
              </div>
              <a
                href="https://map.kakao.com/link/map/9723003"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-1.5 rounded-full bg-[#ffe500] px-5 py-2.5 text-sm font-bold text-zinc-900 shadow-sm transition-all hover:brightness-95"
              >
                카카오맵 바로 가기
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <Separator />

            {/* Map */}
            <div className="p-4 md:p-6">
              <div className="overflow-hidden rounded-xl">
                <MapModule
                  center={{
                    lat: 33.50728503189861,
                    lng: 126.50673953831384
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
