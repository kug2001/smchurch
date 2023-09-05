/** @jsxImportSource @emotion/react */
'use client';
import React, { Fragment } from 'react';
import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import {
  HorizonRow,
  PastorCareer,
  PastorContainer,
  PastorEmail,
  PastorInfoBox,
  PastorTitle,
  PostorImage,
  WorkerContainer,
  WorkerInfoContainer,
  WorkerJob,
  WorkerListBox,
  WorkerName,
  WorkerTitle
} from '@/app/worker/worker.styles';

export default function WorkPage() {
  const careerList = [
    { idx: 0, career: '총신대학 신학과' },
    { idx: 1, career: '총신신대원 목회학' },
    { idx: 2, career: '일산 예수인교회부목사' },
    { idx: 3, career: '수지 더사랑의교회수석목사' },
    { idx: 4, career: '우리주님의교회 개척목사' },
    { idx: 5, career: '제주서문교회 목사' },
    { idx: 6, career: '청소년진로코치(꿈을심는교육연구원)' }
  ];

  const workerList = [
    { idx: 0, job: '원로목사', workers: ['강기옥'] },
    { idx: 1, job: '교육목사', workers: ['장용도'] },
    { idx: 2, job: '원로장로', workers: ['김택신'] },
    { idx: 3, job: '은퇴장로', workers: ['오경택', '최신경'] },
    {
      idx: 4,
      job: '시무장로',
      workers: ['송창선', '박용수', '오용태', '정원국']
    }
  ];

  return (
    <SectionContainer bgColor={'#7d5d6022'}>
      <InnerSection>
        <WorkerContainer>
          <h2 className="screen_out">섬기는 이</h2>
          <WorkerTitle>섬기는 이</WorkerTitle>
          <PastorContainer>
            <PostorImage
              src={'/img/pastor.jpg'}
              alt={'담임목사 최성철'}
              width={250}
              height={322}
            />
            <PastorInfoBox>
              <PastorTitle>담임목사 최성철</PastorTitle>
              <PastorEmail>
                <a href="mailto:ttomini@naver.com" target={'_blank'}>
                  ttomini@naver.com
                </a>
              </PastorEmail>
              <HorizonRow />
              <PastorCareer>
                {careerList.map(({ career, idx }) => (
                  <li key={idx}>{career}</li>
                ))}
              </PastorCareer>
            </PastorInfoBox>
          </PastorContainer>
          <WorkerInfoContainer>
            {workerList.map(({ idx, job, workers }) => (
              <Fragment key={idx}>
                <WorkerJob>{job}</WorkerJob>
                <WorkerListBox>
                  {workers.map((worker, workerIdx) => (
                    <WorkerName key={workerIdx}>{worker}</WorkerName>
                  ))}
                </WorkerListBox>
              </Fragment>
            ))}
          </WorkerInfoContainer>
        </WorkerContainer>
      </InnerSection>
    </SectionContainer>
  );
}
