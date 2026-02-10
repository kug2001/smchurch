'use client';

import { PropsWithChildren } from 'react';

export default function AdminMainLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <main className="pt-14 pl-56 min-h-screen bg-muted/20">{children}</main>
  );
}
