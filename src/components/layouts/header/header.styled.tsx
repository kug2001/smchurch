import styled from '@emotion/styled';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { mq } from '@/components/block/share/share.styles';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

export const DocHeader = styled('header')`
  position: fixed;
  left: 0;
  right: 0;
  background: #fff;
  /* border-bottom: 1px solid #0; */
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 1px 0px 10px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  z-index: 5000;
  & .logo {
    padding: 0 10px;
  }
`;

export const InnerHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  height: 80px;
  margin: auto;
  max-width: 1024px;
  ${mq} {
    height: 50px;
  }
  //color: #3d343d;
`;

export const LogoImage = styled(Image)`
  ${mq} {
    width: 129px;
    height: 27px;
  }
`;

export const MenuList = styled('ul')`
  display: flex;
  height: 100%;
  justify-content: space-between;
  > li {
    padding: 0 10px;
    font-weight: 700;
    font-size: 16px;
    color: #5d4251;
  }
  ${mq} {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 50px;
    width: 100%;
    height: 200px;
    border-top: 1px solid #eee;
    background-color: #fff;
    &.active {
      display: flex;
    }
    > li {
      display: block;
      position: relative;
      padding: 10px 20px;
      font-weight: 700;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      color: #5d4251;
    }
  }
`;

export const Hamburger = styled(MenuIcon)`
  display: none;
  margin-right: 10px;
  ${mq} {
    display: block;
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
  border-bottom: ${pathname === href ? '3px solid rgb(236 135 106)' : 'none'};
  &:hover {
    color: rgb(236 135 106);
  }
  ${mq} {
    color: ${pathname === href ? 'rgb(236 135 106)' : '#5d415d'};
    border-bottom: none;
  }
`;
});

export const HeaderALink = styled((props: PropsWithChildren<LinkProps>) => {
  //@ts-ignore
  return <a {...props} />;
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
  border-bottom: ${pathname === href ? '3px solid rgb(236 135 106)' : 'none'};
  &:hover {
    color: rgb(236 135 106);
  }
  ${mq} {
    color: ${pathname === href ? 'rgb(236 135 106)' : '#5d415d'};
    border-bottom: none;
  }
`;
});
