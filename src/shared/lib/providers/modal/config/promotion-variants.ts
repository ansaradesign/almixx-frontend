import { PromoOptions } from '../ui/variants/promote-ad';

export const PromotionVariants = [
  {
    id: 'null' as PromoOptions,
    title: 'Без продвижения',
    properties: [
      'Стандартное количество показов',
      'Стандартное оформление карточки объявления',
    ],
  },
  {
    id: 'x3' as PromoOptions,
    title: 'x3',
    properties: [
      'В 3 раза больше показов объявления',
      'Стандартное оформление карточки объявления',
    ],
  },
  {
    id: 'x5' as PromoOptions,
    title: 'x5',
    properties: [
      'В 5 раз больше показов объявления',
      'Стандартное оформление карточки объявления',
      // 'Выделение цены в карточке объявления',
    ],
  },
  {
    id: 'x7' as PromoOptions,
    title: 'x7',
    properties: [
      'В 7 раз больше показов объявления',
      'Стандартное оформление карточки объявления',
      // 'Анимированная обводка вокруг карточки объявления',
    ],
  },
];

export type PromotionVariantsType = {
  id: PromoOptions;
  title: string;
  properties: string[];
};
