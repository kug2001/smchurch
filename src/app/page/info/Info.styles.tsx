import styled from '@emotion/styled';

export const InfoTitle = styled('strong')`
  display: inline-block;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 120px;
  font-size: 70px;
  border-bottom: 3px solid #fff;
  color: #fff;
`;

export const InfoMsg = styled('p')`
  font-size: 24px;
  line-height: 32px;
`;

export const InfoTableContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 40px;
  margin-bottom: 80px;
`;

export const InfoTable = styled('table')`
  color: #54595f;
  background: #fff;
  border-collapse: collapse;
`;

export const TableHeader = styled('thead')`
  > tr > th {
    padding: 20px 15px;
    font-size: 24px;
    font-weight: 700;
    border-bottom: 2px solid #eee;
  }
`;
export const TableBody = styled('tbody')`
  > tr > td {
    padding: 20px 15px;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    vertical-align: middle;
    border: 2px solid #eee;
  }
`;
