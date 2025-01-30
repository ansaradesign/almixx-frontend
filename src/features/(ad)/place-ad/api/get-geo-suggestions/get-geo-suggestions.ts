import { GEOSUGGEST_URL } from '@albomoni/shared/config';

export const getGeoSuggestions = (query: string) =>
  fetch(GEOSUGGEST_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.NEXT_PUBLIC_DADATA_API_URL}`,
      // 'X-Secret': process.env.NEXT_PUBLIC_DADATA_SECRET_KEY || '',
    },
    body: JSON.stringify({
      query,
      count: 10,
      locations: [
        {
          country_iso_code: '*',
        },
      ],
    }),
  });
