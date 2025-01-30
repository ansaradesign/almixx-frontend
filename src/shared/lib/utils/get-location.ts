import { TLocation } from '@albomoni/shared/model/types/location.type';
import { getCookie } from 'cookies-next';

export const getLocation = (): TLocation => {
  try {
    return JSON.parse(getCookie('location') as string) as TLocation;
  } catch {
    return {
      address: 'Весь мир',
      city: 'Весь мир',
      country: 'Весь мир',
      country_code: '',
      lat: 0,
      lon: 0,
    };
  }
};
