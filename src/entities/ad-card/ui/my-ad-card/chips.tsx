import { Chip } from '@nextui-org/chip';
import { ScrollShadow } from '@nextui-org/scroll-shadow';

type Props = {
  status: 'active' | 'moderating' | 'archived' | 'ended';
};

export const MyAdCardChips = ({ status }: Props) => {
  const variants = {
    active: (
      <>
        <Chip
          variant='flat'
          color='success'
          classNames={{ content: 'font-medium' }}
        >
          Активно
        </Chip>
        {/* <Chip
          variant='flat'
          color='primary'
          classNames={{ content: 'font-medium' }}
        >
          Осталось 27 дней
        </Chip> */}
      </>
    ),
    moderating: (
      <Chip
        variant='flat'
        color='warning'
        classNames={{ content: 'font-medium' }}
      >
        На проверке
      </Chip>
    ),
    archived: (
      <Chip
        variant='flat'
        color='default'
        classNames={{
          base: 'bg-default-100 dark:bg-default-200',
          content: 'font-medium text-default-600',
        }}
      >
        В архиве
      </Chip>
    ),
    ended: (
      <Chip
        variant='flat'
        color='default'
        classNames={{
          base: 'bg-default-100 dark:bg-default-200',
          content: 'font-medium text-default-600',
        }}
      >
        Завершено
      </Chip>
    ),
  };

  const Chips = variants[status];

  return (
    <ScrollShadow
      orientation='horizontal'
      hideScrollBar
      className='w-full flex gap-2 items-center'
    >
      {Chips}
    </ScrollShadow>
  );
};
