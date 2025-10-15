import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { Spacer } from '@nextui-org/spacer';
import dynamic from 'next/dynamic';
import { AdsListSkeleton } from '@albomoni/widgets/infinite-scroller/ui/ads-list-skeleton';
import { CategoriesListSkeleton } from './categories-list/skeleton';
import { WelcomeBlock } from './welcome-block';

const DynamicCategoriesList = dynamic(
  () => import('./categories-list').then((mod) => mod.CategoriesList),
  { loading: () => <CategoriesListSkeleton /> },
);

const DynamicHomeAdsList = dynamic(
  () => import('./ads-list').then((mod) => mod.HomeAdsList),
  { loading: () => <AdsListSkeleton /> },
);

export const HomePage = async ({ lng }: I18nLangParam) => {
  return (
    <main className='flex flex-col items-center z-10 pb-40'>
      <WelcomeBlock />
      <DynamicCategoriesList lng={lng} />
      <Spacer className='h-14' />
      <div className='w-full max-w-7xl px-4'>
        <DynamicHomeAdsList lng={lng} />
      </div>
    </main>
  );
};
