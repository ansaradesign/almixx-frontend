import { useMemo } from 'react';
import {
  Dropdown as NativeDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { PiCaretUpDownBold } from 'react-icons/pi';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';

type Props = {
  collection: string[];
  selectedKeys: Set<string>;
  setSelectedKeys: (keys: any) => any;
  size?: 'lg' | 'md' | 'sm';
};

export const Dropdown = ({
  collection,
  selectedKeys,
  setSelectedKeys,
  size = 'lg',
}: Props) => {
  const { t } = useClientTranslation('dropdown');

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys],
  );

  return (
    <NativeDropdown>
      <DropdownTrigger>
        <Button
          className='justify-between'
          size={size}
          endContent={
            <PiCaretUpDownBold
              size={18}
              className='opacity-50 flex-shrink-0 w-full'
            />
          }
        >
          {t(selectedValue)}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Single selection'
        variant='flat'
        disallowEmptySelection
        selectionMode='single'
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {collection.map((item) => (
          <DropdownItem key={item}>{t(item)}</DropdownItem>
        ))}
      </DropdownMenu>
    </NativeDropdown>
  );
};
