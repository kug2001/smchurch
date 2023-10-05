import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import { mq } from '@/components/block/share/share.styles';
import { AdvancedImage } from '@cloudinary/react';
import { motion } from 'framer-motion';

export const WrapPeopleContainer = styled('div')`
  display: flex;
  justify-content: center;
  margin: 80px 0;
`;

export const CoverContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 90vh;
  ${mq} {
    height: 24vh;
  }
`;

export const GoToTestimonyBtn = styled('button')`
  display: block;
  position: relative;
  top: 80%;
  left: 50%;
  width: 200px;
  height: 50px;
  font-size: 18px;
  color: #1a1a1a;
  font-weight: 700;
  border: none;
  border-radius: 16px;
  background: #ffffffdd;
  transform: translate(-50%, -50%);
  ${mq} {
    width: 100px;
    height: 30px;
    font-size: 14px;
  }
  &:hover {
    background: #ffffff;
  }
`;
export const PeopleContainer = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(10, 100px);
  grid-column-gap: 3px;
  grid-row-gap: 3px;
  place-items: center;
  @media (max-width: 1128px) {
    grid-template-columns: repeat(7, 100px);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(6, 50px);
  }
  > li {
    font-size: 0;
  }
`;

export const TitIntroPeople = styled('h3')`
  text-align: center;
  margin: 0 0 40px;
  font-size: 40px;
  color: #5d415d;
  font-weight: 600;
  ${mq} {
    font-size: 20px;
  }
`;

export const PeopleTooltip = styled(Tooltip)``;
export const PeopleImg = styled(AdvancedImage)`
  border-radius: 4px;
  //border: 1px solid #eee;
  ${mq} {
    width: 50px;
    height: 50px;
  }
`;

export const PeopleBtn = styled(motion.button)`
  display: block;
  padding: 0;
  border: 0 none;
  background-color: transparent;
  border-radius: 4px;
  font-size: 0;
`;

export const IntroTitle = styled(motion.strong)`
  display: block;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  color: #fff;
  ${mq} {
    font-size: 24px;
  }
`;

export const WrapPoem = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

export const Poem = styled('p')`
  padding: 70px 50px;
  font-size: 16px;
  font-weight: 500;
  font-style: italic;
  line-height: 30px;
  color: #fff;
  ${mq} {
    font-size: 13px;
  }
`;

export const IntroMessage = styled(motion.p)`
  font-size: 22px;
  text-align: center;
  //font-style: italic;
  line-height: 35px;
  color: #fff;
  ${mq} {
    font-size: 14px;
    line-height: 28px;
  }
`;
