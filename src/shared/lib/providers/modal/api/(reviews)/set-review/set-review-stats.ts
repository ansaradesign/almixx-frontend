import { apiClient } from '@albomoni/shared/api/base';

export const setReview = (user_id: number, rate: number, token: string) =>
  apiClient.post<{ rate: number | null }>(
    'feedback/',
    { user_id, rate },
    { Authorization: `Bearer ${token}` },
  );
