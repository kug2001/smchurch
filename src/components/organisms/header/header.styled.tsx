import styled from '@emotion/styled';

export const DocHeader = styled('header')`
  position: fixed;
  left: 0;
  right: 0;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
`;

export const InnerHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin: auto;
  max-width: 1280px;
`;

export const MenuList = styled('ul')`
  display: flex;
  justify-content: space-between;

  > li {
    padding: 0 10px;
    font-weight: 700;
    font-size: 22px;
    color: #5d4251;
  }
`;
