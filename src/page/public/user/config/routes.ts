export const UserRoutes = (userId: string) => [
  {
    id: 0,
    name: 'active',
    href: `/user/${userId}`,
  },
  {
    id: 1,
    name: 'ended',
    href: `/user/${userId}/ended`,
  },
];
