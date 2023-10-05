import { useContext } from 'react';
import {
  child,
  get,
  getDatabase,
  push,
  set,
  query,
  orderByKey,
  startAt,
  limitToFirst
} from 'firebase/database';
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

  const paginationDbData = (path: string, id: string, size: number) => {
    return get(
      query(
        child(dbRef(db), path),
        orderByKey(),
        startAt('-NehNCe1oq4eP46c3rSH'),
        limitToFirst(10)
      )
    );
  };

  return {
    addDbData,
    updateDbData,
    readDbData,
    paginationDbData
  };
};
