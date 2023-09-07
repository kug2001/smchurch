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

export const DetailBoardTitle = styled('strong')`
  display: block;
  padding-bottom: 24px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

export const WrapDetailSubTitle = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #1a1a1a;
  font-size: 16px;
  color: #999;
  span {
    vertical-align: top;
  }
  span + span {
    ::before {
      display: inline-block;
      position: relative;
      top: 2px;
      width: 2px;
      height: 16px;
      margin: 0 8px;
      background: #999;
      content: '';
    }
  }
`;

export const WrapDetailViewer = styled('div')`
  min-height: 500px;
`;

export const WrapDetailBtn = styled('div')`
  margin-top: 24px;
  padding: 24px 0;
  border-top: 1px solid #1a1a1a;
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
