/** @jsxImportSource @emotion/react */
'use client';

import MainLayout from '@/components/layouts/mainLayout/MainLayout';
import React from 'react';
import { Header } from '@/components/layouts/header/Header';
import { Footer } from '@/components/layouts/footer/Footer';
import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import {
  IntroMessage,
  IntroTitle,
  PeopleContainer,
  PeopleImg,
  PeopleTooltip,
  Poem,
  TitIntroPeople
} from '@/app/root.styles';
import { useModal } from '@/components/provider/ModalProvider';

interface PopUpInfo {
  name: string;
  title: string;
  htmlContent: string;
  imgUrl: string;
}

export default function Index() {
  const { handleOpenModal } = useModal();
  const createData = (count: number, dataObj: any) =>
    Array(count)
      .fill(1)
      .map((item, index) => ({ idx: index, ...dataObj }));

  const handleOnClick = (props: PopUpInfo) => {
    const { title, name, htmlContent } = props;
    handleOpenModal({ name, title, htmlContent });
  };

  const data = createData(40, {
    name: '국영현 성도',
    title: '더미',
    htmlContent:
      '나는 배고픈 시대를 살았다. 하지만 대다수의 사람이 가난했기 때문에 인정이라는 게 있었다. 정확하게 기억하지는 못하지만 아주 어렸을 적 부활절이나 성탄절이면 친구를 따라 교회에 가곤 했다. 사실 간식이 주목적이었다. 예수님을 만날 수 있는 좋은 기회였지만 나는 예수를 만나지 못했다. 간간이 교회에 들릴 때마다 들었던 예수라는 이름은 나의 무의식 속에 새겨지기 시작했다. 어느 성탄절에는 예수와 로마군인들 자줏빛 군복등이 나올 때마다 내 머리에 통증이 오곤 했다. 이런 경험은 오랜동안 나를 따라다니며 트라우마가 됐다. 중 2학년 때부터는 친구를 따라 토평교회에 다녔다. 그런데 책읽기를 좋아하는 내가 성경책을 읽는 것은 어려웠다. 성경을 읽으려고 하면 머리가 아팠다. 하나님은 믿겠는데 예수님은 믿어지지가 않았다. 예수님과 불편한 관계 속에 있을 때 이상한 경험을 하곤 했다. 악몽에 시달리기 시작했고 살기 위해서 부처를 부르고 공자를 부르고 마호메트를 불러도 해결되지 않았다. 하지만 예수님의 이름을 부르기는 싫었다. 그러던 어느 날 같은 증상이 생겼을 때 예수님의 이름을 불렀다. 그러자 모든 문제가 사라졌다. 하지만 학창시절의 신앙은 대학에 진학하면서 안개처럼 사라졌다 <br/>전남대학교 4학년 재학 중에 광주사태가 발생했다. 그 가운데 나는 다리에 총상을 입고 왼쪽 무릎 일부를 절단해야 했다. 그 당시 광주기독병원의 의사들과 간호사들의 헌신적인 치료와 간호와 돌봄으로 나는 살았다. 병상에 있을 때 많은 사람들이 찾아와서 복음을 전했지만 외면했다. 퇴원 후에 제주로 돌아와 직장생활을 시작했고 결혼도 했다. 하지만 나는 술독에 빠져 살았다. 아내는 눈물로 나를 위해 기도했다. 아내는 그렇게 12년 동안이나 못난 남편을 위해서 기도했다. 어느날부터인가 교회에 가고 싶은 마음이 생겼다. 하지만 아내와 약속한 후에도 번번이 주일이 되면 교회에 가지 않았다. 어찌어찌해서 억지로 교회에 가는 일이 생겼다. 하지만 말씀이 귀에 들어오지 않았다. 그러던 중에 강기옥 목사님이 부임해 오셨다. 그리고 성경공부에 함께하게 되었다. 8년 동안 성경공부를 하면서 예수님과 많이 친해졌다. 이제는 예수님의 이름을 목청껏 소리쳐 부를 수 있게 되었다. <br/> 사실이 얼마나 행복한지 모른다. 더 이상 무엇을 요구하겠는가? 우리는 이 한 가지만으로도 행복한 사람들이다. 여기서 무엇을 더 구하는 것은 다 욕심에서 나오는 것에 지나지 않는다고 보여진다. 돌이켜보면 예수님께서는 이미 내 속에 들어와 계셨다. 부활절 계란을 얻어 먹으러 교회에 갔을 때부터 나를 구원하기 위하여 원대한 계획을 세우시고 동행하기 시작했었던 것이다. 비록 그 구원의 여정이 40년 가까이 소요되었지만 반드시 성취해 내시는 예수님이셨다. 쓸데없이 내 고집으로 소비된 헛된 시간들이었다. 아까운 시간이 물쓰듯 헛되이 땅에 버려졌다. 그래서 완강하게 버티던 애굽 바로 왕의 모습에서 나를 발견할 수 있었는지도 모른다. 아멘.<br/>',
    imgUrl: '/'
  });

  return (
    <>
      <Header />
      <MainLayout>
        <h2 className="screen_out">메인페이지</h2>
        <SectionContainer style={{ minHeight: 'inherit' }} bgColor={'#eee'}>
          <InnerSection>
            <TitIntroPeople>제주 서문교회 사람들을 소개합니다.</TitIntroPeople>
            <PeopleContainer>
              {data.map(({ idx, name, title, imgUrl, htmlContent }) => (
                <li key={idx}>
                  <PeopleTooltip title={name} arrow>
                    <PeopleImg
                      onClick={() =>
                        handleOnClick({ name, title, imgUrl, htmlContent })
                      }
                      src={imgUrl}
                      alt={''}
                      width={100}
                      height={100}
                    />
                  </PeopleTooltip>
                </li>
              ))}
            </PeopleContainer>
          </InnerSection>
        </SectionContainer>
        <SectionContainer
          bgUrl={'/img/intro_bg.jpg'}
          style={{ minHeight: 'inherit' }}
        >
          <InnerSection>
            <h3 className="screen_out">제주 서문교회 인사</h3>
            <div>
              <IntroTitle>제주서문교회에 오신 것을 환영합니다.</IntroTitle>
              <Poem>
                사람이 온다는 건 실은 어마어마한 일이다. 그는 그의 과거와 현재와
                그리고 그의 미래와 함께 오기 때문이다. 한 사람의 일생이 오기
                때문이다. 부서지기 쉬운 그래서 부서지기도 했을 마음이 오는
                것이다. <br />– 그 갈피를 아마 바람은 더듬어볼 수 있을 마음, 내
                마음이 그런 마음을 흉내 낸다면 필경 환대가 될 것이다.
              </Poem>
              <IntroMessage>
                정현종 님의 ‘방문객’이란 시입니다. 제주서문교회는 예수님께서 한
                영혼을 천하보다 귀하게 여기신 것처럼 한 생명을 예수님의 마음으로
                환대하며 섬기는 신앙공동체입니다. 이 사명을 위해 가르치고
                치유하며 전파하는 사역의 동역자로 여러분을 초대합니다.
              </IntroMessage>
            </div>
          </InnerSection>
        </SectionContainer>
      </MainLayout>
      <Footer />
    </>
  );
}
