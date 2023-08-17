import { FC } from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps
} from '@mui/material';

// interface ButtonProps extends MuiButtonProps {
//   key?: any;
// }

export const Button: FC<MuiButtonProps> = props => {
  return <MuiButton {...props} />;
};
