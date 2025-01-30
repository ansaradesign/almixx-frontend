import { apiClient } from '@albomoni/shared/api/base';

export const deletePhone = (phone_id: number, token: string) =>
  apiClient.delete(
    'phone_verify/',
    { phone_id, save: true },
    { Authorization: `Bearer ${token}` },
  );
