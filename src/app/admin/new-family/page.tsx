'use client';
import { useNewFamily } from '@/hooks/firebase/useNewFamily';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import React from 'react';
import { AdminLoader } from '@/components/admin/AdminLoader';
import { AdvancedImage } from '@cloudinary/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export interface FamilyData {
  idx: number;
  publicId: string;
  name: string;
  date: string;
}

export default function NewFamilyPage() {
  const { getNewFamily, deleteNewFamily } = useNewFamily();
  const route = useRouter();
  const { getCloudImg } = useCloudinary();
  const { data, isLoading } = useSWR('newFamily', getNewFamily);

  const handleAddNewFamily = () => route.push('/admin/new-family/add');

  const handleUpdateNewFamily = (query: FamilyData) => {
    const { name, date, publicId, idx } = query;
    const queryData = `?idx=${idx}&name=${name}&date=${date}&publicId=${publicId}`;
    route.push('/admin/new-family/update' + queryData);
  };

  const handleDeleteNewFamily = (id: string) => {
    deleteNewFamily(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <AdminLoader isLoading={isLoading}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              새신자 관리
            </h1>
            <p className="text-sm text-muted-foreground">
              새신자 현황에 대해 관리할 수 있습니다.
            </p>
          </div>
          <Button onClick={handleAddNewFamily}>
            <Plus className="h-4 w-4 mr-1.5" />
            새신자 추가
          </Button>
        </div>
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map(({ idx, name, date, publicId }) => (
              <Card key={idx} className="overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <AdvancedImage
                    cldImg={getCloudImg(publicId)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    등록일: {date}
                  </p>
                </CardHeader>
                <CardFooter className="gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateNewFamily({ idx, name, date, publicId })
                    }
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    수정
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteNewFamily(idx)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    삭제
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">등록된 새신자가 없습니다.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLoader>
  );
}
