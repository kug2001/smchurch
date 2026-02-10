import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '공동체 소식'
};

import BoardDetailClient from './BoardDetailClient';

export default function BoardDetailPage() {
  return <BoardDetailClient />;
}
