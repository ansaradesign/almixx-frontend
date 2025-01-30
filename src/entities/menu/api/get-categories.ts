import { apiClient } from '@albomoni/shared/api/base';

export const getCategoriesAsync = () => {
  return apiClient.get<{ name: string; img: string }[]>('categories/');
};
