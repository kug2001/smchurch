'use client';
import useSWR from 'swr';
import { BoardData } from '@/app/admin/board/page';
import { useRouter, useParams } from 'next/navigation';
import { useBoard } from '@/hooks/firebase/useBoard';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import {
  BoardTitle,
  DetailBoardTitle,
  WrapDetailBtn,
  WrapDetailSubTitle,
  WrapDetailViewer
} from '@/app/board/Board.styles';
import { BoardView } from '@/components/block/viewer/BoardView';
import { Button } from '@/components/common/button/Button';

export default function BoardDetailPage() {
  const route = useRouter();
  const { id } = useParams();
  const { getBoardByIdx } = useBoard();

  const { data, isLoading } = useSWR<BoardData>(
    'getTestimonyByIdx',
    getBoardByIdx(id)
  );
  return (
    <LocalLoader isLoading={isLoading}>
      <SectionContainer bgColor={'#fff'}>
        <InnerSection>
          <BoardTitle>서문교회 소식</BoardTitle>
          {data && (
            <div>
              <DetailBoardTitle>제목 : {data.title || ''}</DetailBoardTitle>
              <WrapDetailSubTitle>
                <span>{data.category || ''}</span>
                <span>{data.createDate || ''}</span>
              </WrapDetailSubTitle>
              <WrapDetailViewer>
                <BoardView mdContent={data.contents || ''} />
              </WrapDetailViewer>
              <WrapDetailBtn>
                <Button
                  variant={'outlined'}
                  onClick={() => route.push('/board')}
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
