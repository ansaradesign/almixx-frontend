/* eslint-disable jsx-a11y/no-autofocus */

import { m } from 'framer-motion';
import { PiXBold } from 'react-icons/pi';
import { RemoveScroll } from 'react-remove-scroll';
import { useState } from 'react';
import { Spinner } from '@nextui-org/react';
import { SearchForm } from './search-form';
import { SearchTips } from './search-tips';
import { TSearchTip } from '../model/search.type';

export type SearchModalProps = {
  onClose: () => void;
};

export const SearchModal = ({ onClose }: SearchModalProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tips, setTips] = useState<TSearchTip[]>([]);

  const isValueShort = searchValue.length < 3;

  return (
    <RemoveScroll className='fixed inset-0 z-[200]'>
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='w-full h-full flex flex-col gap-8 p-4 lg:p-8 bg-[--bg] m-auto items-center'
      >
        <div className='w-full flex gap-4 md:gap-8 max-w-7xl'>
          <SearchForm
            value={searchValue}
            setValue={setSearchValue}
            onClose={onClose}
            setIsLoading={setIsLoading}
            setTips={setTips}
          />
          <button
            onClick={onClose}
            type='button'
            aria-label='close'
            className='h-full aspect-square rounded-full bg-default flex items-center justify-center'
          >
            <PiXBold className='w-2/5 h-2/5' />
          </button>
        </div>
        <div className='w-full flex flex-col gap-4 md:gap-8 max-w-7xl mt-6'>
          {isValueShort && (
            <p className='text-lg font-medium opacity-50'>
              Введите хотя бы 3 символа...
            </p>
          )}
          {!isValueShort && isLoading && <Spinner />}
          {!isValueShort && !isLoading && <SearchTips tips={tips} onClose={onClose} />}
        </div>
      </m.section>
    </RemoveScroll>
  );
};
