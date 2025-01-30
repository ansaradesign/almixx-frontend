import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  title: string;
  desc: string;
};

export const Placeholder = ({ icon, title, desc }: Props) => {
  return (
    <div className='flex flex-col gap-6 items-center'>
      {icon}
      <div className='flex flex-col gap-2 items-center'>
        <h6 className='text-xl font-medium'>{title}</h6>
        <p className='opacity-50 w-64 text-center font-medium'>{desc}</p>
      </div>
    </div>
  );
};
