import Link from 'next/link';
import { TbShieldLock } from 'react-icons/tb';

export const ProtectedRouteMessage = () => {
  return (
    <main className='w-full h-[calc(100dvh-160px)] flex items-center justify-center'>
      <div className='w-80 flex flex-col gap-6 items-center'>
        <TbShieldLock size={60} className='text-warning animate-pulse' />
        <h1 className='text-xl font-semibold text-center'>
          Чтобы продолжить, выполните вход в аккаунт Almixx или
          зарегистрируйтесь.
        </h1>
        <Link href='/registration'>
          <button
            type='button'
            className='w-64 py-3 bg-primary rounded-2xl font-medium mt-5 shadow-lg shadow-primary/40 text-white'
          >
            Зарегистрироваться
          </button>
        </Link>

        <Link href='/login'>
          <button type='button' className='text-primary'>
            Войти в аккаунт
          </button>
        </Link>
      </div>
    </main>
  );
};
