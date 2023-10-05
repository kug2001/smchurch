/** @jsxImportSource @emotion/react */
'use client';
import React, { useEffect, useState } from 'react';
import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import 'swiper/css';

import { LocalLoader } from '@/components/common/loader/LocalLoader';
import { useHistoryBook } from '@/hooks/firebase/useHistoryBook';
import useSWR from 'swr';
import { AlbumContainer, AlbumTitle } from '@/app/album/album.styles';
import useResize from '@/hooks/browser/useResize';

export default function NewFamilyPage() {
  const { getHistoryBook, deleteHistoryBook } = useHistoryBook();
  const { data, isLoading } = useSWR('history', getHistoryBook);
  const { width } = useResize();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const getSlidePerViewByWidth = (width: number) => {
    return width > 875 ? 5 : width > 786 ? 4 : 4;
  };

  useEffect(() => {
    // console.log(markMockData(30));
  }, [data]);

  return (
    <LocalLoader isLoading={false}>
      <SectionContainer bgColor={'#7d5d6022'}>
        <InnerSection className={'album'}>
          <AlbumContainer>
            <AlbumTitle>서문교회 엘범</AlbumTitle>
          </AlbumContainer>
        </InnerSection>
      </SectionContainer>
    </LocalLoader>
  );
}
