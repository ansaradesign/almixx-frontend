/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import * as yup from 'yup';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import { RichTextEditor } from '@albomoni/shared/ui/(inputs)/rich-text-editor';
import { PlaceAdInputProps } from '../../model/form.type';

const yupSchema = yup.object({
  textarea: yup.string().required('required'),
});

export const PlaceAdTextarea = memo(
  ({ title, form, updateForm, value }: PlaceAdInputProps) => {
    const { t } = useClientTranslation('place-ad');

    const handleChange = (newValue: string) => {
      try {
        yupSchema.validateSync({ textarea: newValue });
        updateForm((draft: any) => {
          draft.errors[title] = null;
        });
      } catch (err: any) {
        updateForm((draft: any) => {
          draft.errors[title] = err.message;
        });
      }

      updateForm((draft: any) => {
        draft.fields[title] = newValue;
      });
    };

    return (
      <div className='flex gap-4 flex-col'>
        <h5 className='text-md font-medium opacity-50'>{t(`${title}.name`)}</h5>
        <RichTextEditor onChange={handleChange} value={value} />

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
