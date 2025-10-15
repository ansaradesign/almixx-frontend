import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { PiQuestionBold } from 'react-icons/pi';

type Props = {
  children: React.ReactNode;
};

export const InfoButton = ({ children }: Props) => {
  return (
    <Popover backdrop='opaque' classNames={{ content: 'max-w-72 p-3' }}>
      <PopoverTrigger>
        <Button
          className='w-6 h-6 min-w-5 flex-shrink-0'
          isIconOnly
          radius='full'
        >
          <PiQuestionBold size={16} className='opacity-70' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
};
