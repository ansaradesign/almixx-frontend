import { apiClient } from '@albomoni/shared/api/base';

export const cancelSubscription = (token: string) =>
  apiClient.delete('almixx-pro/', {}, { Authorization: `Bearer ${token}` });
