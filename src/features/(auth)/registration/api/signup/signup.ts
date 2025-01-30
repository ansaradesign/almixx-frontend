import { apiClient } from '@albomoni/shared/api/base';
import { SignupInputData, SignupOutputData } from './signup.type';

export const signupAsync = async (queries: SignupInputData) =>
  apiClient.post<SignupOutputData>('signup', queries);
