import { apiClient } from '@albomoni/shared/api/base';

export const cancelSubscription = (token: string) =>
  apiClient.delete('albomoni-pro/', {}, { Authorization: `Bearer ${token}` });
