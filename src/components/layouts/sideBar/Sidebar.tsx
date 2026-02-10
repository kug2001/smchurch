'use client';
import { FC } from 'react';
import {
  MessageSquareText,
  Users,
  Newspaper,
  ImageIcon,
  UserCheck
} from 'lucide-react';

const menuData = [
  { menuName: '간증 관리', link: '/admin/testimony', icon: MessageSquareText },
  { menuName: '새신자 관리', link: '/admin/new-family', icon: Users },
  { menuName: '게시판 관리', link: '/admin/board', icon: Newspaper },
  { menuName: '앨범 관리', link: '/admin/history', icon: ImageIcon },
  { menuName: '임직자 관리', link: '/admin/worker', icon: UserCheck }
];

interface SidebarProps {
  key?: any;
}

export const Sidebar: FC<SidebarProps> = () => {
  return (
    <nav className="fixed top-14 left-0 w-56 h-[calc(100vh-3.5rem)] border-r border-border bg-muted/40 shadow-sm">
      <div className="px-3 py-4">
        <p className="px-3 mb-2 text-xs font-medium uppercase text-muted-foreground tracking-wider">
          메뉴
        </p>
        <ul className="space-y-1">
          {menuData.map(({ menuName, link, icon: Icon }) => (
            <li key={link}>
              <a
                href={link}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground no-underline hover:bg-accent transition-colors"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                {menuName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
