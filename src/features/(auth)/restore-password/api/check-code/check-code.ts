import { apiClient } from '@albomoni/shared/api/base';
import { CheckCodeInputData, CheckCodeOutputData } from './check-code.type';

export const checkCodeAsync = async (queries: CheckCodeInputData) => apiClient.post<CheckCodeOutputData>(
  'restore-password/',
  queries,
);
