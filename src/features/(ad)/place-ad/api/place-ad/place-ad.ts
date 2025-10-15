import { apiClient } from '@albomoni/shared/api/base';
import { PlaceAdInputData, PlaceAdOutputData } from './place-ad.type';

export const placeAdAsync = async ({
  filters,
  fields,
  token,
  hash,
}: PlaceAdInputData) =>
  apiClient.post<PlaceAdOutputData>(
    'place-ad/',
    { fields, filters },
    {
      Authorization: `Bearer ${token}`,
      AdId: hash.toString(),
    },
  );
