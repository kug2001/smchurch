'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTestimony } from '@/hooks/firebase/useTestimony';
import { BaseSyntheticEvent } from 'react';
import useSWR from 'swr';
import { TestimonyPerson } from '@/app/admin/testimony/page';
import { ArrowLeft } from 'lucide-react';
import { AdminLoader } from '@/components/admin/AdminLoader';

export default function TestimonyUpdatePage() {
  const route = useRouter();
  const params = useSearchParams();
  const { updateTestimony, getTestimonyByIdx } = useTestimony();
  const userIdx = params.get('idx');

  const { data, isLoading } = useSWR<TestimonyPerson>(
    'getTestimonyByIdx',
    getTestimonyByIdx(userIdx)
  );

  const handleOnSubmit = (e: BaseSyntheticEvent, idx: string) => {
    e.preventDefault();
    const { value: name } = e.currentTarget.name;
    const { value: job } = e.currentTarget.job;
    const { value: testimony } = e.currentTarget.testimony;
    updateTestimony(idx, {
      name,
      job,
      testimony,
      publicId: data?.publicId || ''
    }).then(() => {
      route.push('/admin/testimony');
    });
  };

  if (isLoading && !data) return <AdminLoader isLoading={true} />;
  return (
    data && (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => route.push('/admin/testimony')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            목록
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">간증 수정</h1>
            <p className="text-sm text-muted-foreground">
              {data.name} {data.job}의 간증을 수정합니다.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">간증 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={e => handleOnSubmit(e, data.idx)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    defaultValue={data.name || ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job">직분</Label>
                  <Input
                    id="job"
                    name="job"
                    type="text"
                    required
                    defaultValue={data.job || ''}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimony">간증문</Label>
                <Textarea
                  id="testimony"
                  name="testimony"
                  required
                  defaultValue={data.testimony || ''}
                  className="min-h-[200px]"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">간증 수정하기</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  );
}
