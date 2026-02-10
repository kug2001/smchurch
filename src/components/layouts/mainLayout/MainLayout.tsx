'use client';

import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  return <main className="pt-[72px] md:pt-20">{children}</main>;
}
