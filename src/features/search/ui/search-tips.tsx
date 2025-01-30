import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { Fragment } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { useLangContext } from '@albomoni/shared/lib/providers';
import { TSearchTip } from '../model/search.type';
import { SearchModalProps } from './search-modal';

type Props = {
  tips: TSearchTip[];
} & SearchModalProps;

export const SearchTips = ({ tips, onClose }: Props) => {
  const { t } = useClientTranslation('place-ad');
  const { push } = useRouter();
  const lng = useLangContext();

  const handleClick = (url: string) => () => {
    onClose();
    push(`/${lng}/${url}`);
  };

  return tips.length > 0 ? (
    <div className='w-full flex flex-col gap-4'>
      {tips.map(({ categories, url }) => {
        return (
          <Fragment key={url}>
            <button
              type='button'
              onClick={handleClick(url)}
              className='flex gap-2 py-4 px-4 bg-default rounded-2xl flex-wrap'
            >
              {categories.map((suggestion, indexTip) => {
                return (
                  <div className='flex gap-2' key={suggestion}>
                    <p className='font-medium opacity-80 w-fit text-nowrap'>
                      {t(`categories.${suggestion}`)}
                    </p>
                    {categories.length - 1 > indexTip && <p>{'>'}</p>}
                  </div>
                );
              })}
            </button>
          </Fragment>
        );
      })}
    </div>
  ) : (
    <Placeholder
      icon={<PiMagnifyingGlass size={64} className='opacity-50 mt-10' />}
      title='Ничего не найдено'
      desc='Попробуйте ввести другой запрос'
    />
  );
};
