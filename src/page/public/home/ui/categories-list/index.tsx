import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { Categories } from './categories';
import { CategoriesContainer } from './categories-container';

export const CategoriesList = ({ lng }: I18nLangParam) => {
  return (
    <CategoriesContainer>
      <Categories lng={lng} />
    </CategoriesContainer>
  );
};
