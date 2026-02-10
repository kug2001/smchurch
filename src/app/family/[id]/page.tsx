import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '서문교회 앨범'
};

import AlbumDetailClient from './AlbumDetailClient';

export default function AlbumDetailPage() {
  return <AlbumDetailClient />;
}
