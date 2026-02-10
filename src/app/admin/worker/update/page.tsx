'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWorker, WorkerGroup } from '@/hooks/firebase/useWorker';
import { BaseSyntheticEvent } from 'react';
import useSWR from 'swr';
import { ArrowLeft } from 'lucide-react';
import { AdminLoader } from '@/components/admin/AdminLoader';

export default function WorkerUpdatePage() {
  const route = useRouter();
  const params = useSearchParams();
  const { updateWorker, getWorkerByIdx } = useWorker();
  const workerIdx = params.get('idx');

  const { data, isLoading } = useSWR<WorkerGroup>(
    'getWorkerByIdx',
    getWorkerByIdx(workerIdx)
  );

  const handleOnSubmit = (e: BaseSyntheticEvent, idx: string) => {
    e.preventDefault();
    const { value: job } = e.currentTarget.job;
    const { value: workers } = e.currentTarget.workers;
    const { value: order } = e.currentTarget.order;
    updateWorker(idx, {
      job,
      workers,
      order: Number(order)
    }).then(() => {
      route.push('/admin/worker');
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
            onClick={() => route.push('/admin/worker')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            목록
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              임직자 수정
            </h1>
            <p className="text-sm text-muted-foreground">
              {data.job} 정보를 수정합니다.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">임직자 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={e => handleOnSubmit(e, data.idx)}
              className="space-y-4"
            >
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
              <div className="space-y-2">
                <Label htmlFor="workers">이름 목록</Label>
                <Input
                  id="workers"
                  name="workers"
                  type="text"
                  required
                  defaultValue={data.workers || ''}
                  placeholder="쉼표로 구분하여 입력 (예: 홍길동, 김철수, 이영희)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">정렬 순서</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  required
                  defaultValue={data.order ?? 0}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">임직자 수정하기</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  );
}
