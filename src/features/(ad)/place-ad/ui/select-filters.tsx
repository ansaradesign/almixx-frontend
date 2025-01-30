import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/button';
import { useMutation } from '@tanstack/react-query';
import { PiCaretRightBold } from 'react-icons/pi';
import { useCookie } from 'react-use';
import { PlaceFormQueries } from '../api';
import { InitialChosenMemoryState } from '../config/initial-chosen-memory-state';

type Props = {
  variants: any;
  selectedVariants: string[];
  setVariants: (variants: string[]) => void;
  setFormData: (formData: any) => void;
  updateChosenMemoryState: (callback: any) => void;
  updateSelectedVariants: (callback: any) => void;
};

export const SelectFilters = ({
  variants,
  selectedVariants,
  setVariants,
  setFormData,
  updateChosenMemoryState,
  updateSelectedVariants,
}: Props) => {
  const { t } = useClientTranslation('place-ad');
  const [token] = useCookie('token');

  const { mutateAsync } = useMutation(PlaceFormQueries);

  const selectFormAsync = async (selectedFilters: string[]) => {
    setFormData('loading');
    const resp = await mutateAsync({ filters: selectedFilters, token });
    setFormData(resp);
  };

  const handleClick = (event: any) => {
    const selectedVariant = event.target.id;
    const dependencies = variants[selectedVariant];

    updateSelectedVariants((draft: any) => {
      draft.push(selectedVariant);
    });

    updateChosenMemoryState((draft: typeof InitialChosenMemoryState) => {
      draft.prevVariants.push(variants);
      draft.prevSelected.push(selectedVariant);
    });

    if (dependencies === null) {
      selectFormAsync([...selectedVariants, selectedVariant]);
    } else {
      setVariants(dependencies);
    }
  };

  return (
    <div className='flex md:grid md:grid-cols-2 gap-3 md:gap-6 flex-wrap pb-20'>
      {Object.keys(variants).map((variant) => {
        return (
          <Button
            key={variant}
            disableRipple
            size='lg'
            className='w-full rounded-2xl py-8 justify-between hover:scale-[1.02] bg-white dark:bg-default shadow-base font-medium'
            id={variant}
            onPress={handleClick}
          >
            {t(`categories.${variant}`)}
            <PiCaretRightBold size={18} className='flex-shrink-0 opacity-50' />
          </Button>
        );
      })}
    </div>
  );
};
