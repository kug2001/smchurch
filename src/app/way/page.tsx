import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '오시는 길',
  description:
    '제주서문교회 오시는 길 - 제주시 용문로 17길 23-6 | 카카오맵 안내'
};

import WayClient from './WayClient';

export default function WayPage() {
  return <WayClient />;
}
