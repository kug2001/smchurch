import '../assets/styles/reset.css';
import '../assets/styles/global.css';
import { Nanum_Gothic } from 'next/font/google';
import RootStyleRegistry from '@/components/provider/RootStyleRegistry';
import { FirebaseProvider } from '@/components/provider/FirebaseProvider';
import { FirebaseOptions } from 'firebase/app';
import { ModalProvider } from '@/components/provider/ModalProvider';

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
      <head>
        <title>제주서문교회</title>
        <meta name="format-detection" content="telephone=no" />
        <meta
          name="naver-site-verification"
          content="a2df1a2a5b23dc0e036881cd069ac4f3fa36f709"
        />
      </head>
      <body className={inter.className}>
        <ModalProvider>
          <FirebaseProvider firebaseConfig={firebaseConfig}>
            <RootStyleRegistry>{children}</RootStyleRegistry>
          </FirebaseProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
