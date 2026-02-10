'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface MenuItem {
  menuName: string;
  linkUrl: string;
}

const menuList: MenuItem[] = [
  { menuName: '예배안내', linkUrl: '/info' },
  { menuName: '섬기는 이', linkUrl: '/worker' },
  { menuName: '공동체 소식', linkUrl: '/board' },
  { menuName: '새가족 안내', linkUrl: '/family' },
  { menuName: '오시는 길', linkUrl: '/way' }
];

export const Header = () => {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggle = useCallback(() => setIsOpen(p => !p), []);

  return (
    <header
      ref={wrapperRef}
      className={`fixed inset-x-0 top-0 z-[5000] transition-all duration-500 ${
        scrolled || isOpen
          ? 'bg-white/90 shadow-md backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1024px] items-center justify-between px-5 md:h-[72px] md:px-10">
        {/* Logo */}
        <Link href="/" className="group relative flex items-center">
          <span className="sr-only">제주서문교회</span>
          <Image
            src="/img/logo.png"
            width={172}
            height={36}
            alt="제주서문교회 로고"
            className="h-7 w-auto transition-transform duration-300 group-hover:scale-105 md:h-8"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-0.5">
          {menuList.map(({ menuName, linkUrl }) => {
            const isActive = pathname === linkUrl;
            return (
              <Link
                key={linkUrl}
                href={linkUrl}
                className={`nav-link group relative px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-primary'
                    : scrolled
                    ? 'text-foreground/60 hover:text-primary'
                    : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {menuName}
                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
                    isActive
                      ? 'w-[calc(100%-32px)]'
                      : 'w-0 group-hover:w-[calc(100%-32px)]'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Animated Hamburger */}
        <button
          onClick={toggle}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-black/5 md:hidden"
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <div className="flex h-4 w-5 flex-col justify-between">
            <span
              className={`block h-[2px] w-full rounded-full bg-foreground/70 transition-all duration-300 origin-center ${
                isOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-full rounded-full bg-foreground/70 transition-all duration-200 ${
                isOpen ? 'scale-x-0 opacity-0' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-full rounded-full bg-foreground/70 transition-all duration-300 origin-center ${
                isOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Overlay + Menu */}
      <div
        className={`absolute inset-x-0 top-16 overflow-hidden transition-all duration-400 ease-in-out md:hidden ${
          isOpen
            ? 'max-h-[400px] opacity-100'
            : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border/50 bg-white/95 shadow-xl backdrop-blur-lg">
          {menuList.map(({ menuName, linkUrl }, i) => {
            const isActive = pathname === linkUrl;
            return (
              <Link
                key={linkUrl}
                href={linkUrl}
                style={{
                  transitionDelay: isOpen ? `${i * 50}ms` : '0ms'
                }}
                className={`flex items-center gap-3 border-b border-border/30 px-5 py-4 text-[15px] font-medium last:border-b-0 ${
                  isOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-4 opacity-0'
                } transition-all duration-300 ${
                  isActive
                    ? 'bg-primary/5 text-primary'
                    : 'text-foreground/70 active:bg-muted'
                }`}
              >
                {isActive && (
                  <span className="h-5 w-[3px] rounded-full bg-primary" />
                )}
                <span className={isActive ? '' : 'ml-[11px]'}>{menuName}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
