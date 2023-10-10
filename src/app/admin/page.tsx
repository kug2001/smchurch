'use client';
import { InnerContainer, Title } from '@/app/admin/styles';

export default function AdminPage() {
  return (
    <InnerContainer>
      <Title>관리자 메인 페이지 입니다.</Title>
      <ol>
        <li>1. 간증 관리 : 메인페이지의 성도 간증을 관리 합니다.</li>
        <li>2. 새신자 관리 : 메인페이지의 성도 간증을 관리 합니다.</li>
        <li>3. 게시판 관리 : 공동체소식을 관리 합니다.</li>
        <li>4. 엘범 사진 관리 : 공동체 엘범 게시판의 사진을 관리 합니다.</li>
      </ol>
    </InnerContainer>
  );
}
