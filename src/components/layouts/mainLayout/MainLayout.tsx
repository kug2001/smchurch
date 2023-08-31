/** @jsxImportSource @emotion/react */
'use client';

import { PropsWithChildren } from 'react';
import { MainContainer } from './mainLayout.styles';

export default function MainLayout(props: PropsWithChildren) {
  const { children } = props;
  return <MainContainer>{children}</MainContainer>;
}
