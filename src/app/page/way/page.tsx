/** @jsxImportSource @emotion/react */
'use client';

import {
  InnerSection,
  SectionContainer
} from '@/components/molecules/share/share.styles';
import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';
import {
  DirectPlaceLink,
  LinkBox,
  Marker,
  ShareKakaoMap,
  WayAddress,
  WayContainer,
  WayPhone,
  WayTitle,
  WrapMarker
} from '@/app/page/way/Way.styles';

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
          <WayAddress>제주 제주시 용문로17길 23-6</WayAddress>
          <WayPhone>064-712-5591</WayPhone>
          <Map
            center={{ lat: 33.50728503189861, lng: 126.50673953831384 }}
            style={{ width: '100%', height: '500px' }}
            zoomable={false}
            draggable={false}
          >
            <WrapMarker
              position={{ lat: 33.50728503189861, lng: 126.50673953831384 }}
            >
              <Marker>제주서문교회</Marker>
            </WrapMarker>
          </Map>
          <LinkBox>
            <DirectPlaceLink href={'https://map.kakao.com/link/map/9723003'}>
              바로가기
            </DirectPlaceLink>
            <ShareKakaoMap href={'https://map.kakao.com/link/map/9723003'}>
              카카오톡에 지도공유하기
            </ShareKakaoMap>
          </LinkBox>
        </WayContainer>
      </InnerSection>
    </SectionContainer>
  );
}

// <script>
//   var container = document.getElementById('map');
//   var options = {
//   center: new kakao.maps.LatLng(33.450701, 126.570667),
//   level: 3
// };
//
//   var map = new kakao.maps.Map(container, options);
// </script>
