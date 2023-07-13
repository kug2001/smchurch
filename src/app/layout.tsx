import '../assets/styles/reset.css';
import '../assets/styles/global.css';
import { Inter } from 'next/font/google';
import RootStyleRegistry from '@/provider/RootStyleRegistry';
import { FirebaseProvider } from '@/provider/FirebaseProvider';
import { FirebaseOptions } from 'firebase/app';
// import { QueryClient } from 'react-query';
// const queryClient = new QueryClient();

const inter = Inter({ subsets: ['latin'] });

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

export const metadata = {
  title: '제주서문교회',
  description: '제주서문교회 홈페이지'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <FirebaseProvider firebaseConfig={firebaseConfig}>
          {/*<QueryClientProvider client={queryClient}>*/}
          <RootStyleRegistry>{children}</RootStyleRegistry>
          {/*</QueryClientProvider>*/}
        </FirebaseProvider>
      </body>
    </html>
  );
}
