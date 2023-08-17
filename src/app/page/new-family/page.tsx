/** @jsxImportSource @emotion/react */
'use client';
import React, { useState } from 'react';
import {
  InnerSection,
  SectionContainer2
} from '@/components/molecules/share/share.styles';
import 'swiper/css';
import { FamilyMsg, FamilyTitle } from '@/app/page/new-family/NewFamily.styles';
import { useNewFamily } from '@/hooks/firebase/useNewFamily';
import useSWR from 'swr';
import { LocalLoader } from '@/components/atoms/loader/LocalLoader';
import { SwiperModule } from '@/components/molecules/swiper/SwiperModule';
import { FamilyData } from '@/app/admin/new-family/page';

export default function NewFamilyPage() {
  const [newFamily, setNewFamily] = useState<any>(undefined);
  const { getNewFamily } = useNewFamily();
  const { data, isLoading } = useSWR<FamilyData[]>('newFamily', getNewFamily);

  return (
    <LocalLoader isLoading={isLoading}>
      <SectionContainer2 bgUrl={'/img/family_bg.jpg'} bgColor={'#000000ff'}>
        <InnerSection>
          <h2 className="screen_out">새가족 안내</h2>
          <div>
            <FamilyTitle>새가족 안내</FamilyTitle>
            <FamilyMsg>
              예수님의 사랑으로 여러분을 환영합니다. <br />
              제주서문교회의 동역자가 되시기를 원하시는 분은 새가족부의 안내를
              받으실 수 있습니다. <br />
              새가족 등록 후 5주 간에 새가족공부를 마친 후 제주서문교회 공동체의
              일원이 될 수 있습니다.
            </FamilyMsg>
            {data && <SwiperModule data={data} />}
          </div>
        </InnerSection>
      </SectionContainer2>
    </LocalLoader>
  );
}
