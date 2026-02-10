'use client';

import React, { FC } from 'react';
import { useAuth } from '@/hooks/firebase/useAuth';
import { useAuthGuard } from '@/components/provider/GuardProvider';
import { User } from '@firebase/auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

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
    <header className="fixed left-0 right-0 h-14 px-6 bg-background border-b border-border shadow-sm z-[1000]">
      <div className="flex justify-between items-center h-full mx-auto">
        <a href={'/admin'} className="no-underline">
          <span className="text-lg font-semibold text-foreground">
            서문교회 관리자
          </span>
        </a>
        {userInfo && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {userInfo.email?.split('@')[0]}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1.5" />
              로그아웃
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
