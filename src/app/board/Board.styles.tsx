import styled from '@emotion/styled';
import Link from 'next/link';
import { mq } from '@/components/block/share/share.styles';
import Image from 'next/image';
import { Button } from '@mui/material';

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

export const TotalCount = styled('div')`
  padding: 0 20px;
  font-weight: 600;
  color: #333;
  ${mq} {
    display: none;
  }
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
    //width: 10%;
  }
  &:nth-of-type(2) {
    //width: 70%;
  }
  &:nth-of-type(3) {
    //width: 20%;
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
  display: block;
  max-width: 800px;
  margin: auto;
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

export const WrapProfile = styled('div')`
  display: inline-flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const ProfileImage = styled(Image)`
  margin-right: 8px;
  border-radius: 50%;
`;

export const ProfileName = styled('span')`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
`;

export const ProfileInfo = styled('span')`
  display: block;
  font-weight: 400;
  color: #919191;
`;

export const ListLink = styled(Link)`
  text-decoration: none;
`;

export const ListTitle = styled('strong')`
  display: flex;
  font-size: 16px;
  line-height: 24px;
  color: #333;
  align-items: center;
  margin-bottom: 16px;
`;

export const ListInfoBox = styled('div')`
  position: relative;
  width: 33vw;
  height: 50vh;
  margin: auto;
  ${mq} {
    width: 80vw;
    height: 80vw;
  }
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

export const WrapMore = styled('div')`
  display: flex;
  justify-content: center;
  padding: 16px;
`;
export const MoreBtn = styled(Button)`
  //  display: flex;
  //  justify-content: center;
`;

export const FamilyContainer = styled('div')`
  padding: 0 20px;
`;

export const FamilyTitle = styled('strong')`
  display: block;
  //width: 100%;
  margin-bottom: 60px;
  padding-bottom: 10px;
  border-bottom: 3px solid #5d4251;
  font-size: 46px;
  font-weight: 700;
  color: #5d4251;
  ${mq} {
    font-size: 30px;
  }
`;

export const FamilyMsg = styled('p')`
  display: block;
  margin-bottom: 40px;
  font-size: 18px;
  color: #5d4251;
  line-height: 32px;
  ${mq} {
    padding: 0 10px;
    font-size: 14px;
  }
`;

export const Br = styled('br')`
  &.mo {
    display: none;
    ${mq} {
      display: block;
    }
  }
`;
