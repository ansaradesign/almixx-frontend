import { AdsListSkeleton } from '@albomoni/widgets/infinite-scroller/ui/ads-list-skeleton';
import { Skeleton } from '@nextui-org/skeleton';
import dynamic from 'next/dynamic';

type Props = {
  lng: string;
  categoryId: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

const DynamicCategoryHeader = dynamic(
  () => import('./category-header').then((mod) => mod.CategoryHeader),
  { loading: () => <Skeleton className='w-full h-72 md:rounded-3xl' /> },
);

const DynamicCategoryAdsBlock = dynamic(
  () => import('./ads-block').then((mod) => mod.CategoryAdsBlock),
  { loading: () => <AdsListSkeleton /> },
);

export const CategoryPage = async ({
  lng,
  categoryId,
  searchParams,
}: Props) => {
  return (
    <main className='flex flex-col gap-10 items-center pb-40'>
      <div className='w-full max-w-7xl md:px-4 flex flex-col gap-10'>
        <DynamicCategoryHeader
          lng={lng}
          categoryId={categoryId}
          searchParams={searchParams}
        />
      </div>

      <div className='w-full max-w-7xl px-4 flex flex-col gap-6'>
        <DynamicCategoryAdsBlock
          lng={lng}
          categoryId={categoryId}
          searchParams={searchParams}
        />
      </div>
    </main>
  );
};
