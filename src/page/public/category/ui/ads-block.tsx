import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { cookies } from 'next/headers';
import { AdsContainer } from './ads-container';

type Props = {
  lng: string;
  categoryId: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const CategoryAdsBlock = async ({
  lng,
  categoryId,
  searchParams,
}: Props) => {
  cookies();

  const parsedFilters = searchParams.filters
    ? JSON.parse(atob(searchParams.filters as string))
    : null;

  const normalizedFilters = parsedFilters
    ? Object.values(parsedFilters).map((filter: any) => filter.selected)
    : null;

  const currencies = await getCurrenciesAsync();

  return (
    <AdsContainer
      currencies={currencies}
      normalizedFilters={normalizedFilters}
      categoryId={categoryId}
    />
  );
};
