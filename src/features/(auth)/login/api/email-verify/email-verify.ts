import { apiClient } from '@albomoni/shared/api/base';
import {
  EmailVerifyInputData,
  EmailVerifyOutputData,
} from './email-verify.type';

export const emailVerifyAsync = async (queries: EmailVerifyInputData) => apiClient.get<EmailVerifyOutputData>(
  'emailVerify',
  queries,
);
