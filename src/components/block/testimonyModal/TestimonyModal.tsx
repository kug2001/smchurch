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
  const { name, job, htmlContent } = props;
  const { handleCloseModal } = useModal();
  return (
    <PopUpLayer>
      <InnerLayer>
        <LayerHead>
          <TitPopUp>{`${name} ${job} 간증`}</TitPopUp>
          <CloseBtn
            onClick={e => {
              e.preventDefault();
              handleCloseModal();
            }}
          >
            <CloseIcon />
          </CloseBtn>
        </LayerHead>
        <LayerBody dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </InnerLayer>
    </PopUpLayer>
  );
};
