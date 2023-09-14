import { useInsertionEffect, useState } from 'react';
import ScrollOut, { IScrollOutOptions } from 'scroll-out';

export default function useScrollOut(config?: IScrollOutOptions) {
  const [scrollConfig, setScrollConfig] = useState<IScrollOutOptions | any>({});
  useInsertionEffect(() => {
    // console.log(config);
    const soInstance = ScrollOut({
      ...config
    });

    return () => {
      soInstance.teardown();
    };
  }, [config]);

  return [scrollConfig, setScrollConfig];
}
