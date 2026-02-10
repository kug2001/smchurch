'use client';

import { BaseSyntheticEvent, FC } from 'react';
import { useAuth } from '@/hooks/firebase/useAuth';
import { useAuthGuard } from '@/components/provider/GuardProvider';
import MainLayout from '../mainLayout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export const Login: FC = () => {
  const { loginUser } = useAuth();
  const { setAuth } = useAuthGuard();

  const handleOnSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { value: id } = e.currentTarget.id;
    const { value: password } = e.currentTarget.password;
    loginUser(id, password)
      .then(userCredential => {
        const user = userCredential.user;
        user && setAuth(true);
      })
      .catch(() => {
        setAuth(false);
        window.alert('인증된 사용자가 아니거나, 비밀번호가 틀렸습니다.');
      });
  };

  return (
    <MainLayout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <Card className="w-[380px]">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">서문교회 관리자</CardTitle>
            <CardDescription>관리자 계정으로 로그인하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={e => handleOnSubmit(e)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id">이메일</Label>
                <Input
                  id="id"
                  name="id"
                  type="email"
                  placeholder="admin@example.com"
                  required={true}
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  name="password"
                  required={true}
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <Button className="w-full">로그인</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};
