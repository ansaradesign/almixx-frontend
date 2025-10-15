import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@albomoni/shared/i18n';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

interface Props extends I18nLangParam {
  name: string;
  img: string;
}

export const Category = async ({ name, img, lng }: Props) => {
  const { t } = await useTranslation(lng);
  return (
    <Link
      key={name}
      as={`/categories/${name}`}
      href='/categories/[categoryId]'
      className='w-36 h-48 bg-[--element] rounded-2xl p-4 items-start justify-start flex-shrink-0 hover:scale-105 active:scale-95 transition-transform relative'
    >
      <p className='text-sm font-semibold'>{t(`categories.${name}`)}</p>
      <Image
        className='absolute bottom-0 right-0'
        unoptimized
        width={150}
        height={150}
        src={img}
        alt={name}
      />
    </Link>
  );
};
