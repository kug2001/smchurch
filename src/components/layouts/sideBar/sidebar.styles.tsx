import styled from '@emotion/styled';

export const SidebarContainer = styled('nav')`
  position: fixed;
  margin-top: 80px;
  width: 350px;
  height: 100vh;
  border-right: 1px solid #9c27b066;
  //background: #e1e1e1;
`;

export const SidebarTitle = styled('h3')`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  height: 120px;
  color: #9c27b0;
  border-bottom: 1px solid #9c27b066;
  background: #9c27b009;
`;

export const MenuList = styled('ul')`
  & li {
    padding-left: 40px;
    font-size: 18px;
    border-bottom: 1px solid #eee;
    & a {
      display: flex;
      align-items: center;
      height: 50px;
      font-weight: 500;
      color: #9c27b0;
      text-decoration: none;
    }
    &:hover {
      background: #9c27b010;
    }
  }
`;
