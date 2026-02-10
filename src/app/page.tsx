export const revalidate = 3600;

import '@/assets/styles/admin-globals.css';
import MainLayout from '@/components/layouts/mainLayout/MainLayout';
import { Header } from '@/components/layouts/header/Header';
import { Footer } from '@/components/layouts/footer/Footer';
import HomeClient from './HomeClient';

export default function Index() {
  return (
    <>
      <Header />
      <MainLayout>
        <h2 className="sr-only">메인페이지</h2>
        <HomeClient />
      </MainLayout>
      <Footer />
    </>
  );
}
