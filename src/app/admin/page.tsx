'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { MessageSquareText, Users, Newspaper, ImageIcon } from 'lucide-react';

const sections = [
  {
    title: '간증 관리',
    description: '메인페이지의 성도 간증을 관리 합니다.',
    href: '/admin/testimony',
    icon: MessageSquareText
  },
  {
    title: '새신자 관리',
    description: '새신자 현황을 관리 합니다.',
    href: '/admin/new-family',
    icon: Users
  },
  {
    title: '게시판 관리',
    description: '공동체소식을 관리 합니다.',
    href: '/admin/board',
    icon: Newspaper
  },
  {
    title: '앨범 관리',
    description: '공동체 앨범 게시판의 사진을 관리 합니다.',
    href: '/admin/history',
    icon: ImageIcon
  }
];

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">대시보드</h1>
        <p className="text-sm text-muted-foreground">
          서문교회 관리자 페이지에 오신 것을 환영합니다.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sections.map(({ title, description, href, icon: Icon }) => (
          <a key={href} href={href} className="no-underline">
            <Card className="transition-colors hover:bg-accent/50 cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
