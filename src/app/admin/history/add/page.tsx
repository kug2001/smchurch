'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useState } from 'react';
import { useHistoryBook } from '@/hooks/firebase/useHistoryBook';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import { AdminLoader } from '@/components/admin/AdminLoader';
import { AdvancedImage } from '@cloudinary/react';
import { ArrowLeft } from 'lucide-react';

export default function HistoryBookAddPage() {
  const route = useRouter();
  const { addHistoryBook, uploadImg } = useHistoryBook();
  const [isLoading, setIsLoading] = useState(false);
  const { getCloudImg } = useCloudinary();
  const [imgList, setImgList] = useState<any[]>([]);

  const handleFileChange = async (e: BaseSyntheticEvent) => {
    setIsLoading(true);
    try {
      const imgInfo = await uploadImg(e.target.files[0]);
      setImgList(prevState => {
        return [...prevState, { ...imgInfo }];
      });
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const handleOnSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { value: title } = e.currentTarget.title;
    try {
      await addHistoryBook(title, imgList);
      route.push('/admin/history');
    } catch (err) {
      console.log(err);
    }
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
            <h1 className="text-2xl font-semibold tracking-tight">
              앨범 사진 추가
            </h1>
            <p className="text-sm text-muted-foreground">
              앨범에 새로운 사진을 등록합니다.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">사진 업로드</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageFile">파일 선택</Label>
              <Input
                id="imageFile"
                name="imageFile"
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
            {imgList.length > 0 && (
              <div className="flex gap-2 flex-wrap rounded-md border p-4">
                {imgList.map((item, index) => (
                  <AdvancedImage
                    key={index}
                    cldImg={getCloudImg(item.public_id)}
                    width={200}
                    height={150}
                    className="rounded-md object-cover"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">앨범 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={e => handleOnSubmit(e)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">사진 타이틀</Label>
                <Input id="title" name="title" type="text" required />
              </div>
              <div className="flex justify-end">
                <Button type="submit">앨범 등록하기</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLoader>
  );
}
