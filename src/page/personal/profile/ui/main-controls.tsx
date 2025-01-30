import Link from 'next/link';
import {
  PiCaretRightBold,
  PiPencilSimpleBold,
  PiWalletBold,
} from 'react-icons/pi';

export const ProfileMainControls = () => {
  return (
    <div className='w-full grid md:grid-cols-2 gap-4 md:gap-6'>
      <Link href='/profile/edit-profile'>
        <button
          type='button'
          className='w-full shadow-base px-5 py-4 dark:bg-default-100 rounded-2xl font-medium flex justify-between items-center hover:scale-[1.02] active:scale-[0.98] transition-transform'
        >
          <div className='flex gap-3 items-center'>
            <PiPencilSimpleBold size={18} />
            Управление профилем
          </div>
          <PiCaretRightBold size={18} className='opacity-50' />
        </button>
      </Link>

      <Link href='/profile/wallet'>
        <button
          type='button'
          className='w-full shadow-base px-5 py-4 dark:bg-default-100 rounded-2xl font-medium flex justify-between items-center hover:scale-[1.02] active:scale-[0.98] transition-transform'
        >
          <div className='flex gap-3 items-center'>
            <PiWalletBold size={18} />
            Кошелёк
          </div>
          <PiCaretRightBold size={18} className='opacity-50' />
        </button>
      </Link>
    </div>
  );
};
