import { SingleSelector } from '@albomoni/widgets/category-filter/ui/single-selector';
import { MultipleSelector } from '@albomoni/widgets/category-filter/ui/multiple-selector';

type Props = {
  type: 'one' | 'many';
  variants: string[];
  selected: string | string[];
  filterKey: string;
  setFilterState: (state: any) => void;
};

export const Attribute = ({
  type,
  variants,
  selected,
  filterKey,
  setFilterState,
}: Props) => {
  const selectors = {
    one: (
      <SingleSelector
        selected={selected as string}
        filterKey={filterKey}
        variants={variants}
        setFilterState={setFilterState}
      />
    ),
    many: (
      <MultipleSelector
        selected={selected as string[]}
        filterKey={filterKey}
        variants={variants}
        setFilterState={setFilterState}
      />
    ),
  };

  return selectors[type];
};
