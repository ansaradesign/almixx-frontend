import { queryOptions } from '@tanstack/react-query';
import { getAdsAsync } from './get-ads';

export const GetAdsQueries = () =>
  queryOptions({
    queryKey: ['get-ads'],
    queryFn: getAdsAsync,
  });
