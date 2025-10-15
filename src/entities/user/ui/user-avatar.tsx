/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar } from '@nextui-org/avatar';
import { clsx } from 'clsx';
import { PiUser } from 'react-icons/pi';

type Props = {
  src: string | null;
  isSubscribed?: boolean;
  isBig?: boolean;
};

export const UserAvatar = ({
  src,
  isSubscribed = false,
  isBig = false,
}: Props) => {
  const ringStyles = clsx(
    'rounded-full absolute top-0 left-0 right-0 bottom-0',
    {
      'bg-default-300 dark:bg-default-100': !isSubscribed,
      'gradient-background ': isSubscribed,
    },
  );

  const shadowStyles = clsx(
    'gradient-background rounded-full absolute top-0 left-0 right-0 bottom-0',
    {
      'blur-sm dark:blur-[6px]': !isBig,
      'blur-[28px]': isBig,
    },
  );

  return (
    <div className='relative w-full h-full p-1 '>
      <Avatar
        src={src || undefined}
        icon={<PiUser className='w-1/2 h-1/2 opacity-30' />}
        className='w-full h-full flex-shrink-0 z-30 border-4 border-[--bg]'
      />

      <div className={ringStyles} />
      {isSubscribed && <div className={shadowStyles} />}
    </div>
  );
};
