/** @jsxImportSource @emotion/react */
'use client';
import MainLayout from '@/components/layouts/mainLayout/MainLayout';
import React, { useRef } from 'react';
import { Header } from '@/components/layouts/header/Header';
import { Footer } from '@/components/layouts/footer/Footer';
import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import {
  CoverContainer,
  GoToTestimonyBtn,
  IntroMessage,
  IntroTitle,
  PeopleBtn,
  PeopleContainer,
  PeopleImg,
  PeopleTooltip,
  Poem,
  TitIntroPeople,
  WrapPeopleContainer,
  WrapPoem
} from '@/app/root.styles';
import { useModal } from '@/components/provider/ModalProvider';
import { useTestimony } from '@/hooks/firebase/useTestimony';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import useSWR from 'swr';
import { TestimonyPerson } from '@/app/admin/testimony/page';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import { motion } from 'framer-motion';

interface PopUpInfo {
  name: string;
  job: string;
  htmlContent: string;
}

export default function Index() {
  const { handleOpenModal } = useModal();
  const { getTestimony } = useTestimony();
  const { getCloudImg } = useCloudinary();
  const testimonyRef = useRef(null);
  const { data, isLoading } = useSWR<TestimonyPerson[]>(
    'testimony',
    getTestimony
  );

  const handleOnClick = (props: PopUpInfo) => {
    const { job, name, htmlContent } = props;
    handleOpenModal({ name, job, htmlContent });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  const handleGoToTestimony = () => {
    // @ts-ignore
    testimonyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <MainLayout>
        <h2 className="screen_out">메인페이지</h2>
        <LocalLoader isLoading={isLoading}>
          <SectionContainer
            className={'cover'}
            bgUrl={'/img/cover_bg_2024.jpeg'}
            bgColor={'#ffffff11'}
            style={{ minHeight: 'inherit' }}
          >
            <CoverContainer>
              <GoToTestimonyBtn onClick={handleGoToTestimony}>
                간증보기
              </GoToTestimonyBtn>
            </CoverContainer>
          </SectionContainer>
          <SectionContainer
            style={{ minHeight: 'inherit' }}
            bgColor={'#eee'}
            ref={testimonyRef}
          >
            <InnerSection>
              <TitIntroPeople>제주서문교회 가족을 소개합니다.</TitIntroPeople>
              <WrapPeopleContainer>
                <PeopleContainer
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                >
                  {data?.map(({ idx, name, job, publicId, testimony }) => (
                    <motion.li key={idx} variants={item}>
                      {
                        <PeopleTooltip
                          title={`${name} ${job}`}
                          arrow
                          disableInteractive
                        >
                          <PeopleBtn
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <PeopleImg
                              cldImg={getCloudImg(publicId)}
                              onClick={() =>
                                handleOnClick({
                                  name,
                                  job,
                                  htmlContent: testimony
                                })
                              }
                            />
                          </PeopleBtn>
                        </PeopleTooltip>
                      }
                    </motion.li>
                  ))}
                </PeopleContainer>
              </WrapPeopleContainer>
            </InnerSection>
          </SectionContainer>
          <SectionContainer
            bgUrl={'/img/intro_bg.jpeg'}
            bgColor={'#000000aa'}
            style={{ minHeight: 'inherit' }}
          >
            <InnerSection>
              <h3 className="screen_out">제주 서문교회 인사</h3>
              <IntroTitle>제주서문교회에 오신 것을 환영합니다.</IntroTitle>
              <WrapPoem>
                <Poem>
                  사람이 온다는 건 <br />
                  실은 어마어마한 일이다. <br />
                  그는 <br />
                  그의 과거와 <br />
                  현재와 <br />
                  그리고 <br />
                  그의 미래와 함께 오기 때문이다. <br />
                  한 사람의 일생이 오기 때문이다. <br />
                  부서지기 쉬운 <br />
                  그래서 부서지기도 했을 <br />
                  마음이 오는 것이다. – 그 갈피를 아마 <br />
                  바람은 더듬어볼 수 있을 <br />
                  마음, <br />
                  내 마음이 그런 마음을 흉내 낸다면 <br />
                  필경 환대가 될 것이다.
                </Poem>
              </WrapPoem>
              <IntroMessage>
                정현종 님의 ‘방문객’이란 시입니다. <br />
                제주서문교회는 예수님께서 한 영혼을 천하보다 귀하게 여기신
                것처럼
                <br /> 한 생명을 예수님의 마음으로 환대하며 섬기는
                신앙공동체입니다. <br />이 사명을 위해 가르치고 치유하며
                전파하는 <br />
                사역의 동역자로 여러분을 초대합니다.
              </IntroMessage>
            </InnerSection>
          </SectionContainer>
        </LocalLoader>
      </MainLayout>
      <Footer />
    </>
  );
}
