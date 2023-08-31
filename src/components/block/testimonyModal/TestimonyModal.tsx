'use client';

import { FC } from 'react';
import { ModalInfo, useModal } from '@/components/provider/ModalProvider';
import {
  CloseBtn,
  InnerLayer,
  LayerBody,
  LayerHead,
  PopUpLayer,
  TitPopUp
} from '@/components/block/testimonyModal/testimony.styles';
import CloseIcon from '@mui/icons-material/Close';

export const TestimonyModal: FC<ModalInfo> = props => {
  const { name, htmlContent } = props;
  const { handleCloseModal } = useModal();
  return (
    <PopUpLayer>
      <InnerLayer>
        <LayerHead>
          <TitPopUp>{`${name} 간증`}</TitPopUp>
          <CloseBtn onClick={handleCloseModal}>
            <CloseIcon />
          </CloseBtn>
        </LayerHead>
        <LayerBody dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </InnerLayer>
    </PopUpLayer>
  );
};
