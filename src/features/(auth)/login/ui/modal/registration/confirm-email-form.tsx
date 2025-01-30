import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { ModalFooter, ModalHeader, ModalBody } from '@nextui-org/modal';
import { Spinner } from '@nextui-org/spinner';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import {
  EmailConfirmSchema,
  EmailConfirmSchemaFormData,
} from '../../../model/schemas';
import { ELoginModalScreens } from '../../../model/login-modal-screens.enum';
import { LoginModalContentProps } from '../../../model/login-modal-content-props.type';
import { CheckCodeQueries } from '../../../api/check-code/queries';

export const ModalRegistrarionConfimEmail = ({
  setModal,
}: LoginModalContentProps) => {
  const { control, handleSubmit } = useForm<EmailConfirmSchemaFormData>({
    resolver: yupResolver(EmailConfirmSchema),
  });
  const {
    mutateAsync,
    isPending,
    // error: mutateError,
    isError,
  } = useMutation(CheckCodeQueries);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      setModal(ELoginModalScreens.REGISTRATION_USER_DATA);
    } catch {
      return;
    }
  });

  // const errorMessage = t(`${getErrorCode(mutateError.message)}`);

  return (
    <>
      <ModalHeader className='flex flex-col gap-1'>
        Подтверждение email
      </ModalHeader>
      <AnimatePresence>
        {isPending ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='h-[188px] flex justify-center items-center'
          >
            <Spinner />
          </m.div>
        ) : (
          <form onSubmit={onSubmit}>
            <ModalBody>
              <p className='text-sm opacity-50 px-1'>
                Укажите проверочный код — он придёт на указанный email адрес в
                течение 2 минут.
              </p>
              <Controller
                name='code'
                control={control}
                render={({
                  field: { onChange, value, onBlur, ref, name },
                  fieldState: { invalid, error },
                }) => (
                  <Input
                    id={name}
                    type='text'
                    errorMessage={invalid && `${error?.message}`}
                    size='lg'
                    ref={ref}
                    maxLength={6}
                    placeholder='Проверочный код'
                    classNames={{ input: 'px-2 text-sm' }}
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {isError && (
                <NotificationBubble type='error'>
                  Неверный код подтверждения.
                </NotificationBubble>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                variant='light'
                onPress={() => setModal(ELoginModalScreens.LOGIN)}
              >
                Назад ко входу
              </Button>
              <Button color='primary' variant='shadow' type='submit'>
                Продолжить
              </Button>
            </ModalFooter>
          </form>
        )}
      </AnimatePresence>
    </>
  );
};
