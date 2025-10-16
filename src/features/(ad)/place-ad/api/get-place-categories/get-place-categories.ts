import { apiClient } from '@albomoni/shared/api/base';

export const getPlaceCategoriesAsync = async (token: string) =>
  apiClient.get(
    'place-categories/',
    {},
    {
      Authorization: `Bearer ${token}`,
    },
  );
