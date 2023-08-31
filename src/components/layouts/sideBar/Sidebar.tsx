/** @jsxImportSource @emotion/react */
'use client';
import { FC } from 'react';
import {
  MenuList,
  SidebarContainer,
  SidebarTitle
} from '@/components/layouts/sideBar/sidebar.styles';
import Link from 'next/link';

interface SidebarProps {
  key?: any;
}

export const Sidebar: FC<SidebarProps> = props => {
  const {} = props;

  const menuData = [
    {
      idx: 0,
      menuName: '간증 관리',
      link: '/admin/testimony'
    },
    {
      idx: 1,
      menuName: '새신자 관리',
      link: '/admin/new-family'
    },
    {
      idx: 2,
      menuName: '게시판 관리',
      link: '/admin/board'
    },
    {
      idx: 3,
      menuName: '월별 사진 관리',
      link: '/admin/board'
    }
  ];

  return (
    <SidebarContainer>
      <SidebarTitle>메뉴리스트</SidebarTitle>
      <MenuList>
        {menuData.map(({ menuName, idx, link }) => (
          <li key={idx}>
            <Link href={link}>{`${idx + 1}. ${menuName}`}</Link>
          </li>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};
