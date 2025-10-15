'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Carousel } from './carousel';
import { Fancybox } from './fancybox';

type Props = {
  images?: { full: string; preview: string }[];
};

export const ImageViewer = ({ images }: Props) => {
  const { resolvedTheme } = useTheme();
  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: true,
        },
        Toolbar: {
          display: {
            left: [],
            middle: [],
            right: ['close'],
          },
        },
        Images: {
          Panzoom: {
            maxScale: 5,
          },
        },
        on: {
          reveal: () => {
            const themeColorMeta = document.querySelector(
              'meta[name="theme-color"]',
            );

            if (themeColorMeta && resolvedTheme === 'light') {
              themeColorMeta.setAttribute('content', '#000000');
            }
          },
          close: () => {
            const themeColorMeta = document.querySelector(
              'meta[name="theme-color"]',
            );

            if (themeColorMeta && resolvedTheme === 'light') {
              themeColorMeta.setAttribute('content', '#fffffe');
            }
          },
        },
      }}
    >
      <Carousel
        options={{
          infinite: true,
          Dots: true,
          Thumbs: false,
        }}
      >
        {images?.map(({ full, preview }) => (
          <div
            key={full}
            className='f-carousel__slide'
            data-fancybox='gallery'
            data-src={full}
            data-thumb-src={preview}
          >
            <Image
              width={500}
              height={300}
              quality={70}
              unoptimized
              src={full}
              alt='img'
              className='snap-start flex-shrink-0 object-cover h-full w-full'
            />
          </div>
        ))}
      </Carousel>
    </Fancybox>
  );
};
