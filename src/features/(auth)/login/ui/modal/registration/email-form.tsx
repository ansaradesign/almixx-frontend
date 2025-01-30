import { ModalBody, ModalHeader, ModalFooter } from '@nextui-org/modal';
import { Input } from '@nextui-org/input';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '@nextui-org/spinner';
import { AnimatePresence, m } from 'framer-motion';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import {
  EmailCheckSchema,
  EmailCheckSchemaFormData,
} from '../../../model/schemas';
import { LoginModalContentProps } from '../../../model/login-modal-content-props.type';
import { ELoginModalScreens } from '../../../model/login-modal-screens.enum';
import { EmailVerifyQueries } from '../../../api';

export const ModalRegistrationEmail = ({
  setModal,
  setRegistrationEmail,
}: LoginModalContentProps) => {
  const { t } = useClientTranslation('forms');
  const { mutateAsync, isPending, isError } = useMutation(EmailVerifyQueries);

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailCheckSchemaFormData>({
    resolver: yupResolver(EmailCheckSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const { email } = data;

    try {
      await mutateAsync({ email });
      setRegistrationEmail(data.email);
      setModal(ELoginModalScreens.REGISTRATION_EMAIL_CONFIRM);
    } catch {
      return;
    }
  });

  return (
    <>
      <ModalHeader className='flex flex-col gap-1'>
        Создание учетной записи
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
          <m.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='w-full flex flex-col'
            onSubmit={onSubmit}
          >
            <ModalBody>
              <p className='text-sm opacity-50 px-1'>
                Для начала, введите адрес электронной почты. На него придет
                письмо с подтверждением.
              </p>
              <Controller
                name='email'
                control={control}
                render={({
                  field: { onChange, value, onBlur, ref, name },
                  fieldState: { invalid },
                }) => (
                  <Input
                    id={name}
                    isRequired
                    isClearable
                    errorMessage={invalid && t(`${errors.email?.message}`)}
                    onClear={() => setValue('email', '')}
                    size='lg'
                    ref={ref}
                    placeholder='Электронная почта'
                    classNames={{ input: 'px-2 text-sm' }}
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {isError && (
                <NotificationBubble type='error'>
                  Этот email уже зарегистрирован
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
          </m.form>
        )}
      </AnimatePresence>
    </>
  );
};
