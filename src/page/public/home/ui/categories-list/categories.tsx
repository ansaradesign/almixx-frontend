import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { getCategoriesAsync } from '@albomoni/entities/menu/api/get-categories';
import { Category } from '@albomoni/entities/category';

export const Categories = async ({ lng }: I18nLangParam) => {
  const categories = await getCategoriesAsync();

  return (
    <>
      {categories.map((category) => (
        <Category
          key={category.name}
          name={category.name}
          img={category.img}
          lng={lng}
        />
      ))}
    </>
  );
};
