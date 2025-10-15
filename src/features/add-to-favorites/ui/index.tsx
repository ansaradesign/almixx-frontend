/* eslint-disable sonarjs/cognitive-complexity */

'use client';

import { Button } from '@nextui-org/button';
import { MouseEventHandler, useEffect, useState } from 'react';
import { PiHeartBold, PiHeartFill } from 'react-icons/pi';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { apiClient } from '@albomoni/shared/api/base';
import { getCookie } from 'cookies-next';
import { Tooltip } from '@nextui-org/tooltip';
import { Spinner } from '@nextui-org/spinner';
import { useFavorites } from '../lib/use-favorites';

type Props = {
  postId: number;
  isBig?: boolean;
};

export const AddToFavoritesButton = ({ postId, isBig = false }: Props) => {
  const { isLogged } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { favorites, isPending, setFavorites } = useFavorites();
  const token = getCookie('token');

  useEffect(() => {
    if (favorites.length !== 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const isActive = favorites.includes(postId);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedFavorites = isActive
      ? favorites.filter((id) => id !== postId)
      : [...favorites, postId];

    setFavorites(updatedFavorites);

    if (isLogged) {
      const syncFavsAsync = async () => {
        setIsLoading(true);
        await apiClient.post(
          'favorites/',
          { id: postId },
          { Authorization: `Bearer ${token}` },
        );
        setIsLoading(false);
      };

      syncFavsAsync();
    }
  };

  if (isPending)
    return (
      <div
        className={`${
          isBig ? 'w-12 h-12' : 'w-8 h-8'
        } flex items-center justify-center flex-shrink-0`}
      >
        <Spinner color='default' />
      </div>
    );

  return (
    <Tooltip
      content={isActive ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      <Button
        isDisabled={isLoading}
        isIconOnly
        size={isBig ? 'lg' : 'sm'}
        radius={isBig ? 'lg' : 'full'}
        onClick={handleClick}
        className={
          isActive
            ? `text-[--error] ${isBig ? 'bg-red-500/20' : 'bg-red-500/10'}`
            : `text-[--text]  ${
              isBig ? 'dark:bg-default' : 'dark:bg-default-200'
            }`
        }
      >
        {isActive ? (
          <PiHeartFill size={isBig ? 24 : 18} />
        ) : (
          <PiHeartBold size={isBig ? 24 : 18} />
        )}
      </Button>
    </Tooltip>
  );
};
