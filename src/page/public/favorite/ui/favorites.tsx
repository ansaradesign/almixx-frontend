import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { AdsContainer } from './ads-container';

type Props = {
  lng: string;
  favoritesId: string;
};

export const FavoritesList = async ({ lng, favoritesId }: Props) => {
  const getFavsArray = (): number[] => {
    try {
      return JSON.parse(favoritesId) as number[];
    } catch {
      return [];
    }
  };

  const favoritesArray = getFavsArray();

  const currencies = await getCurrenciesAsync();

  return (
    <AdsContainer currencies={currencies} favoritesArray={favoritesArray} />
  );
};
