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
import { AdminHeader } from '@/components/layouts/adminHeader/AdminHeader';
import { useAuth } from '@/hooks/firebase/useAuth';
import { User } from '@firebase/auth';
import { GlobalLoader } from '@/components/common/loader/GlobalLoader';

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

export const GuardProvider: FC<
  PropsWithChildren<GuardProviderProps>
> = props => {
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
      <GlobalLoader isLoading={loading}>
        <AdminHeader userInfo={userInfo} setUserInfo={setUserInfo} />
        {!auth ? loginPage : children}
      </GlobalLoader>
    </authContext.Provider>
  );
};

export const useAuthGuard = () => {
  const { auth, setAuth } = useContext(authContext);
  return { auth, setAuth };
};
