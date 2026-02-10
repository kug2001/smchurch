import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '섬기는 이',
  description: '제주서문교회 담임목사 및 교회 임직자 소개'
};

import WorkerClient from './WorkerClient';

export default function WorkPage() {
  return <WorkerClient />;
}
