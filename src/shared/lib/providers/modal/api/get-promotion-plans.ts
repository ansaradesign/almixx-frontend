import { apiClient } from '@albomoni/shared/api/base';
import { PromoOptions } from '../ui/variants/promote-ad';

export type PromotionQueries = {
  category: string;
  price: number;
  currency: string;
};

export type PromotionOutput = {
  wallet: number;
  price: number;
  plans: { name: PromoOptions; cost: number }[];
};

export const getPromotionPlans = (queries: PromotionQueries, token: string) =>
  apiClient.get<PromotionOutput>('get_plans', queries, {
    Authorization: `Bearer ${token}`,
  });
