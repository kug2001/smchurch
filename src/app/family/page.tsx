import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '새가족 안내',
  description: '제주서문교회 새가족 등록 안내 및 새가족 소개'
};

import FamilyClient from './FamilyClient';

export default function NewFamilyPage() {
  return <FamilyClient />;
}
