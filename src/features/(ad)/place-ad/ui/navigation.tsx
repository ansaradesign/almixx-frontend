/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/button';
import { Fragment } from 'react';
import { PiCaretLeftBold } from 'react-icons/pi';
import { InitialChosenMemoryState } from '../config/initial-chosen-memory-state';

type Props = {
  chosenMemoryState: typeof InitialChosenMemoryState;
  formData: any;
  setVariants: (variants: string[]) => void;
  setFormData: (formData: any) => void;
  updateChosenMemoryState: (callback: any) => void;
  updateSelectedVariants: (callback: any) => void;
};

export const PlaceAdNavigation = ({
  chosenMemoryState,
  formData,
  setVariants,
  setFormData,
  updateChosenMemoryState,
  updateSelectedVariants,
}: Props) => {
  const { t } = useClientTranslation('place-ad');

  const handleClickBack = () => {
    const { prevVariants } = chosenMemoryState;

    setVariants(prevVariants[prevVariants.length - 1]);

    updateSelectedVariants((draft: any) => {
      draft.length -= 1;
    });

    updateChosenMemoryState((draft: typeof InitialChosenMemoryState) => {
      draft.prevVariants.length -= 1;
      draft.prevSelected.length -= 1;
    });

    if (formData) {
      setFormData(null);
    }
  };

  return (
    <div className='w-full flex items-start gap-6'>
      <Button
        radius='full'
        isIconOnly
        className='w-min'
        onPress={handleClickBack}
      >
        <PiCaretLeftBold size={20} />
      </Button>
      <div className='w-full flex flex-wrap opacity-50 items-center gap-2 pt-2'>
        {chosenMemoryState.prevSelected.map((title, index, array) => {
          if (index < array.length - 1) {
            return (
              <Fragment key={title}>
                <p>{t(`categories.${title}`)}</p>
                <p>{'>'}</p>
              </Fragment>
            );
          }
          return <p key={title}>{t(`categories.${title}`)}</p>;
        })}
      </div>
    </div>
  );
};
