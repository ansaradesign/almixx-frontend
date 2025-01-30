export const getCurrencyByLocale = (lng: string) => {
  const Currencies = {
    ru: 'RUB',
    en: 'USD',
  } as any;

  return Currencies[lng];
};
