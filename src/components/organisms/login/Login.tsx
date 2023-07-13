/** @jsxImportSource @emotion/react */
'use client';

import { BaseSyntheticEvent, FC } from 'react';
import styles from '../../../assets/styles/page.module.css';
import {
  InputBox,
  Label,
  LoginContainer,
  LoginForm,
  LoginTitle,
  SubmitBox,
  SubmitBtn,
  TextField
} from '@/components/organisms/login/login.styles';
import { useAuth } from '@/provider/FirebaseProvider';
import { useAuthGuard } from '@/provider/GuardProvider';

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
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
        setAuth(false);
        window.alert('인증된 사용자가 아니거나, 비밀번호가 틀렸습니다.');
      });
  };

  return (
    <main className={styles.main}>
      <LoginContainer>
        <LoginTitle>서문교회 관리자 로그인</LoginTitle>
        <LoginForm onSubmit={e => handleOnSubmit(e)}>
          <InputBox>
            <Label htmlFor="id">E-mail</Label>
            <TextField id="id" name="id" type="email" required={true} autoComplete="username" />
          </InputBox>
          <InputBox>
            <Label htmlFor="password">비밀번호</Label>
            <TextField
              id="password"
              name="password"
              required={true}
              type="password"
              autoComplete="current-password"
            />
          </InputBox>
          <SubmitBox>
            <SubmitBtn>로그인</SubmitBtn>
          </SubmitBox>
        </LoginForm>
      </LoginContainer>
    </main>
  );
};
