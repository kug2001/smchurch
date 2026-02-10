'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { BaseSyntheticEvent } from 'react';
import { useHistoryBook } from '@/hooks/firebase/useHistoryBook';
import useSWR from 'swr';
import { AdminLoader } from '@/components/admin/AdminLoader';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import { AdvancedImage } from '@cloudinary/react';
import { ArrowLeft } from 'lucide-react';

export default function NewFamilyUpdatePage() {
  const route = useRouter();
  const params = useSearchParams();
  const id = params.get('id');
  const { updateHistoryBook, getHistoryById } = useHistoryBook();
  const { getCloudImg } = useCloudinary();
  const { data, isLoading } = useSWR('historyById', getHistoryById(id));

  const handleOnSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { value: title } = e.currentTarget.title;
    const { createDate, imgList } = data;
    const id = params.get('id');
    await updateHistoryBook(title, imgList, createDate, id);
    route.push('/admin/history');
  };

  return (
    <AdminLoader isLoading={isLoading}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => route.push('/admin/history')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            목록
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">앨범 수정</h1>
            <p className="text-sm text-muted-foreground">
              이미지는 수정할 수 없습니다. (추후 업데이트 예정)
            </p>
          </div>
        </div>
        {data?.imgList && data.imgList.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">등록된 사진</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {data.imgList.map((item: any, index: any) => (
                  <AdvancedImage
                    key={index}
                    cldImg={getCloudImg(item.public_id)}
                    width={200}
                    height={150}
                    className="rounded-md object-cover"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">앨범 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={e => handleOnSubmit(e)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">앨범 이름</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  defaultValue={data?.title || ''}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">수정하기</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLoader>
  );
}
