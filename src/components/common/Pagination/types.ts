export interface PaginationProps {
  totalCount: number;
  pageNum: number;
  pagePerItem: number;
  handlePrev: (num: number) => void;
  handleNext: (num: number) => void;
  handlePage: (num: number) => void;
  bundleSize?: number;
}
