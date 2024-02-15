/** @jsxImportSource @emotion/react */
'use client';
import React from 'react';
import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import 'swiper/css';

import { LocalLoader } from '@/components/common/loader/LocalLoader';
import useSWR from 'swr';
import {
  Br,
  FamilyContainer,
  FamilyMsg,
  FamilyTitle
} from '@/app/board/Board.styles';
import { createColumnHelper } from '@tanstack/react-table';
import { BoardData } from '@/app/admin/board/page';
import { SwiperModule } from '@/components/block/swiper/SwiperModule';
import { FamilyData } from '@/app/admin/new-family/page';
import { useNewFamily } from '@/hooks/firebase/useNewFamily';

const columnHelper = createColumnHelper<BoardData>();
export default function NewFamilyPage() {
  const { getNewFamily } = useNewFamily();

  const { data: familyData, isLoading: isLoadingFamily } = useSWR<FamilyData[]>(
    'newFamily',
    getNewFamily
  );

  return (
    <LocalLoader isLoading={isLoadingFamily}>
      <SectionContainer bgColor={'#7d5d6022'} style={{ minHeight: 'inherit' }}>
        <InnerSection className={'new_family'}>
          <FamilyContainer>
            <h2 className="screen_out">새가족 안내</h2>
            <FamilyTitle>새가족 안내</FamilyTitle>
            <FamilyMsg>
              예수님의 사랑으로 여러분을 환영합니다. <Br />
              제주서문교회의 동역자가 되시기를 원하시는 분은
              <Br className={'mo'} />
              새가족부의 안내를 받으실 수 있습니다.
              <Br />
              새가족 등록 후 5주 간에 새가족공부를 마친 후{' '}
              <Br className={'mo'} />
              제주서문교회 공동체의 일원이 될 수 있습니다.
            </FamilyMsg>
          </FamilyContainer>
          {familyData && <SwiperModule data={familyData} />}
        </InnerSection>
      </SectionContainer>
    </LocalLoader>
  );
}
