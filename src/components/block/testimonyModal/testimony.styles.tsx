import { styled } from '@mui/material';
import { mq } from '@/components/block/share/share.styles';

export const PopUpLayer = styled('div')`
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

export const InnerLayer = styled('div')`
  flex: none;
  position: relative;
  width: 600px;
  margin: auto;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: left;
  background: #fff;
  ${mq} {
    width: 100%;
  }
`;

export const LayerHead = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #5d4251;
`;

export const TitPopUp = styled('strong')`
  overflow: hidden;
  display: block;
  max-width: 100%;
  font-size: 24px;
  color: #fff;
  font-weight: 500;
  line-height: 36px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CloseBtn = styled('button')`
  border: none;
  background: transparent;
  > svg {
    fill: #1a1a1a;
  }
  &:hover {
    > svg {
      fill: #fff;
    }
  }
`;

export const LayerBody = styled('div')`
  overflow: scroll;
  box-sizing: border-box;
  padding: 30px;
  min-height: 108px;
  max-height: 500px;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  color: #1a1a1a;
`;
