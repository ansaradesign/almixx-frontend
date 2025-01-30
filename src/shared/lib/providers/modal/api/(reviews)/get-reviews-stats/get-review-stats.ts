import { apiClient } from '@albomoni/shared/api/base';

export const getReviewStats = (user_id: number, token: string) =>
  apiClient.put<{ rate: number | null }>(
    'feedback/',
    { user_id },
    { Authorization: `Bearer ${token}` },
  );
