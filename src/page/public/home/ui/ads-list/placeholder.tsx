import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { PiCompass, PiMagnifyingGlass } from 'react-icons/pi';

export const HomeAdsPlaceholder = () => {
  const location = getLocation();

  return location.address === 'Весь мир' ? (
    <Placeholder
      icon={<PiCompass size={64} className='opacity-50 mt-10' />}
      title='Не выбран регион'
      desc='Перейдите в выбор региона для уточнения зоны поиска объявлений'
    />
  ) : (
    <Placeholder
      icon={<PiMagnifyingGlass size={64} className='opacity-50 mt-10' />}
      title='Объявления не найдены'
      desc='Создайте первое объявление в своём городе!'
    />
  );
};
