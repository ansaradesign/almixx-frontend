'use client';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { PiWarningCircle } from 'react-icons/pi';

export default function Error() {
  const router = useRouter();

  return (
    <div className='h-dvh flex flex-col items-center justify-center text-center gap-8 px-4'>
      <PiWarningCircle size={100} className='text-danger animate-pulse' />
      <h2 className='text-2xl font-semibold text-danger max-w-96'>
        Произошла непредвиденная ошибка.
      </h2>

      <div className='w-full flex flex-col gap-4 max-w-96'>
        <Button
          size='lg'
          color='primary'
          variant='shadow'
          onClick={() => window.location.reload()}
        >
          Перезагрузить страницу
        </Button>
        <Button size='lg' onClick={() => router.push('/')}>
          На главную
        </Button>
      </div>
    </div>
  );
}
