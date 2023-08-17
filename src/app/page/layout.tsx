import React from 'react';
import styles from '@/assets/styles/page.module.css';
import { Header } from '@/components/organisms/header/Header';
import { Footer } from '@/components/organisms/footer/Footer';

export default function PageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
