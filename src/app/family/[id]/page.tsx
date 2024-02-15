'use client';
import useSWR from 'swr';
import { useRouter, useParams } from 'next/navigation';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import {
  BoardTitle,
  DetailBoardTitle,
  WrapDetailBtn,
  WrapDetailSubTitle
} from '@/app/board/Board.styles';
import { Button } from '@/components/common/button/Button';
import { useHistoryBook } from '@/hooks/firebase/useHistoryBook';
import { HistoryImg, HistoryImgContainer } from '@/app/family/album.styles';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';

export interface HistoryData {
  idx: string;
  title: string;
  imgList: any[];
  createDate: string;
}
export default function BoardDetailPage() {
  const route = useRouter();
  const { id } = useParams();
  const { getHistoryById } = useHistoryBook();
  const { getCloudImg } = useCloudinary();

  const { data, isLoading } = useSWR<HistoryData>(
    'getHistoryByIdx',
    getHistoryById(id)
  );
  return (
    <LocalLoader isLoading={isLoading}>
      <SectionContainer bgColor={'#fff'}>
        <InnerSection>
          <BoardTitle>서문교회 엘범</BoardTitle>
          {data && (
            <div>
              <DetailBoardTitle>제목 : {data.title || ''}</DetailBoardTitle>
              <WrapDetailSubTitle>
                <span>{'엘범'}</span>
                <span>{data.createDate || ''}</span>
              </WrapDetailSubTitle>
              <HistoryImgContainer>
                {data.imgList.map(item => (
                  <HistoryImg
                    key={item.public_id}
                    cldImg={getCloudImg(item.public_id)}
                  />
                ))}
              </HistoryImgContainer>

              <WrapDetailBtn>
                <Button
                  variant={'outlined'}
                  color={'secondary'}
                  onClick={() => route.push('/album')}
                >
                  목록
                </Button>
              </WrapDetailBtn>
            </div>
          )}
        </InnerSection>
      </SectionContainer>
    </LocalLoader>
  );
}
