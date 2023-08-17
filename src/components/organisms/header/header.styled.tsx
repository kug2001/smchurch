import styled from '@emotion/styled';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

export const DocHeader = styled('header')`
  position: fixed;
  left: 0;
  right: 0;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
  z-index: 5000;
`;

export const InnerHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin: auto;
  max-width: 1280px;
  //color: #3d343d;
`;

export const MenuList = styled('ul')`
  display: flex;
  height: 100%;
  justify-content: space-between;
  > li {
    padding: 0 10px;
    font-weight: 700;
    font-size: 22px;
    color: #5d4251;
  }
`;

export const HeaderLink = styled((props: PropsWithChildren<LinkProps>) => {
  return <Link {...props} />;
})(props => {
  const { href } = props;
  const pathname = usePathname();
  return `
  display: flex;
  height: 100%;
  align-items: center;
  text-decoration: none;
  color: #5d415d;
  box-sizing: border-box;
  border-top: ${pathname === href ? '3px solid #ffffffff' : 'none'};
  border-bottom: ${pathname === href ? '3px solid #5d415d' : 'none'};
  &:hover {
    color: #333;
  }
`;
});
