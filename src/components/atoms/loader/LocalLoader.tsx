import { FC, PropsWithChildren } from 'react';
import {
  LocalLoaderMask,
  StyledLocalLoader
} from '@/components/atoms/loader/loader.styles';

interface LocalLoaderProps {
  isLoading: boolean;
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
