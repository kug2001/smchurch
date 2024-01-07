import { FC } from 'react';
import usePagination from '@/hooks/utils/usePagination';
import {
  NextIcon,
  NumberBtn,
  PaginationContainer,
  PrevIcon,
  PrevNextBtn,
  UnOrderList
} from '@/components/common/Pagination/pagination.styles';
import { PaginationProps } from './types';

export const Pagination: FC<PaginationProps> = props => {
  const {
    totalCount,
    pageNum,
    pagePerItem,
    bundleSize,
    handlePrev,
    handleNext,
    handlePage
  } = props;
  const { pageNumbers, maxPage } = usePagination(
    totalCount,
    pageNum,
    pagePerItem,
    bundleSize
  );
  return (
    <PaginationContainer>
      <PrevNextBtn
        title={'이전'}
        onClick={() => handlePrev(pageNum - 1)}
        disabled={pageNum - 1 <= 0}
      >
        <PrevIcon />
      </PrevNextBtn>
      <UnOrderList>
        {pageNumbers.length > 0 &&
          pageNumbers.map(num => (
            <li key={num} className={num === pageNum ? 'on' : ''}>
              <NumberBtn title={`page ${num}`} onClick={() => handlePage(num)}>
                {num}
              </NumberBtn>
            </li>
          ))}
      </UnOrderList>
      <PrevNextBtn
        title={'다음'}
        onClick={() => handleNext(pageNum + 1)}
        disabled={maxPage === pageNum}
      >
        <NextIcon />
      </PrevNextBtn>
    </PaginationContainer>
  );
};
