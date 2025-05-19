import { apiClient } from '@albomoni/shared/api/base';

export const getSubscriptionsInfo = (token: string) =>
  apiClient.get('almixx-pro/', {}, { Authorization: `Bearer ${token}` });
