/** @jsxImportSource @emotion/react */
'use client';

import MainLayout from '@/components/layouts/mainLayout/MainLayout';
import React from 'react';
import { Header } from '@/components/layouts/header/Header';
import { Footer } from '@/components/layouts/footer/Footer';

export default function PageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MainLayout>{children}</MainLayout>
      <Footer />
    </>
  );
}
