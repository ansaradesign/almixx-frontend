import { apiClient } from '@albomoni/shared/api/base';
import { RestorePasswordInputData, SignupOutputData } from './signup.type';

export const restorePassword = async (queries: RestorePasswordInputData) =>
  apiClient.put<SignupOutputData>('restore-password/', queries);
