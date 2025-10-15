import { apiClient } from '@albomoni/shared/api/base';
import { PublicUserType } from '../model/user.type';

export const getUserPublic = (userId: string) => {
  return apiClient.post<PublicUserType>('user-info/', { userId });
};
