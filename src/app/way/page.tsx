/** @jsxImportSource @emotion/react */
'use client';

import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import Script from 'next/script';
import {
  DirectPlaceLink,
  LinkBox,
  WayAddress,
  WayContainer,
  WayPhone,
  WayTitle
} from '@/app/way/way.styles';
import { MapModule } from '@/components/block/map/MapModule';

export default function WayPage() {
  return (
    <SectionContainer>
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=8a30905ffe8271278bda8b442e9df9aa&libraries=services,clusterer&autoload=false"
        strategy={'beforeInteractive'}
      />
      <InnerSection>
        <WayContainer>
          <WayTitle>오시는 길</WayTitle>
          <WayAddress>제주 제주시 용문로 17길 23-6</WayAddress>
          <WayPhone>064-712-5591</WayPhone>
          <MapModule
            center={{ lat: 33.50728503189861, lng: 126.50673953831384 }}
          />
          <LinkBox>
            <DirectPlaceLink href={'https://map.kakao.com/link/map/9723003'}>
              카카오맵 바로 가기
            </DirectPlaceLink>
          </LinkBox>
        </WayContainer>
      </InnerSection>
    </SectionContainer>
  );
}
