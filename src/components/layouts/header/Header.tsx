/** @jsxImportSource @emotion/react */
'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import { MenuItem } from './header.types';
import {
  DocHeader,
  Hamburger,
  HeaderALink,
  HeaderLink,
  InnerHeader,
  LogoImage,
  MenuList
} from './header.styled';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';

function useOutsideAlerter(ref: any, isTrigger: boolean, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (!isTrigger) return;
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, isTrigger]);
}

export const Header: FC = () => {
  const wrapperRef = useRef(null);
  const [isExpend, setIsExpend] = useState(false);
  useOutsideAlerter(wrapperRef, isExpend, () => setIsExpend(false));

  const menuList: MenuItem[] = [
    {
      idx: 0,
      menuName: '예배안내',
      linkUrl: '/info'
    },
    {
      idx: 1,
      menuName: '섬기는 이',
      linkUrl: '/worker'
    },
    {
      idx: 2,
      menuName: '공동체 소식',
      linkUrl: '/board'
    },
    {
      idx: 3,
      menuName: '새가족 안내',
      linkUrl: '/family'
    },
    {
      idx: 4,
      menuName: '오시는 길',
      linkUrl: '/way'
    }
  ];

  const handleOnExpendMenu = () => {
    setIsExpend(prev => !prev);
  };

  return (
    <DocHeader ref={wrapperRef}>
      <InnerHeader>
        <Link href={'/'} className="logo">
          <strong className="screen_out">제주서문교회</strong>
          <LogoImage
            src={'/img/logo.png'}
            width={172}
            height={36}
            alt="제주서문교회로고"
          />
        </Link>
        <MenuList className={isExpend ? 'active' : ''}>
          {menuList.map(({ idx, menuName, linkUrl }) => (
            <li key={idx}>
              {menuName !== '오시는 길' ? (
                <HeaderLink href={linkUrl}>{menuName}</HeaderLink>
              ) : (
                <HeaderALink href={linkUrl}>{menuName}</HeaderALink>
              )}
            </li>
          ))}
        </MenuList>
        <Hamburger
          className={isExpend ? 'active' : ''}
          onClick={handleOnExpendMenu}
        >
          <MenuIcon />
        </Hamburger>
      </InnerHeader>
    </DocHeader>
  );
};
