import { Button } from '@nextui-org/button';
import { m } from 'framer-motion';
import { PiCheckCircle } from 'react-icons/pi';

export const RegistrationComplete = () => {
  // const router = useRouter();

  // const handleClickBack = () => {
  //   router.push('/');
  // };

  return (
    <div className='flex flex-col gap-10 p-6 items-center'>
      <div className='flex flex-col items-center gap-4 '>
        <m.div
          initial={{ rotate: 90, opacity: 0, filter: 'blur(20px)' }}
          animate={{ rotate: 0, opacity: 1, filter: 'blur(0px)' }}
        >
          <PiCheckCircle size={90} className='text-green-600' />
        </m.div>
        <h3 className='font-semibold text-green-600'>
          Регистрация прошла успешно!
        </h3>
        <p className='text-sm opacity-60 text-center'>
          Вы можете в любой момент заполнить дополнительную информацию о себе в
          Вашем личном кабинете
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        <Button size='md' variant='shadow' color='primary'>
          Перейти в личный кабинет
        </Button>
        {/* <Button size='md' onPress={handleClickBack}>
          Вернуться на главную
        </Button> */}
      </div>
    </div>
  );
};
