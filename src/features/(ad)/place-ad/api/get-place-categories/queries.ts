import { queryOptions } from '@tanstack/react-query';
import { getPlaceCategoriesAsync } from './get-place-categories';

export const GetPlaceCategoriesQueries = (token: string) =>
  queryOptions({
    queryKey: ['place-categories'],
    queryFn: () => getPlaceCategoriesAsync(token),
  });
