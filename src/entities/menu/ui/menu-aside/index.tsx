import { Button } from '@nextui-org/button';
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Dropdown,
} from '@nextui-org/dropdown';
import Link from 'next/link';
import {
  PiCaretDownBold,
  PiCaretRightBold,
  PiCurrencyRubBold,
  PiFilesBold,
  PiMapPinBold,
  PiQuestionBold,
  PiTranslateBold,
} from 'react-icons/pi';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { UserAvatar } from '@albomoni/entities/user';
import { useLocalStorage } from 'react-use';
import { usePathname } from 'next/navigation';
import { Divider } from '@nextui-org/divider';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { ChangeThemeButton } from './change-theme-button';

type Props = {
  onClose: () => void;
};

export const MenuAside = ({ onClose }: Props) => {
  const { isLogged, user } = useSession();
  const pathname = usePathname();
  const [, setBackPage] = useLocalStorage<string>('back-page');
  const location = getLocation();

  const handleClickLocation = () => {
    setBackPage(pathname);
    onClose();
  };

  return (
    <aside className='w-full tablet:w-80 flex-shrink-0 flex flex-col gap-4'>
      {isLogged && user ? (
        <Link href='/profile'>
          <button
            type='button'
            onClick={onClose}
            className='w-full h-16 flex gap-4 items-center text-start'
          >
            <div className='w-16 h-16 flex-shrink-0 z-0'>
              <UserAvatar src={user.avatar} isSubscribed={user.subscription} />
            </div>

            <div className='flex flex-col justify-center w-full h-full'>
              <p className='text-lg font-bold'>{user.first_name}</p>
              <div className='w-full flex gap-1 items-center text-sm opacity-50'>
                Перейти в профиль
                <PiCaretRightBold
                  size={16}
                  className='flex-shrink-0 mt-[2px]'
                />
              </div>
            </div>
          </button>
        </Link>
      ) : (
        <Link href='/login'>
          <button
            type='button'
            className='w-full h-12 bg-gradient-to-r rounded-2xl from-blue-300 to-indigo-400 dark:from-blue-500 dark:to-indigo-400 text-white shadow-lg shadow-blue-400/40 font-semibold hover:scale-105 active:scale-95 transition-transform'
          >
            Вход и регистрация
          </button>
        </Link>
      )}

      <div className='flex gap-4'>
        <Dropdown
          backdrop='blur'
          placement='bottom'
          classNames={{ backdrop: 'bg-white/30 dark:bg-black/30' }}
        >
          <DropdownTrigger>
            <Button className='w-full h-28 bg-[--bg] dark:bg-[--element] shadow-base rounded-3xl flex flex-col gap-0 items-start justify-between p-4 relative overflow-clip'>
              <div className='flex flex-col gap-0 justify-start items-start'>
                <p className='font-semibold text-md'>Язык</p>
                <p className='font-semibold text-md opacity-60'>Русский</p>
              </div>

              <PiCaretDownBold size={20} className='opacity-50' />

              <PiTranslateBold
                size={80}
                className='absolute -bottom-2 -right-2 flex-shrink-0 !max-w-full opacity-10'
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode='single'
            selectedKeys={new Set(['ru'])}
            aria-label='Language selector'
          >
            <DropdownItem key='ru'>Русский</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown
          backdrop='blur'
          placement='bottom'
          classNames={{ backdrop: 'bg-white/30 dark:bg-black/30' }}
        >
          <DropdownTrigger>
            <Button className='w-full bg-[--bg] dark:bg-[--element] shadow-base h-28 rounded-3xl flex flex-col gap-0 items-start justify-between p-4 relative'>
              <div className='flex flex-col gap-0 justify-start items-start'>
                <p className='font-semibold text-md'>Валюта</p>
                <p className='font-semibold text-md opacity-60'>RUB</p>
              </div>

              <PiCaretDownBold size={20} className='opacity-50' />

              <PiCurrencyRubBold
                size={80}
                className='absolute -bottom-2 -right-2 flex-shrink-0 !max-w-full opacity-10'
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode='single'
            selectedKeys={new Set(['rub'])}
            aria-label='Currency selector'
          >
            <DropdownItem key='rub'>RUB</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ChangeThemeButton />

      <Button
        as={Link}
        href='/location'
        onPress={handleClickLocation}
        className='w-full h-28 bg-[--bg] dark:bg-[--element] shadow-base rounded-3xl flex flex-col gap-0 items-start justify-between p-4 relative overflow-clip'
      >
        <div className='flex flex-col gap-0 justify-start items-start'>
          <p className='font-semibold text-md'>
            Регион отображаемых объявлений
          </p>
          <p className='font-semibold text-md opacity-60'>{location.address}</p>
        </div>

        <PiCaretRightBold size={20} className='opacity-50' />

        <PiMapPinBold
          size={80}
          className='absolute -bottom-2 -right-2 flex-shrink-0 !max-w-full opacity-10'
        />
      </Button>

      <div className='w-full flex flex-col bg-white dark:bg-default shadow-base rounded-3xl overflow-clip'>
        <Link
          href='/support'
          onClick={() => onClose()}
          className='w-full h-14 flex justify-between px-6 items-center hover:opacity-70 active:opacity-40 transition-opacity'
        >
          <div className='w-full flex gap-4 items-center'>
            <PiQuestionBold size={20} />
            <p className='font-semibold text-sm'>Поддержка</p>
          </div>
          <PiCaretRightBold size={18} className='flex-shrink-0 opacity-50' />
        </Link>
        <Divider />
        <Link
          onClick={() => onClose()}
          href='/policy'
          className='w-full h-14 flex justify-between px-6 items-center hover:opacity-70 active:opacity-40 transition-opacity'
        >
          <div className='w-full flex gap-4 items-center'>
            <PiFilesBold size={20} />
            <p className='font-semibold text-sm'>Условия и оферта</p>
          </div>
          <PiCaretRightBold size={18} className='flex-shrink-0 opacity-50' />
        </Link>
      </div>
    </aside>
  );
};
