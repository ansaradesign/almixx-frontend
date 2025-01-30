import { apiClient } from '@albomoni/shared/api/base';

export const sendPhoneCode = (phone: string, token: string) =>
  apiClient.get(
    'phone_verify/',
    { phone },
    { Authorization: `Bearer ${token}` },
  );
