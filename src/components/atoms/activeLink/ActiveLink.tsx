/** @jsxImportSource @emotion/react */
'use client';
import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';

interface ActiveLinkProps {
  href: string;
}

export const ActiveLink: FC<PropsWithChildren<ActiveLinkProps>> = props => {
  const { href, children } = props;

  return <Link href={href}>{children}</Link>;
};
