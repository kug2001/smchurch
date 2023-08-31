/** @jsxImportSource @emotion/react */
'use client';
import React, { useState } from 'react';
import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import 'swiper/css';
import {
  Br,
  FamilyContainer,
  FamilyMsg,
  FamilyTitle
} from '@/app/new-family/newFamily.styles';
import { useNewFamily } from '@/hooks/firebase/useNewFamily';
import useSWR from 'swr';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import { SwiperModule } from '@/components/block/swiper/SwiperModule';
import { FamilyData } from '@/app/admin/new-family/page';

export default function NewFamilyPage() {
  const [newFamily, setNewFamily] = useState<any>(undefined);
  const { getNewFamily } = useNewFamily();
  const { data, isLoading } = useSWR<FamilyData[]>('newFamily', getNewFamily);

  return (
    <LocalLoader isLoading={isLoading}>
      <SectionContainer bgColor={'#7d5d6022'}>
        <InnerSection>
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
          {data && <SwiperModule data={data} />}
        </InnerSection>
      </SectionContainer>
    </LocalLoader>
  );
}
