import { apiClient } from '@albomoni/shared/api/base';

export const getContacts = (user_id: number, ad_id: number, token: string) =>
  apiClient.get<{ phone: string }>(
    'get-contacts',
    { user_id, ad_id },
    {
      Authorization: `Bearer ${token}`,
    },
  );
