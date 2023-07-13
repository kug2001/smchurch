import styled from '@emotion/styled';

export const DocHeader = styled('header')`
  position: fixed;
  left: 0;
  right: 0;
  padding: 0 40px;
  background: #000;
  border-bottom: 1px solid #eee;
`;

export const InnerHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin: auto;
  //max-width: 1280px;
`;

export const Title = styled('h2')`
  font-size: 21px;
  font-weight: 700;
  color: #fff;
`;

export const UserTitle = styled('strong')`
  color: #fff;
`;

export const LogoutBtn = styled('button')`
  padding: 10px 10px;
  margin-left: 10px;
  border-radius: 8px;
  border: 1px solid #000;
  color: #000;
  background: #fff;
`;
