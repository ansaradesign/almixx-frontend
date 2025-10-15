import { StartAdPeriodVariants } from '../config/start-ad-period-variants';

export const calcStartAdPrice = (
  adPrice: number,
  period: 'daily' | 'weekly' | 'monthly',
  salePeriod: 'daily' | 'weekly' | 'monthly',
  promotionPrice: number,
) => {
  const periodDays = {
    daily: 1,
    weekly: 7,
    monthly: 30,
  };

  const modifier =
    StartAdPeriodVariants.find(({ id }) => id === salePeriod)?.modifier || 1;

  return Math.round((adPrice + promotionPrice) * periodDays[period] * modifier);
};
