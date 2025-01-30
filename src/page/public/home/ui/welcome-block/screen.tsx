import Image from 'next/image';
import profile from '../../../../../shared/assets/profile.jpg';

export const WelcomeBlockScreen = () => {
  return (
    <div className='absolute -bottom-5 border-3 w-full h-full border-white/40 rounded-2xl p-2 flex flex-col gap-3 overflow-clip'>
      <div className='flex w-full h-8 items-center gap-3'>
        <div className='flex gap-1 px-3'>
          <div className='w-4 h-4 rounded-full border-3 border-white/40' />
          <div className='w-4 h-4 rounded-full border-3 border-white/40' />
          <div className='w-4 h-4 rounded-full border-3 border-white/40' />
        </div>
        <div className='h-full w-full border-3 border-white/40 rounded-xl flex justify-center items-center '>
          <p className='text-sm text-white'>albomoni.com</p>
        </div>
      </div>
      <div className='w-full h-full rounded-xl bg-white/30 overflow-hidden shadow-inner'>
        <Image
          src={profile}
          alt='profile img'
          className='object-cover'
          unoptimized
        />
      </div>
    </div>
  );
};
