import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const DocHeader = styled('header')`
  position: fixed;
  left: 0;
  right: 0;
  padding: 0 40px;
  background: #000;
  border-bottom: 1px solid #eee;
  z-index: 1000;
`;

export const InnerHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin: auto;
`;

export const Title = styled('h2')`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;

export const UserTitle = styled('strong')`
  font-weight: 600;
  color: #fff;
`;

export const LogoutBtn = styled(Button)`
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 8px;
  //border: 1px solid #000;
  color: #fff;
  background: #9c27b099;
  &:hover {
    background: #9c27b0ee;
  }
`;
