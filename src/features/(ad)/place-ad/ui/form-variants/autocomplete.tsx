/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { Key, memo, useEffect } from 'react';
import { Avatar } from '@nextui-org/avatar';
import { PiCarBold } from 'react-icons/pi';
import { PlaceAdInputProps } from '../../model/form.type';
import { useCategory } from '../../lib/use-category';

export const PlaceAdAutocomplete = memo(
  ({ title, variants, updateForm, value }: PlaceAdInputProps) => {
    const { t } = useClientTranslation('place-ad');
    const category = useCategory();

    const handleChange = (selected: Key) => {
      updateForm((draft: any) => {
        draft.errors[title] = null;
        draft.fields[title] = selected;
      });
    };

    const preventResizeError = (e: any) => {
      if (
        e.message ===
        'ResizeObserver loop completed with undelivered notifications.'
      ) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    };

    useEffect(() => {
      window.addEventListener('error', preventResizeError);
      return () => window.removeEventListener('error', preventResizeError);
    }, []);

    return (
      <div className='flex gap-4 flex-col'>
        <h5 className='text-md font-medium opacity-50'>
          {t(`${category}.${title}.name`)}
        </h5>
        <Autocomplete
          defaultItems={variants as any}
          size='lg'
          onKeyDown={(e: any) => e.continuePropagation()}
          selectedKey={value || ''}
          onSelectionChange={handleChange}
        >
          {(item: { label: string; img?: string }) => (
            <AutocompleteItem
              startContent={
                <Avatar src={item.img} icon={<PiCarBold size={24} />} />
              }
              key={item.label}
            >
              {item.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.form?.fields[prevProps.title] ===
    nextProps.form?.fields[prevProps.title],
);
