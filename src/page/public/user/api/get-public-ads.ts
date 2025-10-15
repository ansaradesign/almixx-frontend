import { PublicAdType } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';

export const getPublicAds = (
  userId: string,
  status: 'active' | 'ended',
  page: number,
) => apiClient.post<PublicAdType[]>(`ads-public/${page}`, { userId, status });
