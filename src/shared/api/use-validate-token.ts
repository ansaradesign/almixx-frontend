import { useEffect } from 'react';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { deleteCookie, getCookie } from 'cookies-next';
import { useLocalStorage } from 'react-use';
import { validateTokenAsync } from '../../widgets/header/api';
import removeCookie from '../lib/utils/server/remove-cookie';

export const useValidateToken = () => {
  const { isPending, isLogged, setUser, setIsValidToken, setIsPending } =
    useSession();
  const token = getCookie('token');
  const [_, setWatchedAds] = useLocalStorage('watched', []);

  useEffect(() => {
    const validateToken = async (tokenStr: string) => {
      try {
        const response = await validateTokenAsync(tokenStr);
        setUser(response);
        setWatchedAds(response.views as any);
        setIsValidToken(true);
        setIsPending(false);
      } catch {
        deleteCookie('token');
        removeCookie('token');
        setIsPending(false);
        setUser(null);
        setIsValidToken(false);
        return;
      }
    };

    if (token) {
      validateToken(token);
    } else {
      setIsPending(false);
      removeCookie('token');
      setUser(null);
      setIsValidToken(false);
    }
  }, [token]);

  return { isLogged, isPending };
};
