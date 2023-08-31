import { styled } from '@mui/material';
import { MapMarker } from 'react-kakao-maps-sdk';

export const WayContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WayTitle = styled('strong')`
  margin-bottom: 40px;
  padding-bottom: 20px;
  font-size: 46px;
  font-weight: 700;
  color: #666;
  border-bottom: 3px solid #666;
`;

export const WayAddress = styled('address')`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 500;
  color: #666;
`;

export const WayPhone = styled('span')`
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: 500;
  color: #666;
`;

export const WrapMarker = styled(MapMarker)`
  width: 100%;
`;

export const Marker = styled('div')`
  height: 100%;
  padding: 10px 0;
  margin-left: 35px;
  color: #000;
`;

export const LinkBox = styled('div')`
  margin-top: 30px;
`;

export const DirectPlaceLink = styled('a')`
  display: block;
  padding: 16px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  color: #333;
  background-color: #ffe500;
`;
