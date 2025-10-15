import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { getCategoriesAsync } from '../../api/get-categories';
import { MenuCategoriesSkeleton } from './skeleton';

type Props = {
  onClose: () => void;
};

export const MenuCategories = ({ onClose }: Props) => {
  const { t } = useClientTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesAsync,
  });

  if (isLoading) {
    return <MenuCategoriesSkeleton />;
  }

  return (
    data && (
      <div className='w-full flex flex-col gap-8 py-4 tablet:py-0'>
        <h4 className='text-xl font-bold flex tablet:hidden'>Все категории</h4>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
          {data.map((category) => (
            <Link
              key={category.name}
              as={`/categories/${category.name}`}
              href='/categories/[categoryId]'
              onClick={onClose}
              className='w-full h-48 bg-[--element] rounded-2xl p-4 items-start justify-start flex-shrink-0 hover:scale-105 active:scale-95 transition-transform relative'
            >
              <p className='text-sm font-semibold'>
                {t(`categories.${category.name}`)}
              </p>
              <Image
                unoptimized
                className='absolute bottom-0 right-0'
                width={150}
                height={150}
                src={category.img}
                alt={category.name}
              />
            </Link>
          ))}
        </div>
      </div>
    )
  );
};
