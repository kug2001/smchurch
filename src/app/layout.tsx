import '../assets/styles/reset.css';
import '../assets/styles/global.css';
import { Nanum_Gothic } from 'next/font/google';
import RootStyleRegistry from '@/components/provider/RootStyleRegistry';
import { FirebaseProvider } from '@/components/provider/FirebaseProvider';
import { FirebaseOptions } from 'firebase/app';
import { ModalProvider } from '@/components/provider/ModalProvider';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '제주서문교회',
    template: '%s | 제주서문교회'
  },
  description:
    '제주서문교회 - 제주시 용문로 17길 23-6 | 예배안내, 공동체 소식, 새가족 안내, 오시는 길',
  viewport: {
    width: 'device-width',
    initialScale: 1
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '제주서문교회',
    title: '제주서문교회',
    description: '제주서문교회 - 예배안내, 공동체 소식, 새가족 안내, 오시는 길',
    images: [
      {
        url: '/img/cover_bg_2026.jpeg',
        width: 1200,
        height: 630,
        alt: '제주서문교회'
      }
    ]
  },
  verification: {
    other: {
      'naver-site-verification': 'a2df1a2a5b23dc0e036881cd069ac4f3fa36f709'
    }
  },
  formatDetection: {
    telephone: false
  }
};

const inter = Nanum_Gothic({
  weight: ['400', '700', '800'],
  subsets: ['latin']
});

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_API_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ModalProvider>
          <FirebaseProvider firebaseConfig={firebaseConfig}>
            <RootStyleRegistry>{children}</RootStyleRegistry>
          </FirebaseProvider>
        </ModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
