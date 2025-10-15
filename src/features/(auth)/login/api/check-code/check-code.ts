import { apiClient } from '@albomoni/shared/api/base';
import { CheckCodeInputData, CheckCodeOutputData } from './check-code.type';

export const checkCodeAsync = async (queries: CheckCodeInputData) => apiClient.get<CheckCodeOutputData>(
  'checkCode',
  queries,
);
