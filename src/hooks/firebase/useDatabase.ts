import { useContext } from 'react';
import { child, get, getDatabase, push, set } from 'firebase/database';
import { ref as dbRef } from '@firebase/database';
import {
  firebaseContext,
  FirebaseContext
} from '@/components/provider/FirebaseProvider';

export const useDatabase = () => {
  const { firebaseApp } = useContext<FirebaseContext>(firebaseContext);
  const db = getDatabase(firebaseApp);

  const addDbData = (path: string, data: any) => {
    const listRef = dbRef(db, path);
    const newListRef = push(listRef);
    const idx = newListRef.key;
    return set(newListRef, { ...data, idx });
  };

  const updateDbData = (path: string, data: any) => {
    return set(dbRef(db, path), data);
  };

  const readDbData = (path: string) => {
    return get(child(dbRef(db), path));
  };

  return {
    addDbData,
    updateDbData,
    readDbData
  };
};
