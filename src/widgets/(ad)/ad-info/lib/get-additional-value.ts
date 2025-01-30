/* eslint-disable react-hooks/rules-of-hooks */

import { NonTranslableKeys } from '../config/non-translable-keys';

type Props = {
  t: any;
  value: string;
  category: string;
  key: string;
};

export const getAdditionalValue = ({ t, value, category, key }: Props) => {
  const fullKey = `${category}.${key}`;

  const strValue = NonTranslableKeys.includes(fullKey)
    ? value
    : t(`${fullKey}.${value}`);

  return Number(value) ? value : strValue;
};
