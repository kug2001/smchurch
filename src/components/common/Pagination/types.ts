export interface PaginationProps {
  totalCount: number;
  pageNum: number;
  pagePerItem: number;
  // eslint-disable-next-line unused-imports/no-unused-vars
  handlePrev: (num: number) => void;
  // eslint-disable-next-line unused-imports/no-unused-vars
  handleNext: (num: number) => void;
  // eslint-disable-next-line unused-imports/no-unused-vars
  handlePage: (num: number) => void;
  bundleSize?: number;
}
