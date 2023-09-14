import styled from '@emotion/styled';

export const DocFooter = styled('footer')`
  background-color: #ddd;
`;

export const InnerFooter = styled('div')`
  //display: flex;
  //flex-direction: column;
  //justify-content: center;
  //align-items: center;
  width: 100%;
  text-align: center;
  padding: 20px 0;
`;

export const Address = styled('address')`
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const PhoneNumber = styled('p')`
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
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
`;

export const Copyright = styled('p')`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;
