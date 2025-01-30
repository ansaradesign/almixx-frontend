/* eslint-disable sonarjs/no-nested-template-literals */
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { CheckboxGroup, Checkbox } from '@nextui-org/checkbox';
import { HiSelector } from 'react-icons/hi';
import { useFilters } from '@albomoni/widgets/category-filter/lib/use-filters';
import { renderFilterState } from '@albomoni/widgets/category-filter/lib/render-filter-state';
import { useFiltersState } from '@albomoni/widgets/category-filter/lib/use-filters-state';

type Props = {
  selected: string[];
  variants: string[];
  filterKey: string;
  setFilterState: (state: any) => void;
};

export const MultipleSelector = ({
  selected,
  variants,
  filterKey,
  setFilterState,
}: Props) => {
  const { t } = useClientTranslation('filter_names');
  const filters = useFilters();
  const filtersState = useFiltersState();

  const handleChange = (collection: string[]) => {
    if (collection.length > 0) {
      const newState = renderFilterState(
        filters,
        filtersState,
        filterKey,
        collection,
      );
      setFilterState(newState);
    }
  };

  return (
    <Popover backdrop='opaque' placement='bottom'>
      <PopoverTrigger>
        <div className='w-fit h-min py-2 bg-[--element] dark:bg-neutral-300 text-black rounded-xl px-5 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform cursor-pointer'>
          {selected.map((item, index) => {
            if (selected.length !== index + 1) {
              return `${t(`${filterKey}.${item}`)}, `;
            }
            return t(`${filterKey}.${item}`);
          })}
          <HiSelector size={20} className='mt-[1px] flex-shrink-0' />
        </div>
      </PopoverTrigger>

      <PopoverContent className='w-56 p-4 gap-4 items-start justify-start'>
        <CheckboxGroup
          isRequired
          classNames={{ base: 'w-full flex flex-col', wrapper: 'gap-4 w-full' }}
          value={selected}
          onValueChange={handleChange}
        >
          {variants.map((variant) => (
            <Checkbox
              classNames={{
                base: 'w-full cursor-pointer rounded-lg items-start max-w-full',
                wrapper: 'mt-[3px]',
              }}
              key={variant}
              value={variant}
            >
              {t(`${filterKey}.${variant}`)}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </PopoverContent>
    </Popover>
  );
};
