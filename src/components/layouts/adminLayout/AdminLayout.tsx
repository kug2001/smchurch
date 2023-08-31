/** @jsxImportSource @emotion/react */
'use client';

import { PropsWithChildren } from 'react';
import { AdminMainContainer } from './adminLayout.styles';

export default function AdminMainLayout(props: PropsWithChildren) {
  const { children } = props;
  return <AdminMainContainer>{children}</AdminMainContainer>;
}
