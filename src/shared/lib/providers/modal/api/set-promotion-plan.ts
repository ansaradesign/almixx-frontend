import { apiClient } from '@albomoni/shared/api/base';
import { PromoOptions } from '../ui/variants/promote-ad';

export type PromotionQueries = {
  ad: number;
  plan: PromoOptions;
};

export const setPromotionPlan = (queries: PromotionQueries, token: string) =>
  apiClient.post('get_plans', queries, {
    Authorization: `Bearer ${token}`,
  });
