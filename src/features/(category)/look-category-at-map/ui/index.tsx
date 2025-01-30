import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { PiMapPinBold } from 'react-icons/pi';

export const LookCategoryAtMap = () => {
  return (
    <Tooltip placement='bottom' content='Посмотреть на карте'>
      <div className='w-fit overflow-clip rounded-xl active:scale-[0.97] transition-transform'>
        <Button size='lg' isIconOnly>
          <PiMapPinBold size={24} className='opacity-60' />
        </Button>
      </div>
    </Tooltip>
  );
};
