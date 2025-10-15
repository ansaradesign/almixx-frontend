export const getCurrencyByLocale = (lng: string) => {
  const Currencies = {
    ru: 'EUR',
    en: 'EUR',
  } as any;

  return Currencies[lng];
};
