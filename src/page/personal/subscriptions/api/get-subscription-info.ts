import { apiClient } from '@albomoni/shared/api/base';

export const getSubscriptionsInfo = (token: string) =>
  apiClient.get('albomoni-pro/', {}, { Authorization: `Bearer ${token}` });
