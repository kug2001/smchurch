export default function usePagination(
  totalItem: number,
  pageNum: number,
  pagePerItem: number,
  pageSize = 10
) {
  const getMaxPage = (): number => Math.ceil(totalItem / pagePerItem);

  const getPageBundleIdx = (pageNum: number, pageBundleSize: number) => {
    const { quotient, remainder } = getDivide(pageNum, pageBundleSize);
    return remainder === 0 ? quotient - 1 : quotient;
  };

  const getDivide = (pageNum: number, pagePerItem: number) => ({
    quotient: Math.floor(pageNum / pagePerItem),
    remainder: pageNum % pagePerItem
  });

  const makePageNumbers = () => {
    const maxPage = getMaxPage();
    if (maxPage <= pageSize)
      return Array(maxPage)
        .fill(0)
        .map((item, idx) => 1 + idx);
    const bundleIdx = getPageBundleIdx(pageNum, pageSize);
    const start = pageSize * bundleIdx + 1;
    return Array(start + pageSize - start)
      .fill(0)
      .map((item, idx) => start + idx)
      .filter(num => num <= maxPage);
  };

  return {
    pageNumbers: makePageNumbers(),
    maxPage: getMaxPage()
  };
}
