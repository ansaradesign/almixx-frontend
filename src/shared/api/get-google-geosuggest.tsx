import { TGoogleSuggestion } from '@albomoni/entities/map/model/google-suggestion.type';

type TGoogleGeoResponce = {
  plus_code: any;
  results: TGoogleSuggestion[];
  status: string;
};

export const googleGeosuggest = (
  lat: string,
  lng: string,
): Promise<TGoogleGeoResponce> =>
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ru&result_type=locality&key=${process.env.NEXT_PUBLIC_GOOGLE_API_URL}`,
  ).then((resp) => resp.json());
