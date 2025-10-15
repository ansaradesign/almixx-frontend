import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from 'react-use';
import { setCookie } from 'cookies-next';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const [, setLocalFavorites] = useLocalStorage<number[]>('favorites', []);

  const storeFavorites: number[] = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const isPending: boolean = useSelector(
    (state: RootState) => state.favorites.isPending,
  );

  const setFavorites = (array: number[]) => {
    dispatch({
      type: 'favorites/setFavorites',
      payload: array,
    });
    setLocalFavorites(array);
    setCookie('favorites', array);
  };

  const setIsPending = (newPending: boolean) => {
    dispatch({
      type: 'favorites/setIsPending',
      payload: newPending,
    });
  };

  const favorites = storeFavorites;

  return {
    favorites,
    isPending,
    setFavorites,
    setIsPending,
  };
};
