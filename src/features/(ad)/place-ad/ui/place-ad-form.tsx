/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-param-reassign */

import { useImmer } from 'use-immer';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { useCookie } from 'react-use';
import { API_URL } from '@albomoni/shared/config';
import { useState } from 'react';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { AnimatePresence } from 'framer-motion';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { PlaceAdFormElement, PlaceAdInput } from './form-variants';
import { PlaceAdQueries } from '../api';
import { PlaceAdFormState } from '../model/form.type';
import { countFields } from '../lib/count-fields';
import { CategoryContext } from '../lib/use-category';
import { PlaceAdFormButtons } from './place-ad-form-buttons';

type Props = {
  formData: any;
};

export const PlaceAdForm = ({ formData }: Props) => {
  const { t } = useClientTranslation('place-ad');
  const { mutateAsync } = useMutation(PlaceAdQueries);
  const { user } = useSession();
  const [token] = useCookie('token');
  const [formError, setFormError] = useState<string | null>(null);

  const [form, updateForm] = useImmer<PlaceAdFormState>({
    fields: {},
    filters: formData.filters,
    errors: {},
  });

  const saveAd = async (): Promise<any> => {
    const errorsList = Object.entries(form.errors);
    const passedFields = errorsList.filter(
      ([_errKey, errValue]) => errValue === null,
    );

    const isValidForm = passedFields.length === countFields(formData);

    if (!isValidForm) {
      setFormError('error.invalid');
      return;
    }

    setFormError(null);

    const formCopy = _.cloneDeep(form);
    const photoFormData = new FormData();
    const photos = form.fields.photo as File[];

    photos.forEach((img: Blob) => {
      photoFormData.append('file', img);
    });

    delete formCopy.fields.photo;

    const hash = `${user?.user_id}_${Date.now().toString()}`;

    try {
      const response = await mutateAsync({ ...formCopy, token, hash });

      await fetch(`${API_URL}place-img/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
          AdId: hash,
        },
        method: 'POST',
        body: photoFormData,
      });

      return response;
    } catch {
      return;
    }
  };

  return (
    <CategoryContext.Provider value={formData.filters[0]}>
      <div className='lg:w-1/2'>
        {Object.keys(formData.sections).map((section) => {
          const inputs = formData.sections[section];
          return (
            <div key={section} className='flex flex-col gap-3 mb-20'>
              <h3 className='text-2xl font-semibold mb-5'>
                {t(`sections.${section}`)}
              </h3>
              <div className='flex flex-col gap-10'>
                {inputs.map((input: PlaceAdInput) => {
                  return (
                    <PlaceAdFormElement
                      key={input.name}
                      name={input.name}
                      type={input.type}
                      variants={input.variants}
                      value={form.fields[input.name] as string}
                      form={form}
                      updateForm={updateForm}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
        <PlaceAdFormButtons saveAd={saveAd} />
        <AnimatePresence>
          {formError && (
            <NotificationBubble type='error'>
              Заполните корректно все поля
            </NotificationBubble>
          )}
        </AnimatePresence>
      </div>
    </CategoryContext.Provider>
  );
};
