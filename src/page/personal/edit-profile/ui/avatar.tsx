'use client';

import { API_URL } from '@albomoni/shared/config';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { PiPlusBold, PiTrashBold, PiUser } from 'react-icons/pi';

type Props = {
  url: string | null;
};

export const EditAvatar = ({ url }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFatImage, setIsFatImage] = useState(false);
  const token = getCookie('token');

  const handleOpenInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = async (e: FormEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const target = e.target as HTMLInputElement & { files: FileList };

    if (target.files[0].size > 1 * 1024 * 1024) {
      setIsFatImage(true);
      setIsLoading(false);
      return;
    }

    setIsFatImage(false);

    const formData = new FormData();

    formData.append('file', target.files[0]);

    await fetch(`${API_URL}edit-user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
      },
      method: 'POST',
      body: formData,
    });

    setIsLoading(false);
    router.refresh();
  };

  const handleDelete = async () => {
    setIsLoading(true);

    setIsFatImage(false);

    await fetch(`${API_URL}edit-user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    });

    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <h3 className='opacity-50 font-medium'>Аватар</h3>
      <div className='w-full flex gap-4 items-center'>
        <Avatar
          src={url || undefined}
          classNames={{ base: 'w-32 h-32 flex-shrink-0' }}
          icon={<PiUser className='w-1/2 h-1/2 opacity-30' />}
        />

        <div className='w-full flex flex-col gap-3'>
          <Button
            isDisabled={isLoading}
            size='md'
            radius='full'
            className='w-fit'
            onPress={handleOpenInput}
          >
            <PiPlusBold />
            {url ? ' Изменить' : 'Загрузить'}
          </Button>
          <Button
            isDisabled={!url || isLoading}
            size='md'
            radius='full'
            className='w-fit text-danger'
            onPress={handleDelete}
            startContent={<PiTrashBold />}
          >
            Удалить
          </Button>
        </div>
      </div>
      {isFatImage && (
        <NotificationBubble type='error'>
          Размер загружаемого файла не должен превышать 2 Мб
        </NotificationBubble>
      )}
      <input
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleInputChange}
        ref={fileInputRef}
      />
    </div>
  );
};
