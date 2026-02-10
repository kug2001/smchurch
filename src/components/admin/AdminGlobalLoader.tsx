import { FC, PropsWithChildren } from 'react';
import { Loader2 } from 'lucide-react';

interface AdminGlobalLoaderProps {
  isLoading: boolean;
}

export const AdminGlobalLoader: FC<
  PropsWithChildren<AdminGlobalLoaderProps>
> = props => {
  const { isLoading, children } = props;
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  return <>{children}</>;
};
