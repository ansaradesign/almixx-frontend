import { apiClient } from '@albomoni/shared/api/base';

export const getReviews = (user_id: string, token: string) =>
  apiClient.get('feedback/', { user_id }, { Authorization: `Bearer ${token}` });
