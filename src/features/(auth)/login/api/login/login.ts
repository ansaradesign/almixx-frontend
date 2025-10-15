import { apiClient } from '@albomoni/shared/api/base';
import { LoginInputData, LoginOutputData } from './login.type';

export const loginAsync = async (queries: LoginInputData) =>
  apiClient.post<LoginOutputData>('auth', queries);
