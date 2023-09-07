import { styled } from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
import { mq } from '@/components/block/share/share.styles';

export const WrapSwiper = styled('div')``;
export const InnerSwiperSlide = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NewFamilyInfoBox = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
`;

export const NewFamilyImage = styled(AdvancedImage)`
  width: 100%;
  // ${mq} {
  //   width: 200px;
  // }
`;

export const InfoName = styled('span')`
  display: inline-block;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: #5d4251;
  ${mq} {
    font-size: 16px;
  }
`;

export const InfoDate = styled('span')`
  display: inline-block;
  font-size: 16px;
  font-weight: 400;
  color: #5d4251;
  ${mq} {
    font-size: 14px;
  }
`;
