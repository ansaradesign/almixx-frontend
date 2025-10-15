import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { renderFilterState } from '@albomoni/widgets/category-filter/lib/render-filter-state';
import { useFilters } from '@albomoni/widgets/category-filter/lib/use-filters';
import { useFiltersState } from '@albomoni/widgets/category-filter/lib/use-filters-state';
import { PiCaretDownBold } from 'react-icons/pi';

type Props = {
  selected: string;
  variants: string[];
  filterKey: string;
  setFilterState: (state: any) => void;
};

export const SingleSelector = ({
  selected,
  variants,
  filterKey,
  setFilterState,
}: Props) => {
  const { t } = useClientTranslation('filter_names');
  const filters = useFilters();
  const filtersState = useFiltersState();

  const handleChange = (value: string) => {
    const newState = renderFilterState(filters, filtersState, filterKey, value);
    setFilterState(newState);
  };

  return (
    <Popover backdrop='opaque' placement='bottom'>
      <PopoverTrigger>
        <div className='w-fit h-min py-2 bg-[--element] dark:bg-neutral-300 text-black rounded-xl px-5 flex items-center gap-2 hover:scale-105 active:scale-90 transition-transform cursor-pointer'>
          {t(`${filterKey}.${selected}`)}
          <PiCaretDownBold size={16} className='mt-[1px]' />
        </div>
      </PopoverTrigger>

      <PopoverContent className='w-56 p-4 gap-4 items-start justify-start'>
        <RadioGroup
          classNames={{ base: 'w-full flex flex-col', wrapper: 'gap-4 w-full' }}
          value={selected}
          onValueChange={handleChange}
        >
          {variants.map((variant) => (
            <Radio
              classNames={{
                base: 'w-full cursor-pointer rounded-lg items-start max-w-full',
                wrapper: 'mt-[3px]',
                labelWrapper: 'w-full',
              }}
              key={variant}
              value={variant}
            >
              {t(`${filterKey}.${variant}`)}
            </Radio>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
};
