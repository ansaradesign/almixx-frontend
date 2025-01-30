import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { PiCaretDownBold } from 'react-icons/pi';
import { useTheme } from 'next-themes';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { ThemeIcons } from '../../config/theme-icons';

export const ChangeThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useClientTranslation();

  const Icon = ThemeIcons[theme as 'light' | 'dark' | 'system'];

  return (
    <Dropdown
      backdrop='blur'
      placement='bottom'
      classNames={{ backdrop: 'bg-white/30 dark:bg-black/30' }}
    >
      <DropdownTrigger>
        <Button
          size='lg'
          className='h-14 bg-[--bg] dark:bg-[--element] rounded-[18px] shadow-base justify-between'
        >
          <div className='flex gap-4'>
            <Icon size={20} />
            <p className='font-semibold text-sm'>Оформление</p>
          </div>

          <PiCaretDownBold size={18} className='opacity-50' />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={false}
        disallowEmptySelection
        selectionMode='single'
        selectedKeys={new Set([theme as 'light' | 'dark' | 'system'])}
        aria-label='Theme selector'
      >
        <DropdownItem onPress={() => setTheme('light')} key='light'>
          {t('theme.light')}
        </DropdownItem>
        <DropdownItem onPress={() => setTheme('dark')} key='dark'>
          {t('theme.dark')}
        </DropdownItem>
        <DropdownItem onPress={() => setTheme('system')} key='system'>
          {t('theme.system')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
