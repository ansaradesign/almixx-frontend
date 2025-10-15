import { apiClient } from '@albomoni/shared/api/base';
import { ValidateTokenOutputData } from './validate-token.type';

export const validateTokenAsync = async (token: string) =>
  apiClient.get<ValidateTokenOutputData>(
    'validate-token',
    {},
    {
      Authorization: `Bearer ${token}`,
    },
  );
