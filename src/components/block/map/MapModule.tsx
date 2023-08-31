import { FC, useRef } from 'react';
import Script from 'next/script';
import { MapContainer } from '@/components/block/map/map.styles';

interface MapProps {
  key?: any;
  draggable?: boolean;
  zoomable?: boolean;
  disableDoubleClick?: boolean;
  disableDoubleClickZoom?: boolean;
  center: {
    lat: number;
    lng: number;
  };
}

export const MapModule: FC<MapProps> = props => {
  const {
    center,
    draggable = false,
    zoomable = false,
    disableDoubleClick = false,
    disableDoubleClickZoom = true
  } = props;
  const mapRef = useRef(null);

  const onLoadScript = () => {
    window.kakao.maps.load(() => {
      const { kakao } = window;
      const position = new kakao.maps.LatLng(center.lat, center.lng);
      const options = {
        center: position,
        level: 3,
        scrollwheel: zoomable,
        draggable,
        disableDoubleClickZoom,
        disableDoubleClick
      };
      // @ts-ignore
      const map = new kakao.maps.Map(mapRef.current, options);

      new kakao.maps.Marker({
        position
      }).setMap(map);
    });
  };

  return (
    <>
      <Script
        src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=8a30905ffe8271278bda8b442e9df9aa&autoload=false"
        onLoad={onLoadScript}
      />
      <MapContainer>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      </MapContainer>
    </>
  );
};
