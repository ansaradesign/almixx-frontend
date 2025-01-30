import { apiClient } from '@albomoni/shared/api/base';

export const savePhone = (
  phone: string,
  phone_id: number,
  name: string,
  token: string,
) =>
  apiClient.put(
    'phone_verify/',
    { phone, phone_id, name, save: true },
    { Authorization: `Bearer ${token}` },
  );
