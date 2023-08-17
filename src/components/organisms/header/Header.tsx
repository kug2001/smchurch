/** @jsxImportSource @emotion/react */
'use client';

import React, { FC } from 'react';
import { MenuItem } from './header.types';
import Image from 'next/image';
import { DocHeader, HeaderLink, InnerHeader, MenuList } from './header.styled';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Header: FC = () => {
  const pathname = usePathname();

  const menuList: MenuItem[] = [
    {
      idx: 0,
      menuName: '예배안내',
      linkUrl: '/page/info'
    },
    {
      idx: 1,
      menuName: '섬기는 이',
      linkUrl: '/page/worker'
    },
    {
      idx: 2,
      menuName: '새가족 안내',
      linkUrl: '/page/new-family'
    },
    {
      idx: 3,
      menuName: '공동체 소식',
      linkUrl: '/page/board'
    },
    {
      idx: 4,
      menuName: '오시는 길',
      linkUrl: '/page/way'
    }
  ];

  return (
    <DocHeader>
      <InnerHeader>
        <Link href={'/'}>
          <strong className="screen_out">제주서문교회</strong>
          <Image
            src={'/img/logo.png'}
            width={215}
            height={45}
            alt="제주서문교회로고"
          />
        </Link>
        <MenuList>
          {menuList.map(({ idx, menuName, linkUrl }) => (
            <li key={idx}>
              <HeaderLink href={linkUrl}>{menuName}</HeaderLink>
            </li>
          ))}
        </MenuList>
      </InnerHeader>
    </DocHeader>
  );
};
