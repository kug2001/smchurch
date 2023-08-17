// import '../assets/styles/reset.css';
// import '../assets/styles/global.css';
import styles from '@/assets/styles/page.module.css';
import { Sidebar } from '@/components/organisms/sideBar/Sidebar';
import { GuardProvider } from '@/provider/GuardProvider';
import { Login } from '@/components/organisms/login/Login';
import React from 'react';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <GuardProvider loginPage={<Login />}>
      <Sidebar />
      <main className={styles.adminMain}>{children}</main>
    </GuardProvider>
  );
}
