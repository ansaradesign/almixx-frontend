import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { PropsWithChildren, useState } from 'react';

export const ModalScrollableArea = ({ children }: PropsWithChildren) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event: any) => {
    setScrollPosition(event.target.scrollTop);
  };

  return (
    <ScrollShadow
      hideScrollBar
      onPointerDownCapture={(e) => {
        if (scrollPosition > 0) {
          e.stopPropagation();
        }
      }}
      onScroll={handleScroll}
      className='w-full h-full flex flex-col gap-6 items-center p-6 flex-shrink'
    >
      {children}
    </ScrollShadow>
  );
};
