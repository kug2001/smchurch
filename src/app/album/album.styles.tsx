import styled from '@emotion/styled';
import { mq } from '@/components/block/share/share.styles';
import { SwiperSlide } from 'swiper/react';

export const AlbumContainer = styled('div')`
  //padding: 0 20px;
`;

export const AlbumTitle = styled('strong')`
  display: block;
  //width: 100%;
  margin-bottom: 60px;
  padding-bottom: 10px;
  border-bottom: 3px solid #5d4251;
  font-size: 46px;
  font-weight: 700;
  color: #5d4251;
  ${mq} {
    font-size: 30px;
  }
`;

export const AlbumMsg = styled('p')`
  display: block;
  margin-bottom: 40px;
  font-size: 18px;
  color: #5d4251;
  line-height: 32px;
  ${mq} {
    padding: 0 10px;
    font-size: 14px;
  }
`;

export const AlbumSwiperContainer = styled('div')``;

export const ViewSwiper = styled('div')`
  padding: 30px 0;
  border-radius: 8px 8px 0 0;
  background-color: #d2d2d2;
`;

export const ThumbsSwiper = styled('div')`
  padding: 30px 20px;
  border-top: 2px solid #fff;
  border-radius: 0 0 8px 8px;
  background-color: #d2d2d2;
`;

export const WrapViewSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
`;

export const WrapThumbsSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
`;
