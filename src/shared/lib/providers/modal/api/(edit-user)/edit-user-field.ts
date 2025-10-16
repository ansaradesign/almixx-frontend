import { apiClient } from '@albomoni/shared/api/base';

export const editUserField = (
  query: { [key: string]: string } | FormData,
  token: string,
) =>
  apiClient.post('edit-user/', query, {
    Authorization: `Bearer ${token}`,
  });
