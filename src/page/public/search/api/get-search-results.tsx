import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';

export const getSearchResults =
  (query: string) =>
    async ({ queryKey }: { queryKey: [string, number] }) => {
      const address = getLocation();
      const [_, page] = queryKey;

      return apiClient.post<Ad[]>('search', {
        page,
        query,
        address,
      });
    };
