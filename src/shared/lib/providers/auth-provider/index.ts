'use client';

import { useValidateToken } from '@albomoni/shared/api/use-validate-token';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  useValidateToken();

  return children;
};
