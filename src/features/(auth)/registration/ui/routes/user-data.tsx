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
import { Checkbox } from '@nextui-org/checkbox';
import { setCookie } from 'cookies-next';
import { apiClient } from '@albomoni/shared/api/base';
import addCookie from '@albomoni/shared/lib/utils/server/add-cookie';
import revalidateRoute from '@albomoni/shared/lib/utils/server/revalidate';
import { useLocalStorage } from 'react-use';
import Link from 'next/link';
import { UserDataSchema, UserDataSchemaFormData } from '../../model/schemas';
import { SignupQueries } from '../../api';
import { RegistrationRoutesProps } from '../../model/routes-props.type';
import { ERegistrationRoutes } from '../../model/registration-routes.enum';

export const RegistrationUserData = ({
  userEmail,
  setActiveRoute,
}: RegistrationRoutesProps) => {
  const { mutateAsync, isPending, isError } = useMutation(SignupQueries);
  const [watchedAds] = useLocalStorage('watched', []);

  const [passVisible, setPassVisible] = useState(false);
  const [confPassVisible, setConfPassVisible] = useState(false);

  const togglePassVis = () => setPassVisible(!passVisible);
  const toggleConfPassVis = () => setConfPassVisible(!confPassVisible);

  const { control, handleSubmit, watch } = useForm<UserDataSchemaFormData>({
    resolver: yupResolver(UserDataSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const request = {
      email: userEmail,
      first_name: data.name,
      password: data.password,
    };

    try {
      const response = await mutateAsync(request);
      const { access } = response;

      const favorites =
        JSON.parse(localStorage.getItem('favorites') as string) || [];

      await apiClient.put(
        'favorites/',
        { favorites, views: watchedAds },
        { Authorization: `Bearer ${access}` },
      );

      const oneDay = 24 * 60 * 60 * 1000;
      const expiresDate = new Date(Date.now() + oneDay * 7);

      addCookie('token', access, { expires: expiresDate });
      setCookie('token', access, { expires: expiresDate });
      revalidateRoute('/profile');

      setActiveRoute(ERegistrationRoutes.COMPLETE);
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
              Завершите регистрацию, указав основные данные для входа в аккаунт.
            </p>

            <Controller
              name='name'
              control={control}
              render={({
                field: { onChange, value, onBlur, ref, name },
                fieldState: { invalid, error },
              }) => (
                <Input
                  id={name}
                  type='text'
                  autoFocus
                  autoComplete='new-password'
                  errorMessage={invalid && `${error?.message}`}
                  size='lg'
                  ref={ref}
                  placeholder='Ваше имя'
                  classNames={{ input: 'px-2 text-sm' }}
                  value={value || ''}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
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
            <Controller
              name='approveRules'
              control={control}
              render={({ field: { onChange, value, onBlur, ref, name } }) => (
                <div className='flex gap-2 items-center pt-4 pb-1'>
                  <Checkbox
                    id={name}
                    size='md'
                    ref={ref}
                    isSelected={value || false}
                    onValueChange={onChange}
                    onBlur={onBlur}
                  />
                  <p className='opacity-50 text-sm'>
                    Я принимаю{' '}
                    <Link
                      href='/policy'
                      target='_blank'
                      className='underline cursor-pointer'
                    >
                      условия и правила платформы
                    </Link>
                  </p>
                </div>
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
            <Button
              isDisabled={!watch('approveRules')}
              color='primary'
              variant='shadow'
              type='submit'
            >
              Зарегистрироваться
            </Button>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
};
