'use client';

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { TestimonyModal } from '@/components/block/testimonyModal/TestimonyModal';
import { useBodyScrollLock } from '@/hooks/utils/useBodyScrollLock';
interface ModalContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modalInfo: ModalInfo;
  setModalInfo: Dispatch<SetStateAction<ModalInfo>>;
}

export interface ModalInfo {
  name: string;
  title: string;
  htmlContent: string;
}

const modalContext = createContext<ModalContext>({
  isOpen: false,
  setIsOpen: () => {},
  modalInfo: {
    name: '',
    title: '',
    htmlContent: ''
  },
  setModalInfo: () => {}
});

export const ModalProvider: FC<PropsWithChildren> = props => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    name: '',
    title: '',
    htmlContent: ''
  });
  return (
    <modalContext.Provider
      value={{ isOpen, setIsOpen, modalInfo, setModalInfo }}
    >
      {isOpen ? (
        <TestimonyModal
          name={modalInfo.name}
          title={modalInfo.title}
          htmlContent={modalInfo.htmlContent}
        />
      ) : (
        <></>
      )}
      <>{children}</>
    </modalContext.Provider>
  );
};

export const useModal = () => {
  const { setIsOpen, setModalInfo } = useContext(modalContext);
  const { lockScroll, openScroll } = useBodyScrollLock();

  const handleOpenModal = (info: ModalInfo) => {
    setModalInfo(info);
    lockScroll();
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalInfo({ title: '', htmlContent: '', name: '' });
    openScroll();
    setIsOpen(false);
  };

  return { handleOpenModal, handleCloseModal };
};
