import { TGoogleSuggestion } from '@albomoni/entities/map/model/google-suggestion.type';

export const filterAddressComponents = (
  addressComponents: TGoogleSuggestion['address_components'],
  searchKey: 'locality' | 'country',
) => {
  return addressComponents.find((component) =>
    component.types.includes(searchKey),
  );
};
