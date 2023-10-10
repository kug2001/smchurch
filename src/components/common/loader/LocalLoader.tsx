import { FC, PropsWithChildren } from 'react';
import {
  LocalLoaderMask,
  StyledLocalLoader
} from '@/components/common/loader/loader.styles';

interface LocalLoaderProps {
  isLoading: boolean;
  bgColor?: string;
}

export const LocalLoader: FC<PropsWithChildren<LocalLoaderProps>> = props => {
  const { isLoading, children } = props;
  if (isLoading) {
    return (
      <LocalLoaderMask>
        <StyledLocalLoader color={'secondary'} />
      </LocalLoaderMask>
    );
  }
  return <>{children}</>;
};
