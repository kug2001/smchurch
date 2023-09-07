import styled from '@emotion/styled';
import { mq } from '@/components/block/share/share.styles';

export const InfoTitle = styled('strong')`
  display: inline-block;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 48px;
  font-size: 46px;
  font-weight: 700;
  border-bottom: 3px solid #fff;
  color: #fff;
  ${mq} {
    font-size: 30px;
  }
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
  ${mq} {
    grid-template-columns: 1fr;
  }
`;

export const InfoTable = styled('table')`
  color: #54595f;
  background: #fff;
  border-collapse: collapse;
`;

export const TableHeader = styled('thead')`
  > tr > th {
    padding: 20px 15px;
    font-size: 20px;
    font-weight: 700;
    border: 2px solid #eee;
    //border-bottom: 2px solid #eee;
    ${mq} {
      font-size: 18px;
    }
  }
`;
export const TableBody = styled('tbody')`
  > tr {
    > td {
      padding: 20px 15px;
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
      vertical-align: middle;
      border: 2px solid #eee;
      ${mq} {
        font-size: 0.6rem;
      }
    }
  }
`;
