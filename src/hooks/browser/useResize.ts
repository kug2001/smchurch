import { useEffect, useState } from 'react';

export default function useResize() {
  // const [mount, setMount] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const updateSize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    window.addEventListener('resize', () => updateSize());
    return () => window.removeEventListener('resize', () => updateSize());
  }, []);

  return { width, height };
}
