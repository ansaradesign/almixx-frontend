/* eslint-disable react/jsx-indent */
import { Button } from '@nextui-org/button';
import { parseDate } from '@albomoni/shared/lib/utils/parse-date';
import { PublicUserType } from '@albomoni/entities/user/model/user.type';
import DraftJsRenderer from '@albomoni/shared/ui/draft-js-render/ui';
import { ModalScrollableArea } from '../../scrollable-area';
import { useModal } from '../../../lib/use-modal';
import { EModalStates } from '../../../model/modal-states.enum';

export const ModalVariantUserInfo = () => {
  const { setModalState, modalData } = useModal();
  const { user } = modalData;

  const userInfo = user as PublicUserType;
  const { date } = parseDate(userInfo.date_joined as string);

  return (
    <>
      <ModalScrollableArea>
        <h1 className='text-xl font-semibold mt-4 md:mt-0'>
          Информация о пользователе
        </h1>

        <div className='w-full flex flex-col gap-1'>
          <h2 className='font-medium text-neutral-500'>
            Дата регистрации пользователя
          </h2>
          <p className='text-xl font-semibold'>{date}</p>
        </div>

        <div className='w-full flex flex-col gap-1'>
          <h2 className='font-medium text-neutral-500'>О продавце</h2>
          {user && user.description ? (
            <DraftJsRenderer value={user.description} />
          ) : (
            <i>Описание отсутствует</i>
          )}
        </div>
      </ModalScrollableArea>
      <div className='w-full px-6 pb-6 pt-1 flex flex-col gap-4'>
        <Button
          onPress={() => setModalState(EModalStates.NULL)}
          size='lg'
          className='w-full font-medium'
        >
          Закрыть
        </Button>
      </div>
    </>
  );
};
