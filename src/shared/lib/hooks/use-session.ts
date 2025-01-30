import { UserType } from '@albomoni/entities/user/model/user.type';
import { useDispatch, useSelector } from 'react-redux';

export const useSession = () => {
  const dispatch = useDispatch();

  const user: UserType | null = useSelector(
    (state: RootState) => state.session.user,
  );

  const isTokenValid: boolean = useSelector(
    (state: RootState) => state.session.isTokenValid,
  );

  const isPending: boolean = useSelector(
    (state: RootState) => state.session.isPending,
  );

  const setUser = (incomingUser: UserType | null) => {
    dispatch({
      type: 'session/setUser',
      payload: incomingUser,
    });
  };

  const setIsValidToken = (validation: boolean) => {
    dispatch({
      type: 'session/setIsTokenValid',
      payload: validation,
    });
  };

  const setIsPending = (validation: boolean) => {
    dispatch({
      type: 'session/setIsPending',
      payload: validation,
    });
  };

  const isLogged = (user && isTokenValid) || false;

  return {
    user,
    isTokenValid,
    isLogged,
    isPending,
    setUser,
    setIsValidToken,
    setIsPending,
  };
};
