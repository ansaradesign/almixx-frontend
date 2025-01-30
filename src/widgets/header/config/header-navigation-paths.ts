import {
  PiCompassBold,
  PiHeartBold,
  PiPlusCircleBold,
  PiUserBold,
} from 'react-icons/pi';

export const HeaderNavigationPaths = [
  {
    id: 'main',
    path: '/',
    icon: PiCompassBold,
  },
  {
    id: 'favorite',
    path: '/favorite',
    icon: PiHeartBold,
  },
  {
    id: 'place-ad',
    path: '/place-ad',
    icon: PiPlusCircleBold,
  },
  // {
  //   id: 'messages',
  //   path: '/messages',
  //   icon: TbMessageCircle,
  // },
  {
    id: 'profile',
    path: '/profile',
    icon: PiUserBold,
  },
] as const;
