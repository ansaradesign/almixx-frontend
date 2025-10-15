import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/button';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@nextui-org/input';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { AnimatePresence, m } from 'framer-motion';
import { Spinner } from '@nextui-org/spinner';
import { EmailVerifyQueries } from '../../api';
import {
  EmailCheckSchema,
  EmailCheckSchemaFormData,
} from '../../model/schemas';
import { RegistrationRoutesProps } from '../../model/routes-props.type';
import { ERestorePasswordRoutes } from '../../model/restore-password-routes.enum';

export const RestorePasswordEmail = ({
  setActiveRoute,
  setUserEmail,
}: RegistrationRoutesProps) => {
  const router = useRouter();
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

  const handleClickBack = () => {
    router.push('/login');
  };

  const onSubmit = handleSubmit(async (data) => {
    const { email } = data;

    try {
      await mutateAsync({ email });
      setUserEmail(email);
      setActiveRoute(ERestorePasswordRoutes.EMAIL_CONFIRM);
    } catch {
      return;
    }
  });

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
              Для начала, введите адрес электронной почты. На него придет письмо
              с кодом подтверждения.
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

            <AnimatePresence>
              {isError && (
                <NotificationBubble type='error'>
                  Адрес email не найден
                </NotificationBubble>
              )}
            </AnimatePresence>
          </div>

          <div className='flex gap-4 justify-end pb-4 pt-6 px-6'>
            <Button variant='light' onPress={handleClickBack}>
              Назад ко входу
            </Button>
            <Button color='primary' variant='shadow' type='submit'>
              Продолжить
            </Button>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
};
