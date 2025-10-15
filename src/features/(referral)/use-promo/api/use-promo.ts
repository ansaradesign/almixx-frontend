import { apiClient } from '@albomoni/shared/api/base';

export type UsePromoResponse = {
  detail: string;
  money: number;
};

export const usePromoAsync = async (promoCode: string, token: string) =>
  apiClient.post<UsePromoResponse>(
    'use-promo/',
    { promo_code: promoCode },
    {
      Authorization: `Bearer ${token}`,
    },
  );

