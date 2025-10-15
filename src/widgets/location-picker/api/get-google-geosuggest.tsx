export const getGoogleGeosuggestions = (input: string) =>
  fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=establishment&key=${process.env.NEXT_PUBLIC_GOOGLE_API_URL}`,
  );
