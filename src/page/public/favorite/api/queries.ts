import { queryOptions } from '@tanstack/react-query';
import { getFavoritesAsync } from './get-favorites';

export const GetFavoritesQueries = (favorites: number[]) =>
  queryOptions({
    queryKey: ['favorites'],
    queryFn: () => getFavoritesAsync(favorites),
  });
