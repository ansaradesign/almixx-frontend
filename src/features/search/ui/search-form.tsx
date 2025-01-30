/* eslint-disable jsx-a11y/no-autofocus */
import { apiClient } from '@albomoni/shared/api/base';
import { useLangContext } from '@albomoni/shared/lib/providers';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { Button } from '@nextui-org/button';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useDebounce } from 'react-use';
import { TSearchTip } from '../model/search.type';
import { SearchModalProps } from './search-modal';

type Props = {
  value: string;
  setValue: (text: string) => void;
  setIsLoading: (bool: boolean) => void;
  setTips: (tops: TSearchTip[]) => void;
} & SearchModalProps;

export const SearchForm = ({
  value,
  setValue,
  onClose,
  setIsLoading,
  setTips,
}: Props) => {
  const router = useRouter();
  const lang = useLangContext();
  const { city, country } = getLocation();

  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const getSearchTips = async () => {
      const resp = await apiClient.get<TSearchTip[]>('search', {
        search: debouncedValue,
        country,
        city,
      });

      setTips(resp);
    };

    if (value.length > 2) {
      try {
        getSearchTips();
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
  }, [debouncedValue]);

  useDebounce(
    () => {
      setDebouncedValue(value);
    },
    500,
    [value],
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (value.length < 3) return;

    onClose();
    router.push(`/${lang}/search?query=${value}`);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsLoading(true);
    setValue(e.target.value);
  };

  return (
    <m.form
      onSubmit={handleSubmit}
      layoutId='search'
      className='w-full h-16 md:h-20 rounded-full bg-default pr-[10px] pl-4 md:px-6 flex gap-4 items-center'
    >
      <PiMagnifyingGlassBold className='w-6 h-6 lg:w-10 lg:h-10 flex-shrink-0 opacity-50 max-md:ml-2 max-md:hidden' />
      <input
        autoFocus
        type='text'
        className='w-full text-lg md:text-2xl font-medium bg-transparent outline-none'
        value={value}
        onChange={handleChange}
      />
      <Button
        isDisabled={value.length < 3}
        type='submit'
        size='lg'
        color='primary'
        radius='full'
        variant='shadow'
        className='flex-shrink-0 px-0 min-w-12 md:min-w-24'
      >
        <PiMagnifyingGlassBold className='w-6 h-6 flex-shrink-0 md:hidden' />
        <p className='hidden md:block font-medium '>Найти</p>
      </Button>
    </m.form>
  );
};
