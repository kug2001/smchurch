import styled from '@emotion/styled';
import Link from 'next/link';

export const BoardTitle = styled('strong')`
  display: inline-block;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 120px;
  font-size: 50px;
  font-weight: 700;
  border-bottom: 3px solid #5d415d;
  color: #5d415d;
`;

export const TableContainer = styled('div')`
  margin-top: 20px;
  padding: 0 20px;
`;

export const Table = styled('table')`
  width: 100%;
`;

export const THead = styled('thead')`
  border-top: 2px solid #333;
  border-bottom: 2px solid #eee;
`;

export const Tbody = styled('tbody')``;

export const HeadTr = styled('tr')``;

export const Th = styled('th')`
  padding: 20px 10px;
  &:nth-of-type(1) {
    width: 10%;
  }
  &:nth-of-type(2) {
    width: 70%;
  }
  &:nth-of-type(3) {
    width: 20%;
  }
`;

export const BodyTr = styled('tr')`
  border-bottom: 2px solid #eee;
  &:hover {
    background: #eee;
  }
`;

export const Td = styled('td')`
  padding: 20px 10px;
  text-align: center;
  &:nth-of-type(2) {
    height: 100%;
    padding: 0 10px;
    //text-align: left;
  }
`;

export const CellLink = styled(Link)`
  display: block;
  > span {
    display: inline-block;
    padding: 10px 0;
  }
`;
