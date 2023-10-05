import { styled } from '@mui/material';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { mq } from '@/components/block/share/share.styles';

export const PaginationContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  //max-width: 500px;
`;
export const UnOrderList = styled('ul')`
  li {
    display: inline-block;
    border-radius: 4px;
    margin: 0 4px;

    :hover {
      background-color: #5d415d33;
    }
    &.on {
      background-color: #5d415d;
      > button {
        color: #fff;
      }
    }
  }
`;

export const PrevNextBtn = styled('button')`
  margin: 0 4px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  :hover {
    background-color: #5d415d33;
  }
  :disabled {
    cursor: not-allowed;
    color: #eee;
  }
`;

export const PrevIcon = styled(NavigateNextOutlinedIcon)`
  transform: rotate(180deg);
  vertical-align: middle;
`;

export const NumberBtn = styled('button')`
  font-size: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  ${mq} {
    font-size: 16px;
  }
`;

export const NextIcon = styled(NavigateNextOutlinedIcon)`
  vertical-align: middle;
`;
