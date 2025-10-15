import { useTranslation } from '@albomoni/shared/i18n/client';
import { useLangContext } from '@albomoni/shared/lib/providers';

export const useClientTranslation = (filePath = '') => {
  const currentLanguage = useLangContext() as string;

  return useTranslation(currentLanguage, filePath);
};
