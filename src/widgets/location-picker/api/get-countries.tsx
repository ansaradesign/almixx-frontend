import { GEOSUGGEST_URL } from '@albomoni/shared/config';

export const getGeoSuggestionsCity = (query: string) =>
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
      from_bound: { value: 'country' },
      to_bound: { value: 'city' },
      locations: [
        {
          country_iso_code: '*',
        },
      ],
    }),
  });
