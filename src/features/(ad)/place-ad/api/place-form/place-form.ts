import { apiClient } from '@albomoni/shared/api/base';
import { PlaceFormInputData, PlaceFormOutputData } from './place-form.type';

export const placeFormAsync = async ({ filters, token }: PlaceFormInputData) =>
  apiClient.post<PlaceFormOutputData>(
    'place-form/',
    { filters },
    {
      Authorization: `Bearer ${token}`,
    },
  );
