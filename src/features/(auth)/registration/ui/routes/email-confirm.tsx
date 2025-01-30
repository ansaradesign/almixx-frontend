import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { Spinner } from '@nextui-org/spinner';
import { Input } from '@nextui-org/input';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { Button } from '@nextui-org/button';
import {
  EmailConfirmSchema,
  EmailConfirmSchemaFormData,
} from '../../model/schemas';
import { CheckCodeQueries } from '../../api';
import { RegistrationRoutesProps } from '../../model/routes-props.type';
import { ERegistrationRoutes } from '../../model/registration-routes.enum';

export const RegistrationEmailConfirm = ({
  userEmail,
  setActiveRoute,
}: RegistrationRoutesProps) => {
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
      await mutateAsync({ email: userEmail, ...data });
      setActiveRoute(ERegistrationRoutes.USER_DATA);
    } catch {
      return;
    }
  });

  const handleClickBack = () => {
    setActiveRoute(ERegistrationRoutes.EMAIL);
  };

  return (
    <AnimatePresence>
      {isPending ? (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='h-[184px] flex justify-center items-center'
        >
          <Spinner />
        </m.div>
      ) : (
        <m.form
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='w-full flex flex-col'
          onSubmit={onSubmit}
        >
          <div className='flex flex-col gap-4 px-6'>
            <p className='text-sm opacity-50'>
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

            <AnimatePresence>
              {isError && (
                <NotificationBubble type='error'>
                  Неверный код подтверждения.
                </NotificationBubble>
              )}
            </AnimatePresence>
          </div>

          <div className='flex gap-4 justify-end pb-4 pt-6 px-6'>
            <Button variant='light' onPress={handleClickBack}>
              Назад
            </Button>
            <Button color='primary' variant='shadow' type='submit'>
              Зарегистрироваться
            </Button>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
};
