import styled from '@emotion/styled';
import { mq } from '@/components/block/share/share.styles';
import { AdvancedImage } from '@cloudinary/react';

export const AlbumTitle = styled('strong')`
  display: block;
  //width: 100%;
  margin-bottom: 60px;
  padding-bottom: 10px;
  font-size: 46px;
  font-weight: 700;
  color: #5d4251;
  ${mq} {
    font-size: 30px;
  }
`;

export const HistoryImgContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const HistoryImg = styled(AdvancedImage)`
  border-radius: 4px;
  margin-bottom: 16px;
  //border: 1px solid #eee;
  ${mq} {
    width: 100%;
  }
`;
