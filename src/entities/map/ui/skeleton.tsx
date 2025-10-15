import { Input } from '@nextui-org/input';
import { Skeleton } from '@nextui-org/react';
import { PiMapPinBold } from 'react-icons/pi';

export const MapSkeleton = ({ onSave }: { onSave?: () => void }) => {
  return (
    <>
      <div className='-mt-4 flex items-center'>
        <Input
          size='lg'
          startContent={<PiMapPinBold size={20} className='opacity-50' />}
          type='text'
          placeholder='Введите адрес'
          classNames={{ input: 'font-medium' }}
        />
        {onSave && <div className='w-[25px] h-[25px] ml-2 cursor-pointer' />}
      </div>
      <Skeleton className='w-full aspect-square md:aspect-video rounded-2xl' />
    </>
  );
};
