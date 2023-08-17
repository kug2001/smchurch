/** @jsxImportSource @emotion/react */
'use client';
import React, { FC } from 'react';
import {
  InnerSection,
  SectionContainer
} from '@/components/molecules/share/share.styles';
import {
  IntroMessage,
  IntroTitle,
  Poem
} from '@/components/molecules/intro/Intro.styles';

export const Intro: FC = () => {
  return (
    <SectionContainer bgUrl={'/img/intro_bg.jpg'}>
      <InnerSection>
        <h2 className="screen_out">제주 서문교회 인사</h2>
        <div>
          <IntroTitle>제주서문교회에 오신 것을 환영합니다.</IntroTitle>
          <Poem>
            사람이 온다는 건 실은 어마어마한 일이다. 그는 그의 과거와 현재와
            그리고 그의 미래와 함께 오기 때문이다. 한 사람의 일생이 오기
            때문이다. 부서지기 쉬운 그래서 부서지기도 했을 마음이 오는 것이다.{' '}
            <br />– 그 갈피를 아마 바람은 더듬어볼 수 있을 마음, 내 마음이 그런
            마음을 흉내 낸다면 필경 환대가 될 것이다.
          </Poem>
          <IntroMessage>
            정현종 님의 ‘방문객’이란 시입니다. 제주서문교회는 예수님께서 한
            영혼을 천하보다 귀하게 여기신 것처럼 한 생명을 예수님의 마음으로
            환대하며 섬기는 신앙공동체입니다. 이 사명을 위해 가르치고 치유하며
            전파하는 사역의 동역자로 여러분을 초대합니다.
          </IntroMessage>
        </div>
      </InnerSection>
    </SectionContainer>
  );
};
