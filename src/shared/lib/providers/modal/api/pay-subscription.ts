import { apiClient } from '@albomoni/shared/api/base';

export const paySubscription = (token: string) =>
  apiClient.post<{ type: 'success' } | { type: 'money'; text: number }>(
    'almixx-pro/',
    {},
    { Authorization: `Bearer ${token}` },
  );
