/** @jsxImportSource @emotion/react */
'use client';

import React, { FC } from 'react';
import {
  DocHeader,
  InnerHeader,
  LogoutBtn,
  Title,
  UserTitle
} from './adminHeader.styled';
import { useAuth } from '@/hooks/firebase/useAuth';
import { useAuthGuard } from '@/components/provider/GuardProvider';
import { User } from '@firebase/auth';

interface AdminHeaderProps {
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AdminHeader: FC<AdminHeaderProps> = props => {
  const { userInfo, setUserInfo } = props;
  const { logoutUser } = useAuth();
  const { setAuth } = useAuthGuard();

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setUserInfo(null);
        setAuth(false);
        console.log('user logout');
      })
      .catch(err => console.log(err));
  };

  return (
    <DocHeader>
      <InnerHeader>
        <div>
          <Title>제주서문교회 관리자 페이지</Title>
        </div>
        {userInfo && (
          <div>
            <UserTitle>{`${
              userInfo.email?.split('@')[0]
            }관리자님 환영합니다!`}</UserTitle>
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
          </div>
        )}
      </InnerHeader>
    </DocHeader>
  );
};
