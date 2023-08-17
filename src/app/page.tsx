/** @jsxImportSource @emotion/react */
'use client';
import { Intro } from '@/components/molecules/intro/Intro';
import styles from '../assets/styles/page.module.css';
import { NewFamily } from '@/components/molecules/newFamily/NewFamily';
import { Header } from '@/components/organisms/header/Header';
import { Footer } from '@/components/organisms/footer/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Intro />
        <NewFamily />
      </main>
      <Footer />
    </>
  );
}
