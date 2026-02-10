import { FC, PropsWithChildren } from 'react';
import { Loader2 } from 'lucide-react';

interface AdminLoaderProps {
  isLoading: boolean;
}

export const AdminLoader: FC<PropsWithChildren<AdminLoaderProps>> = props => {
  const { isLoading, children } = props;
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  return <>{children}</>;
};
