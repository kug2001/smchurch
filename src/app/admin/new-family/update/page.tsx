'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { useNewFamily } from '@/hooks/firebase/useNewFamily';
import { BaseSyntheticEvent } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function NewFamilyUpdatePage() {
  const route = useRouter();
  const params = useSearchParams();
  const { updateNewFamily } = useNewFamily();

  const handleOnSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const idx = params.get('idx');
    const publicId = params.get('publicId');
    if (!(idx && publicId)) return;
    const { value: name } = e.currentTarget.name;
    const { value: date } = e.currentTarget.date;
    updateNewFamily(idx, { name, date, publicId }).then(() => {
      route.push('/admin/new-family');
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => route.push('/admin/new-family')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          목록
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">새신자 수정</h1>
          <p className="text-sm text-muted-foreground">
            이미지는 수정할 수 없습니다. 새로 등록해 주세요.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {params.get('name')} 정보 수정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={e => handleOnSubmit(e)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  defaultValue={params.get('name') || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">날짜</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  defaultValue={params.get('date') || ''}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">정보 수정하기</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
