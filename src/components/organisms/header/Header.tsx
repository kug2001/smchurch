/** @jsxImportSource @emotion/react */
'use client';

import React, { FC } from 'react';
import { MenuItem } from './header.types';
import Image from 'next/image';
import { DocHeader, InnerHeader, MenuList } from './header.styled';
import { usePathname } from 'next/navigation';

export const Header: FC = () => {
  const pathname = usePathname();

  const menuList: MenuItem[] = [
    {
      idx: 0,
      menuName: '예배안내',
      linkUrl: ''
    },
    {
      idx: 1,
      menuName: '섬기는 이',
      linkUrl: ''
    },
    {
      idx: 2,
      menuName: '새가족 안내',
      linkUrl: ''
    },
    {
      idx: 3,
      menuName: '공동체 소식',
      linkUrl: ''
    },
    {
      idx: 4,
      menuName: '오시는 길',
      linkUrl: ''
    }
  ];

  return (
    <DocHeader>
      <InnerHeader>
        <div>
          <strong className="screen_out">제주서문교회</strong>
          <Image src={'/img/logo.png'} width={215} height={45} alt="Picture of the author" />
        </div>
        <MenuList>
          {menuList.map(({ idx, menuName, linkUrl }) => (
            <li key={idx}>
              <a role="button">{menuName}</a>
            </li>
          ))}
        </MenuList>
      </InnerHeader>
    </DocHeader>
  );
};
