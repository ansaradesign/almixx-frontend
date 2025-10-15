import React, { useRef, useEffect, PropsWithChildren } from 'react';

import { Carousel as NativeCarousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';

import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';

import type { OptionsType } from '@fancyapps/ui/types/Carousel/options';

interface Props {
  options?: Partial<OptionsType>;
}

const defaults: Partial<OptionsType> = {
  Dots: false,
  Thumbs: {
    type: 'modern',
  },
};

export const Carousel = (props: PropsWithChildren<Props>) => {
  const containerRef = useRef(null);
  const { options: nativeOptions, children } = props;

  useEffect(() => {
    const container = containerRef.current;
    const options = {
      ...defaults,
      ...(nativeOptions || {}),
    };

    const instance = new NativeCarousel(container, options, { Thumbs });

    return () => {
      instance.destroy();
    };
  });

  return (
    <div
      className='w-full f-carousel h-96 sm:h-[32rem] md:h-[38rem] flex items-center justify-center'
      ref={containerRef}
    >
      {children}
    </div>
  );
};
