import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnimatePresence, m } from 'framer-motion';
import { Spinner } from '@nextui-org/spinner';
import { Input } from '@nextui-org/input';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { Button } from '@nextui-org/button';
import { PasswordVisibilityButton } from '@albomoni/shared/ui/password-visibility-button/ui';
import { UserDataSchema, UserDataSchemaFormData } from '../../model/schemas';
import { RegistrationRoutesProps } from '../../model/routes-props.type';
import { ERestorePasswordRoutes } from '../../model/restore-password-routes.enum';
import { RestorePasswordQueries } from '../../api/restore-password/queries';

export const RestorePasswordData = ({
  userEmail,
  setActiveRoute,
}: RegistrationRoutesProps) => {
  const { mutateAsync, isPending, isError } = useMutation(
    RestorePasswordQueries,
  );

  const [passVisible, setPassVisible] = useState(false);
  const [confPassVisible, setConfPassVisible] = useState(false);

  const togglePassVis = () => setPassVisible(!passVisible);
  const toggleConfPassVis = () => setConfPassVisible(!confPassVisible);

  const { control, handleSubmit } = useForm<UserDataSchemaFormData>({
    resolver: yupResolver(UserDataSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const request = {
      email: userEmail,
      password: data.password,
    };

    try {
      await mutateAsync(request);
      
      console.log(ERestorePasswordRoutes.COMPLETE);
      setActiveRoute(ERestorePasswordRoutes.COMPLETE);
    } catch {
      return;
    }
  });

  const handleClickBack = () => {
    setActiveRoute(ERestorePasswordRoutes.EMAIL);
  };

  return (
    <AnimatePresence>
      {isPending ? (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='h-[368px] flex justify-center items-center'
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
              Введите новый пароль для учетной записи {userEmail}
            </p>

            <Controller
              name='password'
              control={control}
              render={({
                field: { onChange, value, onBlur, ref, name },
                fieldState: { invalid, error },
              }) => (
                <Input
                  id={name}
                  type={passVisible ? 'text' : name}
                  autoComplete='new-password'
                  errorMessage={invalid && `${error?.message}`}
                  endContent={
                    <PasswordVisibilityButton
                      isVisible={passVisible}
                      toggleVisibility={togglePassVis}
                    />
                  }
                  size='lg'
                  ref={ref}
                  placeholder='Пароль'
                  classNames={{ input: 'px-2 text-sm' }}
                  value={value || ''}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Controller
              name='confirmPassword'
              control={control}
              render={({
                field: { onChange, value, onBlur, ref, name },
                fieldState: { invalid, error },
              }) => (
                <Input
                  id={name}
                  type={confPassVisible ? 'text' : 'password'}
                  autoComplete='new-password'
                  errorMessage={invalid && `${error?.message}`}
                  endContent={
                    <PasswordVisibilityButton
                      isVisible={confPassVisible}
                      toggleVisibility={toggleConfPassVis}
                    />
                  }
                  size='lg'
                  ref={ref}
                  placeholder='Повторите пароль'
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
                  Произошла внутренняя ошибка сервиса. Попробуйте позже.
                </NotificationBubble>
              )}
            </AnimatePresence>
          </div>

          <div className='flex gap-4 justify-end pb-4 pt-6 px-6'>
            <Button variant='light' onPress={handleClickBack}>
              Назад
            </Button>
            <Button color='primary' variant='shadow' type='submit'>
              Сохранить
            </Button>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
};
