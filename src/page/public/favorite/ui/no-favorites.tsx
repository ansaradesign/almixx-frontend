import { PiHeartBreakFill } from 'react-icons/pi';

export const NoFavorites = () => {
  return (
    <div className='w-full h-[calc(100vh-400px)] flex items-center justify-center flex-col gap-6'>
      <PiHeartBreakFill size={60} className='text-danger' />
      <h2 className='text-lg font-semibold text-center'>
        Пока тут ничего нет. <br /> Пора исправить!
      </h2>
    </div>
  );
};
