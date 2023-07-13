import styled from '@emotion/styled';

export const InnerContainer = styled('div')`
  padding: 40px 40px;
`;

export const Title = styled('strong')`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 700;
  border-bottom: 2px solid #000;
`;

export const AddBtn = styled('button')`
  display: inline-block;
  margin-left: 30px;
  height: 40px;
  background: #e1e1e1;
  border-radius: 4px;
  border: 1px solid #000;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

export const Description = styled('p')`
  margin-bottom: 40px;
`;
