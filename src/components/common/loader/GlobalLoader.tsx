import { FC, PropsWithChildren } from 'react';
import {
  LoaderMask,
  StyledLoader
} from '@/components/common/loader/loader.styles';

interface GlobalLoaderProps {
  isLoading: boolean;
}

export const GlobalLoader: FC<PropsWithChildren<GlobalLoaderProps>> = props => {
  const { isLoading, children } = props;
  if (isLoading) {
    return (
      <LoaderMask>
        <StyledLoader color={'secondary'} />
      </LoaderMask>
    );
  }
  return <>{children}</>;
};
