import { ProtectedRouteMessage } from '@albomoni/shared/ui/protected-route';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

type Props = {
  children: React.ReactNode;
};

export default function AuthTemplate({ children }: Props) {
  const token = getCookie('token', { cookies });

  return token ? children : <ProtectedRouteMessage />;
}
