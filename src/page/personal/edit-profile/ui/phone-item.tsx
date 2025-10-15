import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { PiCheckCircleBold, PiTrashBold } from 'react-icons/pi';

type Props = {
  id: number;
  name: string;
  phone: string;
  isNotLast: boolean;
};

export const PhoneItem = ({ id, name, phone, isNotLast }: Props) => {
  const { setModalState, setModalData } = useModal();

  const handleClickDelete = () => {
    setModalData({ id, name, phone });
    setModalState(EModalStates.EDIT_DELETE_PHONE);
  };

  return (
    <>
      <div className='flex gap-2 items-center'>
        <div className='text-lg select-text font-medium flex flex-col items-start gap-4 pr-4'>
          {/* <h4>{name}</h4> */}
          <div className='w-full flex gap-2 items-center'>
            <PiCheckCircleBold
              size={24}
              className='flex-shrink-0 text-success'
            />
            <h5 className='text-xl font-semibold text-success pr-4'>{phone}</h5>
            <Button
              size='sm'
              isIconOnly
              radius='lg'
              variant='flat'
              className='mt-[2px] text-danger flex-shrink-0'
              onPress={handleClickDelete}
              startContent={<PiTrashBold size={18} />}
            />
          </div>
        </div>
      </div>
      {isNotLast && <Divider />}
    </>
  );
};
