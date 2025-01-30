'use client';

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { PasswordVisibilityButton } from '@albomoni/shared/ui/password-visibility-button/ui';
import { Input } from '@nextui-org/input';
import { Divider } from '@nextui-org/divider';
import { Spinner } from '@nextui-org/spinner';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PiUserBold } from 'react-icons/pi';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { setCookie } from 'cookies-next';
import addCookie from '@albomoni/shared/lib/utils/server/add-cookie';
import { apiClient } from '@albomoni/shared/api/base';
import revalidateRoute from '@albomoni/shared/lib/utils/server/revalidate';
import { useLocalStorage } from 'react-use';
import Link from 'next/link';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { LoginQueries } from '../../api';
import {
  LoginCheckSchema,
  LoginCheckSchemaFormData,
} from '../../model/schemas';

export const LoginWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const { t } = useClientTranslation('forms');
  const router = useRouter();
  const [watchedAds] = useLocalStorage('watched', []);
  const [loginPage, , deleteLoginPage] = useLocalStorage<string>('login-page');

  const { mutateAsync, isPending, isSuccess } = useMutation(LoginQueries);

  const { control, handleSubmit } = useForm<LoginCheckSchemaFormData>({
    resolver: yupResolver(LoginCheckSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    const query = {
      username: email,
      password,
    };

    try {
      const response = await mutateAsync(query);
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

      if (loginPage) {
        router.push(loginPage);
        deleteLoginPage();
      } else {
        router.push('/profile');
      }
    } catch {
      setIsIncorrect(true);
      return;
    }
  });

  const handleClickRegistration = () => {
    router.push('/registration');
  };

  return (
    <div className='w-full max-w-[420px] flex flex-col shadow-medium bg-[--bg] dark:bg-default-50 rounded-2xl overflow-clip'>
      <h2 className='text-lg font-bold px-6 py-6'>Вход в аккаунт</h2>
      <AnimatePresence>
        {isPending || isSuccess ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='h-[236px] flex justify-center items-center'
          >
            <Spinner />
          </m.div>
        ) : (
          <form
            className='w-full flex flex-col z-20 shadow-sm'
            onSubmit={onSubmit}
          >
            <div className='flex flex-col gap-4 px-6'>
              <Controller
                name='email'
                control={control}
                render={({
                  field: { onChange, value, onBlur, ref, name },
                  fieldState: { invalid, error },
                }) => (
                  <Input
                    id={name}
                    type={name}
                    errorMessage={invalid && t(`${error?.message}`)}
                    size='lg'
                    placeholder='Электронная почта'
                    classNames={{ input: 'px-2 text-sm' }}
                    onChange={onChange}
                    value={value || ''}
                    onBlur={onBlur}
                    ref={ref}
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
                    type={isVisible ? 'text' : name}
                    errorMessage={invalid && t(`${error?.message}`)}
                    endContent={
                      <PasswordVisibilityButton
                        isVisible={isVisible}
                        toggleVisibility={toggleVisibility}
                      />
                    }
                    size='lg'
                    placeholder='Пароль'
                    classNames={{ input: 'px-2 text-sm' }}
                    onChange={onChange}
                    value={value || ''}
                    onBlur={onBlur}
                    ref={ref}
                  />
                )}
              />
              {isIncorrect && (
                <NotificationBubble type='error'>
                  Неверно введён логин или пароль. Попробуйте ещё раз.
                </NotificationBubble>
              )}
              <Link
                href='/forgot-password'
                className='w-fit text-sm text-start opacity-60 underline mt-4'
              >
                Забыли пароль?
              </Link>
            </div>
            <div className='px-6 py-4 flex justify-end'>
              <Button
                type='submit'
                size='md'
                variant='shadow'
                onPress={onSubmit as any}
                color='primary'
              >
                Войти
              </Button>
            </div>
          </form>
        )}
      </AnimatePresence>
      <Divider />
      <div className='flex flex-col pt-4 px-6 pb-6 bg-[--element] gap-4 relative z-10'>
        <h3 className='font-semibold mt-1 z-10'>У Вас ещё нет профиля?</h3>
        <p className='text-sm opacity-60 z-10'>
          Получите доступ к размещению объявлений и другим возможностям
          платформы, пройдя быструю регистрацию.
        </p>
        <Button
          size='md'
          color='primary'
          variant='flat'
          onPress={handleClickRegistration}
          className='mt-2 z-10 backdrop-blur-sm font-semibold dark:text-blue-200'
        >
          Зарегистрироваться
        </Button>
        <PiUserBold
          size={250}
          className='absolute -bottom-9 -right-10 z-0 opacity-5'
        />
      </div>
    </div>
  );
};
