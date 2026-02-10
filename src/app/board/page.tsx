import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '공동체 소식',
  description: '제주서문교회 공동체 소식 및 교회 활동 안내'
};

import BoardClient from './BoardClient';

export default function BoardPage() {
  return <BoardClient />;
}
