'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useRef, useState } from 'react';
import { useTestimony } from '@/hooks/firebase/useTestimony';
import { ArrowLeft, ImagePlus, X, Check } from 'lucide-react';

export default function TestimonyAddPage() {
  const route = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addTestimony } = useTestimony();

  const handleFileChange = (e: BaseSyntheticEvent) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selected);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleOnSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!file) return;
    const { value: name } = e.currentTarget.name;
    const { value: job } = e.currentTarget.job;
    const { value: testimony } = e.currentTarget.testimony;
    const { files: imageFiles } = e.currentTarget.imageFile;
    try {
      await addTestimony(name, job, testimony, imageFiles[0]);
      route.push('/admin/testimony');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <Button
          variant="ghost"
          size="sm"
          className="mb-1 -ml-2 text-muted-foreground"
          onClick={() => route.push('/admin/testimony')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          간증 목록
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">간증 추가</h1>
        <p className="text-sm text-muted-foreground">
          새로운 성도 간증을 등록합니다.
        </p>
      </div>
      <Separator />
      <form onSubmit={e => handleOnSubmit(e)}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">기본 정보</CardTitle>
              <CardDescription>
                간증하시는 성도님의 이름과 직분을 입력하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" name="name" type="text" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job">직분</Label>
                  <Input id="job" name="job" type="text" required />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">간증문</CardTitle>
              <CardDescription>간증 내용을 작성하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="testimony"
                name="testimony"
                required
                placeholder="간증 내용을 입력하세요..."
                className="min-h-[200px] resize-y"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">사진 업로드</CardTitle>
              <CardDescription>
                성도님의 프로필 사진을 등록하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <input
                ref={fileInputRef}
                id="imageFile"
                name="imageFile"
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
                required
                className="sr-only"
              />
              {!preview ? (
                <label
                  htmlFor="imageFile"
                  className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 px-6 py-10 cursor-pointer hover:border-muted-foreground/40 hover:bg-muted transition-colors"
                >
                  <ImagePlus className="h-10 w-10 text-muted-foreground/50" />
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      클릭하여 사진을 선택하세요
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG 파일 지원
                    </p>
                  </div>
                </label>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={preview}
                    alt="미리보기"
                    className="h-40 w-40 rounded-lg object-cover border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <p className="text-xs text-muted-foreground mt-2 truncate max-w-[160px]">
                    {file?.name}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          <Separator />
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => route.push('/admin/testimony')}
            >
              취소
            </Button>
            <Button type="submit">
              <Check className="h-4 w-4 mr-1.5" />
              간증 등록하기
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
