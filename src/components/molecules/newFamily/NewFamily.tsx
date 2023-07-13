import React, { FC, useEffect, useState } from 'react';
import { InnerSection, SectionContainer } from '@/components/molecules/share/share.styles';
import { IntroMessage, IntroTitle } from '@/components/molecules/intro/Intro.styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDatabase } from '@/provider/FirebaseProvider';

export const NewFamily: FC = () => {
  // @ts-ignore
  const { readDbData, writeDbData } = useDatabase();
  const [newFamily, setNewFamily] = useState<any>(undefined);

  // writeDbData('/user/1', { data: null });

  useEffect(() => {
    readDbData('/new-family')
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setNewFamily(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((err: any) => console.log(err));
  }, []);

  return (
    <SectionContainer bgColor={'#eee'}>
      <InnerSection>
        <h2 className="screen_out">새가족 안내</h2>
        <div>
          <IntroTitle>새가족 안내</IntroTitle>
          <IntroMessage>
            예수님의 사랑으로 여러분을 환영합니다. 제주서문교회의 동역자가 되시기를 원하시는 분은
            새가족부의 안내를 받으실 수 있습니다. 새가족 등록 후 5주 간에 새가족공부를 마친 후
            제주서문교회 공동체의 일원이 될 수 있습니다.
          </IntroMessage>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={swiper => console.log(swiper)}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
          </Swiper>
        </div>
      </InnerSection>
    </SectionContainer>
  );
};
