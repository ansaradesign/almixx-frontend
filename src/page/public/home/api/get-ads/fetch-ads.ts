import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { TLocation } from '@albomoni/shared/model/types/location.type';

export const fetchAds =
  (address: TLocation) =>
    async ({ queryKey }: { queryKey: [string, number] }) => {
      const [_key, page] = queryKey;
      try {
        return await apiClient.put<Ad[]>(`ad/page/${page}`, address);
      } catch (error) {
        throw new Error('Error fetching ads');
      }
    };
