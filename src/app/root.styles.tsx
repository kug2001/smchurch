import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import { mq } from '@/components/block/share/share.styles';
import { AdvancedImage } from '@cloudinary/react';

export const WrapPeopleContainer = styled('div')`
  display: flex;
  justify-content: center;
`;
export const PeopleContainer = styled('ul')`
  display: grid;
  grid-template-columns: repeat(10, 100px);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
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
  font-size: 24px;
  font-weight: 600;
`;

export const PeopleTooltip = styled(Tooltip)``;

// export const PeopleImg = styled(Image)`
//   cursor: pointer;
//   ${mq} {
//     width: 80px;
//     height: 80px;
//   }
// `;

export const PeopleImg = styled(AdvancedImage)`
  cursor: pointer;
  ${mq} {
    width: 50px;
    height: 50px;
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
