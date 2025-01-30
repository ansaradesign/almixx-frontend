import { apiClient } from '@albomoni/shared/api/base';

export const stopAd = (
  id: number,
  status: 'moderating' | 'archived' | 'ended',
  token: string,
) =>
  apiClient.put(`ad/${id}`, { status }, { Authorization: `Bearer ${token}` });
