import styled from '@emotion/styled';
import { mq } from '@/components/block/share/share.styles';

export const FamilyContainer = styled('div')`
  padding: 0 40px;
`;

export const FamilyTitle = styled('strong')`
  display: block;
  //width: 100%;
  margin-bottom: 60px;
  padding-bottom: 10px;
  border-bottom: 3px solid #5d4251;
  font-size: 46px;
  font-weight: 700;
  text-align: center;
  color: #5d4251;
  ${mq} {
    font-size: 30px;
  }
`;

export const FamilyMsg = styled('p')`
  display: block;
  margin-bottom: 40px;
  font-size: 18px;
  text-align: center;
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
