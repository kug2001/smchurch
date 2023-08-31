/** @jsxImportSource @emotion/react */
'use client';

import { Sidebar } from '@/components/layouts/sideBar/Sidebar';
import { GuardProvider } from '@/components/provider/GuardProvider';
import { Login } from '@/components/layouts/login/Login';
import AdminMainLayout from '@/components/layouts/adminLayout/AdminLayout';
import React from 'react';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <GuardProvider loginPage={<Login />}>
      <Sidebar />
      <AdminMainLayout>{children}</AdminMainLayout>
    </GuardProvider>
  );
}
