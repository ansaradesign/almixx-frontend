import { apiClient } from '@albomoni/shared/api/base';
import { TLocation } from '../model/types/location.type';

export const saveLocation = (location: TLocation, token: string) =>
  apiClient.post('location/', location, { Authorization: `Bearer ${token}` });
