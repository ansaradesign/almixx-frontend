import dynamic from 'next/dynamic';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const DynamicSearchList = dynamic(
  () => import('./searchlist').then((mod) => mod.SearchList),
  { ssr: false },
);

export const SearchPage = ({ searchParams: { query } }: Props) => {
  return (
    <main className='w-full flex justify-center '>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40 pt-5 md:pt-10'>
        <div className='w-full h-min flex flex-col gap-10'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            Результаты поиска по запросу &quot;{query}&quot;
          </h2>
          <DynamicSearchList query={query as string} />
        </div>
      </div>
    </main>
  );
};
