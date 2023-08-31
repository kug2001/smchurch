import { useContext } from 'react';
import { child, get, getDatabase, set } from 'firebase/database';
import { ref as dbRef } from '@firebase/database';
import {
  firebaseContext,
  FirebaseContext
} from '@/components/provider/FirebaseProvider';

export const useDatabase = () => {
  const { firebaseApp } = useContext<FirebaseContext>(firebaseContext);
  const db = getDatabase(firebaseApp);

  const writeDbData = (path: string, data: any) => {
    return set(dbRef(db, path), data);
  };

  const readDbData = (path: string) => {
    return get(child(dbRef(db), path));
  };

  return {
    writeDbData,
    readDbData
  };
};
