/* eslint-disable sonarjs/no-nested-template-literals */
/* eslint-disable react-hooks/rules-of-hooks */

import { useTranslation } from '@albomoni/shared/i18n';

export const getAdTitle = async (
  lng: string,
  title: string | null,
  additional: { [key: string]: string },
  categories: string[],
) => {
  const { t } = await useTranslation(lng, 'place-ad');

  if (title) {
    return title;
  }

  const titleVault = {
    real_estate: {
      apartments: `${t(
        `${categories[0]}.rooms_count.${additional.rooms_count}`,
      )} квартира, ${additional.square} м², ${additional.floor}/${
        additional.floors_house
      } этаж`,
      rooms: `Комната, ${additional.square} м², ${additional.floor}/${additional.floors_house} этаж`,
    },
    transportation: `${additional.brand} ${additional.model} ${additional.year}`,
  } as any;

  if (categories[0] === 'real_estate')
    return titleVault[categories[0]][categories[1]];

  return titleVault[categories[0]];
};
