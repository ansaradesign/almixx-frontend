import { useEffect, useState } from 'react';

export const useScrolledTo = (targetPixels: number) => {
  const [scrolledTo, setScrolledTo] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolledTo(currentScrollY >= targetPixels);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [targetPixels]);

  return scrolledTo;
};
