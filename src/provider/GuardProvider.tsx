'use client';
import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { AdminHeader } from '@/components/organisms/adminHeader/AdminHeader';
import { useAuth } from '@/provider/FirebaseProvider';
import { User } from '@firebase/auth';

interface AuthContext {
  auth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
}

const authContext = createContext<AuthContext>({
  auth: false,
  setAuth: () => {}
});

interface GuardProviderProps {
  loginPage: JSX.Element;
}

export const GuardProvider: FC<PropsWithChildren<GuardProviderProps>> = props => {
  const { children, loginPage } = props;
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const { onAuthState } = useAuth();

  const handleAuthState = (user: User | null) => {
    if (user) {
      setLoading(false);
      setUserInfo(user);
      setAuth(true);
    } else {
      setLoading(false);
      setUserInfo(null);
      setAuth(false);
    }
  };

  useEffect(() => {
    onAuthState(user => handleAuthState(user));
  }, []);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {loading ? (
        <>로딩중</>
      ) : (
        <>
          <AdminHeader userInfo={userInfo} setUserInfo={setUserInfo} />
          {!auth ? loginPage : children}
        </>
      )}
    </authContext.Provider>
  );
};

export const useAuthGuard = () => {
  const { auth, setAuth } = useContext(authContext);
  return { auth, setAuth };
};
