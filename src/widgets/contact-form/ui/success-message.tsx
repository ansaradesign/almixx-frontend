import { m } from 'framer-motion';
import { PiCheckCircle } from 'react-icons/pi';

export const ContactFormSuccessMessage = () => {
  return (
    <m.div
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      className='flex flex-col gap-6'
    >
      <PiCheckCircle size={90} className='text-[--success]' />

      <h3 className='text-2xl text-[--success] font-semibold'>
        Сообщение успешно отправлено
      </h3>
      <p className='font-medium opacity-50 -mt-4'>
        Проверьте почту: дальнейшую информацию по Вашему вопросу вы будете
        получать там.
      </p>
    </m.div>
  );
};
