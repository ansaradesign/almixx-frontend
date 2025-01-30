/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { Input } from '@nextui-org/input';
import * as yup from 'yup';
import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import { PlaceAdInputProps } from '../../model/form.type';
import { useCategory } from '../../lib/use-category';

const yupSchema = yup.object({
  number: yup
    .number()
    .integer('number.int')
    .typeError('number.invalid')
    .required('number.required'),
});

export const PlaceAdNumber = memo(
  ({ title, form, updateForm, value }: PlaceAdInputProps) => {
    const { t } = useClientTranslation('place-ad');
    const category = useCategory();

    const handleChange = (e: any) => {
      const { value: inputValue } = e.target;

      try {
        yupSchema.validateSync({ number: inputValue });
        updateForm((draft: any) => {
          draft.errors[title] = null;
        });
      } catch (err: any) {
        updateForm((draft: any) => {
          draft.errors[title] = err.message;
        });
      }

      updateForm((draft: any) => {
        draft.fields[title] = inputValue;
      });
    };

    return (
      <div className='flex gap-4 flex-col'>
        <h5 className='text-md font-medium opacity-50'>
          {t(`${category}.${title}.name`)}
        </h5>
        <Input
          size='lg'
          id='number'
          type='text'
          autoComplete='cc-number'
          inputMode='numeric'
          min={1}
          value={value || ''}
          onChange={handleChange}
        />

        <AnimatePresence>
          {form?.errors[title] && (
            <NotificationBubble type='error'>
              {t(`errors.${form.errors[title]}`)}
            </NotificationBubble>
          )}
        </AnimatePresence>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.form?.fields[prevProps.title] ===
    nextProps.form?.fields[prevProps.title],
);
