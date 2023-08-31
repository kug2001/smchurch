import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import { mq } from '@/components/block/share/share.styles';

export const PeopleContainer = styled('ul')`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const TitIntroPeople = styled('h3')`
  text-align: center;
  margin: 0 0 40px;
  font-size: 24px;
  font-weight: 600;
`;

export const PeopleTooltip = styled(Tooltip)``;

export const PeopleImg = styled(Image)`
  cursor: pointer;
  ${mq} {
    width: 80px;
    height: 80px;
  }
`;

export const IntroTitle = styled('strong')`
  font-size: 70px;
  font-weight: 700;
  color: #fff;
`;

export const Poem = styled('p')`
  margin: 70px 30px;
  font-size: 22px;
  font-style: italic;
  line-height: 30px;
  color: #fff;
`;

export const IntroMessage = styled('p')`
  font-size: 22px;
  font-style: italic;
  line-height: 30px;
  color: #fff;
`;
