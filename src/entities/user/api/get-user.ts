import { apiClient } from '@albomoni/shared/api/base';
import { UserType } from '../model/user.type';

export const getUserAsync = (token: string) => {
  return apiClient.get<UserType>(
    'user-info/',
    {},
    { Authorization: `Bearer ${token}` },
  );
};
