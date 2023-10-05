import { styled } from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';

export const ImageTit = styled('div')`
  padding: 16px;
  font-size: 18px;
`;

export const BookImgContainer = styled('div')`
  display: flex;
`;

export const BookImg = styled(AdvancedImage)`
  padding: 10px 10px;
`;
