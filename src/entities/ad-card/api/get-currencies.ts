import { apiClient } from '@albomoni/shared/api/base';

export const getCurrenciesAsync = async () =>
  apiClient.get<{ [key: string]: number }>('currency/');
