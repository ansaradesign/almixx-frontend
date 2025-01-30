export type TGoogleSuggestion = {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  geometry: {
    bounds: {
      Xh: { lo: number; hi: number };
      Hh: { lo: number; hi: number };
    };
    location: {
      lat: number | (() => number);
      lng: number | (() => number);
    };
    location_type: string;
    viewport: {
      Xh: { lo: number; hi: number };
      Hh: { lo: number; hi: number };
    };
  };
  place_id: string;
  types: string[];
};
