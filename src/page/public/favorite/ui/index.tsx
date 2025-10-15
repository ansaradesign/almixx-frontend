import { AdsSkeleton } from '@albomoni/widgets/infinite-scroller';
import dynamic from 'next/dynamic';

type Props = {
  lng: string;
  favoritesId: string;
};

const DynamicFavoritesList = dynamic(
  () => import('./favorites').then((mod) => mod.FavoritesList),
  {
    loading: () => (
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <AdsSkeleton height={356} />
      </div>
    ),
  },
);

export const FavoritePage = async ({ lng, favoritesId }: Props) => {
  return (
    <main className='w-full flex justify-center '>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40 pt-5 md:pt-10'>
        <div className='w-full h-min flex flex-col gap-10'>
          <h2 className='text-2xl md:text-3xl font-bold'>Избранное</h2>
          <DynamicFavoritesList favoritesId={favoritesId} lng={lng} />
        </div>
      </div>
    </main>
  );
};
