'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { PiEyeBold, PiHeartBold, PiPhonePlusBold } from 'react-icons/pi';

type Props = {
  views: number;
  favorites: number;
  phone_views: number;
};

export const MyAdCardStats = ({ views, favorites, phone_views }: Props) => {
  const items = [
    {
      name: 'views',
      icon: <PiEyeBold size={24} />,
      content: views,
      popover: 'Количество пользователей, посетивших страницу объявления',
    },
    {
      name: 'phone',
      icon: <PiPhonePlusBold size={24} />,
      content: phone_views,
      popover: 'Количество пользователей, посмотревших Ваш номер телефона',
    },
    {
      name: 'favorites',
      icon: <PiHeartBold size={24} />,
      content: favorites,
      popover: 'Количество пользователей, добавивших объявление в избранное',
    },
  ];

  return (
    <div className='w-full flex'>
      {items.map(({ name, icon, content, popover }) => (
        <Popover key={name} backdrop='opaque'>
          <PopoverTrigger>
            <div className='w-full flex flex-col gap-2 items-center transition-transform'>
              {icon}
              <p className='text-sm font-semibold'>{content}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className='w-56 p-2'>{popover}</div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};
