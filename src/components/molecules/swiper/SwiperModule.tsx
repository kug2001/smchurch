import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { AdvancedImage } from '@cloudinary/react';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import { FamilyData } from '@/app/admin/new-family/page';
import '@/assets/styles/navigation.css';
import {
  InfoDate,
  InfoName,
  InnerSwiperSlide,
  NewFamilyInfoBox,
  WrapSwiper
} from '@/components/molecules/swiper/Swiper.styles';

interface SwiperModuleProps {
  data: FamilyData[];
}

export const SwiperModule: FC<SwiperModuleProps> = props => {
  const { data } = props;
  const { getCloudImg } = useCloudinary();
  // const swiper = useSwiper();

  return (
    <WrapSwiper>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => console.log(swiper)}
      >
        {data.map(({ idx, name, date, publicId }) => (
          <SwiperSlide key={idx}>
            <InnerSwiperSlide>
              <AdvancedImage cldImg={getCloudImg(publicId)} />
              <NewFamilyInfoBox>
                <InfoName>{name}</InfoName>
                <InfoDate>등록일자 : {date}</InfoDate>
              </NewFamilyInfoBox>
            </InnerSwiperSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </WrapSwiper>
  );
};
