'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { BaseSyntheticEvent } from 'react';
import { useWorker } from '@/hooks/firebase/useWorker';
import { ArrowLeft, Check } from 'lucide-react';

export default function WorkerAddPage() {
  const route = useRouter();
  const { addWorker } = useWorker();

  const handleOnSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { value: job } = e.currentTarget.job;
    const { value: workers } = e.currentTarget.workers;
    const { value: order } = e.currentTarget.order;
    try {
      await addWorker(job, workers, Number(order));
      route.push('/admin/worker');
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
          onClick={() => route.push('/admin/worker')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          임직자 목록
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">임직자 추가</h1>
        <p className="text-sm text-muted-foreground">
          새로운 임직자 그룹을 등록합니다.
        </p>
      </div>
      <Separator />
      <form onSubmit={e => handleOnSubmit(e)}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">임직자 정보</CardTitle>
              <CardDescription>
                직분명과 해당 직분의 이름 목록을 입력하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="job">직분</Label>
                  <Input
                    id="job"
                    name="job"
                    type="text"
                    required
                    placeholder="예: 시무장로"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workers">이름 목록</Label>
                  <Input
                    id="workers"
                    name="workers"
                    type="text"
                    required
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
                    placeholder="숫자가 작을수록 먼저 표시됩니다"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Separator />
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => route.push('/admin/worker')}
            >
              취소
            </Button>
            <Button type="submit">
              <Check className="h-4 w-4 mr-1.5" />
              임직자 등록하기
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
