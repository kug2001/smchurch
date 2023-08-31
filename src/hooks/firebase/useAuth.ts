import { useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { User } from '@firebase/auth';
import {
  FirebaseContext,
  firebaseContext
} from '@/components/provider/FirebaseProvider';

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
