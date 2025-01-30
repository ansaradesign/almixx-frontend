import { TGoogleSuggestion } from '@albomoni/entities/map/model/google-suggestion.type';
import { TLocation } from '@albomoni/shared/model/types/location.type';
import { filterAddressComponents } from './filter-address-components';

export const parseLocation = (
  locationResponce: TGoogleSuggestion,
): TLocation => {
  const { formatted_address, geometry, address_components } = locationResponce;

  const city =
    filterAddressComponents(address_components, 'locality')?.long_name || '';

  const countryComponent = filterAddressComponents(
    address_components,
    'country',
  );

  const { lat, lng } = geometry.location;

  return {
    address: formatted_address,
    city,
    country: countryComponent?.long_name || '',
    country_code: countryComponent?.short_name || '',
    lat: typeof lat === 'function' ? lat() : lat,
    lon: typeof lng === 'function' ? lng() : lng,
  };
};
