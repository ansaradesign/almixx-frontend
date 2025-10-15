import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { PasswordVisibilityButton } from '@albomoni/shared/ui/password-visibility-button/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import { ModalBody, ModalHeader, ModalFooter } from '@nextui-org/modal';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PiUserBold } from 'react-icons/pi';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { Spinner } from '@nextui-org/spinner';
import { useCookies } from 'react-cookie';
import {
  LoginCheckSchema,
  LoginCheckSchemaFormData,
} from '../../../model/schemas';
import { ELoginModalScreens } from '../../../model/login-modal-screens.enum';
import { LoginModalContentProps } from '../../../model/login-modal-content-props.type';
import { LoginQueries } from '../../../api';

export const ModalLogin = ({ onClose, setModal }: LoginModalContentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useClientTranslation('forms');
  const { mutateAsync, isPending, isSuccess } = useMutation(LoginQueries);
  const [, setToken] = useCookies();

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

      setToken('token', access);
      onClose();
    } catch {
      return;
    }
  });

  return (
    <>
      <ModalHeader className='flex flex-col gap-1'>Вход в аккаунт</ModalHeader>
      <AnimatePresence>
        {isPending || isSuccess ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='h-[244px] flex justify-center items-center'
          >
            <Spinner />
          </m.div>
        ) : (
          <form
            className='w-full flex flex-col z-20 shadow-sm'
            onSubmit={onSubmit}
          >
            <ModalBody>
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
              <button
                type='button'
                className='text-sm text-start opacity-60 underline mt-4'
              >
                Забыли пароль?
              </button>
            </ModalBody>
            <ModalFooter>
              <Button variant='light' onPress={onClose}>
                Закрыть
              </Button>
              <Button
                type='submit'
                onClick={onSubmit}
                disableRipple
                color='primary'
                variant='shadow'
              >
                Войти
              </Button>
            </ModalFooter>
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
          color='primary'
          variant='flat'
          className='mt-2 z-10 backdrop-blur-sm font-semibold dark:text-blue-200'
          onPress={() => setModal(ELoginModalScreens.REGISTRATION_EMAIL)}
        >
          Зарегистрироваться
        </Button>
        <PiUserBold
          size={250}
          className='absolute -bottom-9 -right-10 z-0 opacity-5'
        />
      </div>
    </>
  );
};
