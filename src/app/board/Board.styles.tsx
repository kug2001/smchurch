import styled from '@emotion/styled';
import Link from 'next/link';
import { mq } from '@/components/block/share/share.styles';

export const BoardTitle = styled('strong')`
  display: inline-block;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 60px;
  font-size: 46px;
  font-weight: 700;
  color: #5d415d;
`;

export const TableContainer = styled('div')`
  margin-top: 20px;
  padding: 0 20px;
  ${mq} {
    display: none;
  }
`;

export const Table = styled('table')`
  width: 100%;
`;

export const THead = styled('thead')`
  border-top: 2px solid #666;
  border-bottom: 1px solid #e6e6e6;
`;

export const Tbody = styled('tbody')``;

export const HeadTr = styled('tr')``;

export const Th = styled('th')`
  padding: 20px 10px;
  font-weight: 600;
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
  border-bottom: 1px solid #e6e6e6;
  &:hover {
    background: #e6e6e6;
  }
`;

export const Td = styled('td')`
  padding: 20px 10px;
  text-align: center;
  font-size: 14px;
  color: #333;
  &:nth-of-type(2) {
    height: 100%;
    padding: 0 10px;
    //text-align: left;
  }
`;

export const CellLink = styled(Link)`
  display: block;
  color: #333;
  > span {
    display: inline-block;
    text-decoration: none;
    padding: 10px 0;
  }
`;

export const ListContainer = styled('ul')`
  display: none;
  ${mq} {
    display: block;
  }
  > li {
    padding: 25px 10px 25px;
    border-bottom: 1px solid #e6e6e6;
    :hover {
      background-color: #fafbff;
    }
  }
`;

export const ListLink = styled(Link)`
  text-decoration: none;
`;

export const ListTitle = styled('strong')`
  display: flex;
  font-size: 16px;
  letter-spacing: -0.2px;
  color: #333;
  align-items: center;
`;

export const ListInfoBox = styled('div')`
  margin-top: 11px;
  font-size: 0;
`;

export const ListInfo = styled('span')`
  font-size: 12px;
  letter-spacing: -0.2px;
  color: #999;
  &:nth-last-child(1) {
    &::before {
      display: inline-block;
      width: 1px;
      height: 13px;
      margin: 0 8px -1px;
      background-color: #e6e6e6;
      content: '';
    }
  }
`;
