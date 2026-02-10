'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  ImageIcon
} from 'lucide-react';
import { getCached, setCache } from '@/lib/cache';
import ImageLightbox from '@/components/block/lightbox/ImageLightbox';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function BoardClient() {
  const [isMoreLoading, setIsMoreLoading] = useState(true);
  const [bandPosts, setBandPosts] = useState<any[]>([]);
  const [lightbox, setLightbox] = useState<{
    images: { url: string; key: string }[];
    index: number;
  } | null>(null);
  const bandReqUrl = useRef(new URLSearchParams());

  useEffect(() => {
    const CACHE_KEY = 'band:posts:initial';
    const cached = getCached<{ items: any[]; paging: any }>(CACHE_KEY);

    if (cached) {
      setBandPosts([...cached.items]);
      bandReqUrl.current.delete('limit');
      bandReqUrl.current.delete('after');
      bandReqUrl.current.set('limit', cached.paging.next_params.limit);
      bandReqUrl.current.set('after', cached.paging.next_params.after);
      setIsMoreLoading(false);
      return;
    }

    fetch('/api/band/posts').then(async res => {
      const json = await res.json();
      const data = json.result_data;

      setCache(CACHE_KEY, {
        items: data.items,
        paging: data.paging
      });
      setBandPosts([...data.items]);
      bandReqUrl.current.delete('limit');
      bandReqUrl.current.delete('after');
      bandReqUrl.current.set('limit', data.paging.next_params.limit);
      bandReqUrl.current.set('after', data.paging.next_params.after);
      setIsMoreLoading(false);
    });
  }, []);

  const getDate = (uto: string) => {
    const d = new Date(uto);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(
      d.getDate()
    )} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleOnClickMoreBtn = async () => {
    const qs = bandReqUrl.current.toString();
    const cacheKey = `band:posts:${qs}`;

    try {
      const cached = getCached<{ items: any[]; paging: any }>(cacheKey);

      if (cached) {
        setBandPosts(prev => [...prev, ...cached.items]);
        bandReqUrl.current.delete('limit');
        bandReqUrl.current.delete('after');
        bandReqUrl.current.set('limit', cached.paging.next_params.limit);
        bandReqUrl.current.set('after', cached.paging.next_params.after);
        return;
      }

      const res = await fetch(`/api/band/posts?${qs}`);
      const json = await res.json();
      const { paging, items } = json.result_data;

      setCache(cacheKey, { items, paging });
      setBandPosts(prev => [...prev, ...items]);
      bandReqUrl.current.delete('limit');
      bandReqUrl.current.delete('after');
      bandReqUrl.current.set('limit', paging.next_params.limit);
      bandReqUrl.current.set('after', paging.next_params.after);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LocalLoader isLoading={isMoreLoading}>
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
        {/* Posts */}
        <div className="relative mx-auto -mt-16 max-w-[720px] px-5 pb-20 md:-mt-20">
          <div className="space-y-5">
            {bandPosts &&
              bandPosts
                .filter((item: any) => item.author.role === 'leader')
                .map((item: any) => (
                  <Card
                    key={item.post_key}
                    className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg"
                  >
                    <CardContent className="p-0">
                      {/* Author */}
                      <div className="flex items-center gap-3 px-5 pt-5 md:px-6">
                        {item.author.profile_image_url ? (
                          <Image
                            src={item.author.profile_image_url}
                            alt={item.author.name}
                            width={40}
                            height={40}
                            quality={50}
                            sizes="40px"
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-5 w-5 text-primary/60" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {item.author.name}
                          </p>
                          <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {getDate(item.created_at)}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className="px-5 pb-4 pt-4 text-[15px] leading-relaxed text-foreground/80 md:px-6 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                          __html: item.content
                        }}
                      />

                      {/* Photos */}
                      {item?.photos?.length > 0 && (
                        <div className="group/swiper relative mx-5 mb-5 overflow-hidden rounded-xl bg-zinc-100 md:mx-6 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-white/50 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:w-5 [&_.swiper-pagination-bullet-active]:rounded-full [&_.swiper-pagination-bullet-active]:bg-white [&_.swiper-button-prev]:hidden [&_.swiper-button-next]:hidden">
                          {/* Photo count badge */}
                          {item.photos.length > 1 && (
                            <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                              <ImageIcon className="h-3 w-3" />
                              {item.photos.length}
                            </div>
                          )}
                          <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={0}
                            loop={item.photos.length > 1}
                            navigation={{
                              prevEl: `.prev-${item.post_key}`,
                              nextEl: `.next-${item.post_key}`
                            }}
                            pagination={{
                              clickable: true,
                              dynamicBullets: true
                            }}
                          >
                            {item.photos.map((photo: any, photoIdx: number) => (
                              <SwiperSlide key={photo.photo_key}>
                                <div
                                  className="relative aspect-[4/3] w-full cursor-zoom-in"
                                  onClick={() =>
                                    setLightbox({
                                      images: item.photos.map((p: any) => ({
                                        url: p.url,
                                        key: p.photo_key
                                      })),
                                      index: photoIdx
                                    })
                                  }
                                >
                                  <Image
                                    src={photo.url}
                                    alt=""
                                    fill={true}
                                    className="object-contain"
                                    quality={75}
                                    sizes="(max-width: 768px) calc(100vw - 80px), 630px"
                                    loading="lazy"
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          {/* Custom Navigation */}
                          {item.photos.length > 1 && (
                            <>
                              <button
                                className={`prev-${item.post_key} absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg md:opacity-0 md:group-hover/swiper:opacity-100`}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </button>
                              <button
                                className={`next-${item.post_key} absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg md:opacity-0 md:group-hover/swiper:opacity-100`}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center pt-8">
            <Button
              variant="outline"
              onClick={handleOnClickMoreBtn}
              className="gap-1.5 rounded-full px-6 shadow-sm"
            >
              더보기
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <ImageLightbox
        images={lightbox?.images ?? []}
        initialIndex={lightbox?.index ?? 0}
        isOpen={!!lightbox}
        onClose={() => setLightbox(null)}
      />
    </LocalLoader>
  );
}
