import { Button } from '@nextui-org/button';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PiCopyBold } from 'react-icons/pi';
import { useCopyToClipboard } from 'react-use';
import { getCookie } from 'cookies-next';
import { Spinner } from '@nextui-org/spinner';
import { GetContactsQuery } from '../../../../api/get-contacts/query';
import { useModal } from '../../../../lib/use-modal';

export const ContactWithSellerUserContent = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const { modalData } = useModal();
  const token = getCookie('token');

  const { data, isLoading } = useQuery(
    GetContactsQuery(modalData.user_id, modalData.ad_id, token as string),
  );

  const handleClick = () => {
    if (!isCopied) {
      copyToClipboard(data?.phone || '0');
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  if (isLoading) {
    return (
      <div className='w-full h-44 flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <p className='font-medium opacity-50 -mb-4 w-full'>Номер телефона</p>
      <Button
        size='lg'
        onPress={handleClick}
        color={isCopied ? 'success' : 'default'}
        className='w-full flex px-4 rounded-2xl justify-between items-center font-semibold'
      >
        {isCopied ? (
          <p className='text-lg'>Номер скопирован</p>
        ) : (
          <p className='text-xl opacity-60'>{data?.phone}</p>
        )}

        <PiCopyBold size={24} className='opacity-60' />
      </Button>
      <p className='font-medium opacity-50'>
        Скопируйте номер и свяжитесь с продавцом напрямую, позвонив ему или
        написав в мессенджеры.
      </p>
    </>
  );
};
