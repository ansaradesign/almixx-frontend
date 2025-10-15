import { FaLock } from 'react-icons/fa';

export const ContactWithSellerGuestContent = () => {
  return (
    <>
      <p className='font-medium opacity-50 -mb-4 w-full'>Номер телефона</p>
      <div className='w-full flex bg-default px-4 pt-4 pb-2 rounded-2xl justify-between'>
        <p className='text-xl font-semibold opacity-50 tracking-wide'>
          ************
        </p>
        <FaLock size={20} className='flex-shrink-0 opacity-50' />
      </div>
      <p className='font-medium opacity-50'>
        Чтобы увидеть контакты продавца, войдите в аккаунт Almixx или создайте
        новый.
      </p>
    </>
  );
};
