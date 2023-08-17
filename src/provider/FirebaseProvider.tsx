'use client';
import { createContext, FC, PropsWithChildren } from 'react';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Cloudinary } from '@cloudinary/url-gen';

// import cloudinary from 'cloudinary';

interface FirebaseProviderProps {
  firebaseConfig: FirebaseOptions;
}

export interface FirebaseContext {
  firebaseApp: FirebaseApp;
  cld: Cloudinary;
}

//@ts-ignore
export const firebaseContext = createContext<FirebaseContext>({});

export const FirebaseProvider: FC<
  PropsWithChildren<FirebaseProviderProps>
> = props => {
  const { children, firebaseConfig } = props;
  const app = initializeApp(firebaseConfig);
  const cld = new Cloudinary({ cloud: { cloudName: 'dbh2jshsb' } });
  // const analytics = getAnalytics(app);
  return (
    <firebaseContext.Provider value={{ firebaseApp: app, cld }}>
      {children}
    </firebaseContext.Provider>
  );
};
