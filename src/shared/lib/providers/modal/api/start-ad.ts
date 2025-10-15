import { apiClient } from '@albomoni/shared/api/base';
import { PromoOptions } from '../ui/variants/promote-ad';

export const startAd = (
  id: number,
  status: 'moderating' | 'archived' | 'ended',
  plan: PromoOptions,
  period: 'daily' | 'weekly' | 'monthly',
  token: string,
) =>
  apiClient.put(
    `ad/${id}`,
    { status, plan, period },
    { Authorization: `Bearer ${token}` },
  );
