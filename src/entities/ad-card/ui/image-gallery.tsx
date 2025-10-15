import Image from 'next/image';
import { ImageType } from '../model/ad.type';

type Props = {
  images: ImageType[];
};

export const ImageGallery = ({ images }: Props) => {
  return (
    <div className='h-40 flex gap-[1px] overflow-x-scroll scrollbar-hide bg-[--element] snap-x snap-mandatory relative'>
      {images.map(({ full, preview }, index) => (
        <Image
          key={full}
          src={full}
          blurDataURL={preview}
          placeholder='blur'
          unoptimized
          alt='image'
          width={240}
          height={160}
          quality={40}
          priority={index < 3}
          className='snap-start flex-shrink-0 object-cover h-full z-10'
        />
      ))}
    </div>
  );
};
