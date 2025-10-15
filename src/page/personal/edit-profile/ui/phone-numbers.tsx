'use client';

import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { Button } from '@nextui-org/button';
import { PiArrowCircleRightBold, PiPlusBold } from 'react-icons/pi';
import { PhoneItem } from './phone-item';

type Props = {
  numbers: { id: number; phone: string; name: string }[];
};

export const EditPhoneNumbers = ({ numbers }: Props) => {
  const { setModalState } = useModal();

  const handleClickAdd = () => {
    setModalState(EModalStates.EDIT_ADD_PHONE);
  };

  const isNotEmpty = numbers.length > 0;

  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='w-full flex gap-4 items-center pb-3'>
        <h3 className='opacity-50 font-medium'>Номер телефона</h3>
        <Button
          size='sm'
          className='w-fit text-[14px]'
          radius='full'
          color='secondary'
          startContent={
            isNotEmpty ? (
              <PiArrowCircleRightBold className='flex-shrink-0' size={16} />
            ) : (
              <PiPlusBold className='flex-shrink-0' size={16} />
            )
          }
          onPress={handleClickAdd}
        >
          {isNotEmpty ? 'Заменить' : 'Добавить'}
        </Button>
      </div>

      {isNotEmpty ? (
        numbers.map(({ id, phone, name }, index) => (
          <PhoneItem
            key={id}
            id={id}
            phone={phone}
            name={name}
            isNotLast={index < numbers.length - 1}
          />
        ))
      ) : (
        <NotificationBubble>
          У вас еще нет номера, привязанного к этой учётной записи.
        </NotificationBubble>
      )}
    </div>
  );
};
