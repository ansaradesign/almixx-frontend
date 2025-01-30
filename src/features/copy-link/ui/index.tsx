'use client';

import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';
import { PiCopyBold } from 'react-icons/pi';
import { useCopyToClipboard } from 'react-use';

export const CopyLinkButton = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleClick = () => {
    if (!isCopied) {
      copyToClipboard(window.location.href);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    }
  }, [isCopied]);

  return (
    <Button
      size='lg'
      className='w-full font-medium'
      color={isCopied ? 'success' : 'default'}
      startContent={<PiCopyBold size={20} className='flex-shrink-0' />}
      onPress={handleClick}
    >
      {isCopied ? 'Скопировано' : 'Скопировать ссылку'}
    </Button>
  );
};
