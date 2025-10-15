import { queryOptions } from '@tanstack/react-query';
import { getReviewStats } from './get-review-stats';

export const GetReviewStatsQuery = (user_id: number, token: string) =>
  queryOptions({
    queryKey: ['get-review-stats'],
    queryFn: () => getReviewStats(user_id, token),
  });
