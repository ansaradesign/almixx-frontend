import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordVisibilityButton } from '@albomoni/shared/ui/password-visibility-button/ui';
import { useState } from 'react';
import { Checkbox } from '@nextui-org/checkbox';
import { useMutation } from '@tanstack/react-query';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { AnimatePresence, m } from 'framer-motion';
import { Spinner } from '@nextui-org/spinner';
import { useCookies } from 'react-cookie';
import { UserDataSchema, UserDataSchemaFormData } from '../../../model/schemas';
import { ELoginModalScreens } from '../../../model/login-modal-screens.enum';
import { LoginModalContentProps } from '../../../model/login-modal-content-props.type';
import { SignupQueries } from '../../../api';

export const ModalRegistrationUserData = ({
  setModal,
  registrationEmail,
}: LoginModalContentProps) => {
  const [passVisible, setPassVisible] = useState(false);
  const [confPassVisible, setConfPassVisible] = useState(false);
  const { mutateAsync, isPending, isError } = useMutation(SignupQueries);
  const [, setToken] = useCookies();

  const togglePassVis = () => setPassVisible(!passVisible);
  const toggleConfPassVis = () => setConfPassVisible(!confPassVisible);

  const { control, handleSubmit, watch } = useForm<UserDataSchemaFormData>({
    resolver: yupResolver(UserDataSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const request = {
      email: registrationEmail,
      first_name: data.name,
      password: data.password,
    };

    try {
      const response = await mutateAsync(request);
      const { access } = response;

      setToken('token', access);

      setModal(ELoginModalScreens.REGISTRATION_COMPLETE);
    } catch {
      return;
    }
  });

  return (
    <>
      <ModalHeader className='flex flex-col gap-1'>
        Завершение регистрации
      </ModalHeader>
      <AnimatePresence>
        {isPending ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='h-[308px] flex justify-center items-center'
          >
            <Spinner />
          </m.div>
        ) : (
          <form className='w-full flex flex-col' onSubmit={onSubmit}>
            <ModalBody>
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
                      <span className='underline cursor-pointer'>
                        условия и правила платформы
                      </span>
                    </p>
                  </div>
                )}
              />
              {isError && (
                <NotificationBubble type='error'>
                  Произошла внутренняя ошибка сервиса. Попробуйте позже.
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
              <Button
                isDisabled={!watch('approveRules')}
                color='primary'
                variant='shadow'
                type='submit'
              >
                Зарегистрироваться
              </Button>
            </ModalFooter>
          </form>
        )}
      </AnimatePresence>
    </>
  );
};
