import styled from '@emotion/styled';

export const SidebarContainer = styled('nav')`
  position: fixed;
  margin-top: 80px;
  width: 350px;
  height: 100vh;
  border-right: 1px solid #000;
  //background: #e1e1e1;
`;

export const SidebarTitle = styled('h3')`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  height: 50px;
  border-bottom: 1px solid #eee;
  background: #fff;
`;

export const MenuList = styled('ul')`
  & li {
    padding-left: 20px;
    font-size: 18px;
    border-bottom: 1px solid #eee;
    & a {
      display: flex;
      align-items: center;
      height: 50px;
      font-weight: 700;
      color: #000;
      text-decoration: none;
    }
    &:hover {
      background: #eee;
    }
  }
`;
