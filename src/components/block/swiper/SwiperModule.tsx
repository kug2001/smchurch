import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import { FamilyData } from '@/app/admin/new-family/page';
import '@/assets/styles/navigation.css';
import {
  InfoDate,
  InfoName,
  InnerSwiperSlide,
  NewFamilyImage,
  NewFamilyInfoBox,
  WrapSwiper
} from '@/components/block/swiper/Swiper.styles';
import useResize from '@/hooks/browser/useResize';
import { reverse } from 'ramda';

interface SwiperModuleProps {
  data: FamilyData[];
}

export const SwiperModule: FC<SwiperModuleProps> = props => {
  const { data } = props;
  const { getCloudImg } = useCloudinary();
  const { width } = useResize();

  return (
    <WrapSwiper>
      <Swiper
        modules={[Navigation]}
        centeredSlides={true}
        spaceBetween={50}
        slidesPerView={width > 786 ? 3 : 1}
        // centeredSlides={false}
        loop={true}
        navigation
        // breakpoints={{
        //   0: {
        //     /* when window >=0px - webflow mobile landscape/portriat */
        //     slidesPerView: 1,
        //     spaceBetween: 10,
        //     slidesOffsetBefore: 0,
        //     direction: 'vertical'
        //   },
        //   767: {
        //     slidesPerView: 3,
        //     spaceBetween: 30,
        //     slidesOffsetBefore: 0,
        //     direction: 'vertical'
        //   }
        // }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={swiper => console.log(swiper)}
      >
        {reverse(data).map(({ idx, name, date, publicId }) => (
          <SwiperSlide key={idx}>
            <InnerSwiperSlide>
              <NewFamilyImage cldImg={getCloudImg(publicId)} />
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
