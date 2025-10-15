import { apiClient } from '@albomoni/shared/api/base';

export const verifyPhoneCode = (phone: string, code: string, token: string) =>
  apiClient.post<{ id: number }>(
    'phone_verify/',
    { phone, code },
    { Authorization: `Bearer ${token}` },
  );
