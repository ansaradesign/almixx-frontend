import { apiClient } from '@albomoni/shared/api/base';

export const markAsWatchedAd = (id: number, token?: string) =>
  apiClient.post('view/', { id }, { Authorization: `Bearer ${token}` });
