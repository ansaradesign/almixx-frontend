'use client';

import { useRef } from 'react';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Button } from '@nextui-org/button';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { scrollLeft, scrollRight } from './lib/scroll';

interface Props {
  children: React.ReactNode;
}

export const CategoriesContainer = ({ children }: Props) => {
  const slideRef = useRef<HTMLElement | null>(null);

  const scrollToStart = () => {
    scrollLeft(slideRef);
  };

  const scrollToEnd = () => {
    scrollRight(slideRef);
  };

  return (
    <div className='w-full flex flex-col max-w-7xl gap-8'>
      <div className='w-full flex justify-between px-4'>
        <h2 className='text-xl md:text-2xl font-bold'>Категории</h2>
        <div className='flex gap-2'>
          <Button
            className='mr-2'
            onPress={scrollToStart}
            isIconOnly
            radius='full'
          >
            <PiCaretLeftBold size={20} />
          </Button>
          <Button onPress={scrollToEnd} isIconOnly radius='full'>
            <PiCaretRightBold size={20} />
          </Button>
        </div>
      </div>
      <ScrollShadow
        orientation='horizontal'
        hideScrollBar
        className='grid grid-flow-col grid-rows-2 sm:flex sm:flex-row gap-4 py-1 px-4 overflow-y-hidden -mt-2'
        ref={slideRef}
      >
        {children}
      </ScrollShadow>
    </div>
  );
};
