'use client';

import { useFavorites } from '@albomoni/features/add-to-favorites/lib/use-favorites';
import { apiClient } from '@albomoni/shared/api/base';
import { getCookie } from 'cookies-next';
import { PropsWithChildren, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useValidateToken } from '@albomoni/shared/api/use-validate-token';
import { useSession } from '../../hooks/use-session';

type Props = PropsWithChildren;

export const FavoriteProvider = ({ children }: Props) => {
  const token = getCookie('token');
  const [, , deleteCookie] = useCookies();
  const { setFavorites, setIsPending } = useFavorites();
  const { isLogged } = useSession();

  useValidateToken();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const resp = await apiClient.get<number[]>(
          'favorites/',
          {},
          { Authorization: `Bearer ${token}` },
        );
        setFavorites(resp);
        setIsPending(false);
      } catch {
        deleteCookie('token');
        window.location.reload();
      }
    };

    if (token) {
      loadFavorites();
    } else {
      const favorites = localStorage.getItem('favorites') || '[]';
      setFavorites(JSON.parse(favorites as string));
      setIsPending(false);
    }
  }, [isLogged]);

  return children;
};
