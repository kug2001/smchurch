'use client';
import { createContext, FC, PropsWithChildren, useContext, useEffect } from 'react';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  NextOrObserver
} from 'firebase/auth';
import { User } from '@firebase/auth';
import { Cloudinary } from '@cloudinary/url-gen';
import { pipe, values } from 'ramda';
// import cloudinary from 'cloudinary';

interface FirebaseProviderProps {
  firebaseConfig: FirebaseOptions;
}

interface FirebaseContext {
  firebaseApp: FirebaseApp;
  cloudinary: Cloudinary;
}

//@ts-ignore
const firebaseContext = createContext<FirebaseContext>({});

export const FirebaseProvider: FC<PropsWithChildren<FirebaseProviderProps>> = props => {
  const { children, firebaseConfig } = props;
  const app = initializeApp(firebaseConfig);
  const cld = new Cloudinary({ cloud: { cloudName: 'dbh2jshsb' } });
  // const analytics = getAnalytics(app);
  return (
    <firebaseContext.Provider value={{ firebaseApp: app, cloudinary: cld }}>
      {children}
    </firebaseContext.Provider>
  );
};

export const useCloudinary = () => {
  const { cloudinary: cli } = useContext<FirebaseContext>(firebaseContext);

  // cloudinary.v2.uploader('');

  useEffect(() => {
    const cloudName = 'dbh2jshsb'; // replace with your own cloud name
    // const uploadPreset = 'aoh4fpwm'; // replace with your own upload presets

    // console.log('cloudinary', cloudinary, window.cloudinary);
    // @ts-ignore
    const myWidget = window.cloudinary?.createUploadWidget(
      {
        cloudName: cloudName
        // uploadPreset: uploadPreset
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        // multiple: false,  //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          document.querySelector('#uploadedimage')?.setAttribute('src', result.info.secure_url);
        }
      }
    );
    document.querySelector('#upload_widget')?.addEventListener(
      'click',
      function () {
        myWidget?.open();
      },
      false
    );
  }, []);
  // const uploardImg = () => {
  //   cloudinary.image(;)
  // };

  const UploadWidget = () => {
    return (
      <button id="upload_widget" className="cloudinary-button">
        {'업로드'}
      </button>
    );
  };

  return { UploadWidget };
};

export const useAuth = () => {
  const { firebaseApp } = useContext<FirebaseContext>(firebaseContext);
  const auth = getAuth(firebaseApp);

  const onAuthState = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback);
  };
  const createUser = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);
  const loginUser = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);
  const logoutUser = () => signOut(auth);

  return { onAuthState, createUser, loginUser, logoutUser };
};

export const useDatabase = () => {
  const { firebaseApp } = useContext<FirebaseContext>(firebaseContext);
  const db = getDatabase(firebaseApp);

  const writeDbData = (path: string, data: any) => {
    return set(ref(db, path), data);
  };

  const readDbData = (path: string) => {
    return get(child(ref(db), path));
  };

  const addNewFamily = (name: string, imageUrl: string, date: string) => {
    const id = Date.now();
    const path = 'new-family/' + 'new_' + id;
    return writeDbData(path, {
      idx: id,
      imageUrl,
      name,
      date
    });
  };

  const getNewFamily = async () => {
    const snapshot = await readDbData('/new-family');
    const data = await snapshot.val();
    const newFamily = await pipe(values)(data);
    return newFamily;
  };

  const deleteNewFamily = (id: string) => {
    const path = 'new-family/' + 'new_' + id;
    return writeDbData(path, null);
  };

  const updateNewFamily = (id: string, params: { name: string; imgUrl: string; date: string }) => {
    const { name, date, imgUrl: imageUrl } = params;
    const path = 'new-family/' + 'new_' + id;
    return writeDbData(path, {
      idx: id,
      imageUrl,
      name,
      date
    });
  };

  return {
    addNewFamily,
    getNewFamily,
    deleteNewFamily,
    updateNewFamily,
    writeDbData,
    readDbData
  };
};
