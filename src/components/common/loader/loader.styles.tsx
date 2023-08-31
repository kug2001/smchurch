import { CircularProgress, styled } from '@mui/material';

export const LoaderMask = styled('div')`
  display: flex;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #9c27b009;
`;

export const StyledLoader = styled(CircularProgress)`
  margin: auto;
  //transform: scale(10000%);
`;

export const LocalLoaderMask = styled('div')`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #9c27b009;
`;

export const StyledLocalLoader = styled(CircularProgress)`
  margin: auto;
`;
