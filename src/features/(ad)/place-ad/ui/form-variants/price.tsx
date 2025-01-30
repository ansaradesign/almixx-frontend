/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { Input } from '@nextui-org/input';
import * as yup from 'yup';
import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import { useCookies } from 'react-cookie';
import { PlaceAdInputProps } from '../../model/form.type';

const yupSchema = yup.object({
  price: yup
    .number()
    .min(1, 'price.min')
    .max(1_000_000_000, 'price.max')
    .integer('price.int')
    .typeError('price.invalid')
    .required('price.required'),
});

export const PlaceAdPrice = memo(
  ({ title, form, updateForm, value }: PlaceAdInputProps) => {
    const { t } = useClientTranslation('place-ad');
    const [cookie] = useCookies();
    const { currency } = cookie;

    const handleChange = (e: any) => {
      const { value: inputValue } = e.target;

      try {
        yupSchema.validateSync({ price: inputValue });
        updateForm((draft: any) => {
          draft.errors[title] = null;
        });
      } catch (err: any) {
        updateForm((draft: any) => {
          draft.errors[title] = err.message;
        });
      }

      updateForm((draft: any) => {
        draft.fields[title] = { value: inputValue, currency };
      });
    };

    return (
      <div className='flex gap-4 flex-col'>
        <h5 className='text-md font-medium opacity-50'>{t(`${title}.name`)}</h5>
        <div className='flex gap-4 items-center'>
          <Input
            size='lg'
            id='price'
            type='text'
            autoComplete='cc-number'
            inputMode='numeric'
            placeholder='10000'
            min={1}
            value={value?.value || ''}
            onChange={handleChange}
          />
          <p className='opacity-50 text-3xl'>₽</p>
        </div>

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
