import { clsx } from 'clsx';
import { m } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  type?: 'default' | 'error';
};

export const NotificationBubble = ({ children, type = 'default' }: Props) => {
  const bubbleStyles = clsx(
    'w-full px-4 py-3 rounded-xl text-sm bg-opacity-10 flex-shrink-0',
    {
      'bg-[--element]': type === 'default',
      'bg-red-500  text-red-500': type === 'error',
    },
  );

  return (
    <m.div
      layout
      initial={{ opacity: 0, filter: 'blur(20px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      className={bubbleStyles}
    >
      {children}
    </m.div>
  );
};
