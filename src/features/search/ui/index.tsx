'use client';

import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { SearchModal } from './search-modal';

type Props = {
  isScrollable?: boolean;
};

export const Search = ({ isScrollable = false }: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  const closeModal = () => {
    setIsOpened(false);
  };

  return (
    <>
      <m.button
        layoutId='search'
        type='button'
        onClick={() => setIsOpened(true)}
        className='w-full h-12 bg-default rounded-2xl px-4 text-start flex gap-3 items-center '
      >
        <PiMagnifyingGlassBold size={20} className='opacity-50' />
        <p className='font-medium opacity-50'> Найти на Almixx</p>
      </m.button>
      <AnimatePresence>
        {isOpened && <SearchModal onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
};
