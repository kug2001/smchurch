import styled from '@emotion/styled';
import { mq } from '@/components/block/share/share.styles';

export const DocFooter = styled('footer')`
  background-color: #ddd;
`;

export const InnerFooter = styled('div')`
  width: 100%;
  text-align: center;
  padding: 20px 0;
`;

export const Address = styled('address')`
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  color: #333;
  ${mq} {
    font-size: 13px;
  }
`;

export const PhoneNumber = styled('p')`
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  margin-left: 10px;
  color: #333;
  &::before {
    display: inline-block;
    position: relative;
    width: 2px;
    top: 1px;
    height: 14px;
    margin-right: 8px;
    background: #333;
    content: '';
  }
  ${mq} {
    display: block;
    margin-top: 8px;
    font-size: 13px;
    &::before {
      display: none;
    }
  }
`;

export const Copyright = styled('p')`
  margin-top: 10px;
  font-size: 13px;
  color: #333;
`;
