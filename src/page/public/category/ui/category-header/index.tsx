import { getCategoriesAsync } from '@albomoni/entities/menu/api/get-categories';
import { useTranslation } from '@albomoni/shared/i18n';
import { CategoryFilter } from '@albomoni/widgets/category-filter';
import { Skeleton } from '@nextui-org/skeleton';
import dynamic from 'next/dynamic';
import Image from 'next/image';

type Props = {
  lng: string;
  categoryId: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

const DynamicNavigateToLocationCategoryButton = dynamic(
  () =>
    import('@albomoni/features/(navigate)/to-location-page').then(
      (mod) => mod.NavigateToLocationCategoryButton,
    ),
  {
    loading: () => <Skeleton className='w-40 h-10 rounded-full' />,
    ssr: false,
  },
);

export const CategoryHeader = async ({
  lng,
  categoryId,
  searchParams,
}: Props) => {
  const { t } = await useTranslation(lng);
  const categories = await getCategoriesAsync();
  const categoryData = categories.find(({ name }) => name === categoryId);

  return (
    <div className='w-full p-6 py-8 md:p-8 md:rounded-3xl bg-gradient-to-tr from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-blue-800/50 flex flex-col gap-8 relative overflow-clip md:pr-48'>
      <h1 className='text-2xl font-bold text-blue-950 dark:text-white'>
        {t(`categories.${categoryId}`)}
      </h1>
      <DynamicNavigateToLocationCategoryButton />
      <CategoryFilter categoryId={categoryId} searchParams={searchParams} />
      {categoryData && (
        <Image
          className='hidden md:block absolute -bottom-5 right-0'
          unoptimized
          width={240}
          height={240}
          src={categoryData.img}
          alt={categoryId}
        />
      )}
    </div>
  );
};
