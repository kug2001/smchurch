import styled from '@emotion/styled';

export const LoginContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;

export const LoginTitle = styled('strong')`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-size: 24px;
  font-weight: 700;
  border-radius: 8px 8px 0 0;
  color: #fff;
  background: #000;
`;

export const LoginForm = styled('form')`
  display: flex;
  flex-direction: column;
  padding: 40px 40px;
  border-radius: 0 0 8px 8px;
  background: #eee;
`;

export const InputBox = styled('div')`
  display: flex;
  align-items: center;
  height: 50px;
`;

export const Label = styled('label')`
  display: inline-block;
  width: 70px;
  font-weight: 700;
`;

export const TextField = styled('input')`
  font-size: 18px;
`;

export const SubmitBox = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
export const SubmitBtn = styled('button')`
  padding: 10px 30px;
  border-radius: 8px;
  border: 1px solid #000;
  font-size: 16px;
  font-weight: 600;
  background: #fff;
  &:hover {
    color: #000;
    background: #eee;
  }
`;
