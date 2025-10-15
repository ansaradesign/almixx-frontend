/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-param-reassign */

'use client';

import { useImmer } from 'use-immer';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/button';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { useCookie } from 'react-use';
import { API_URL } from '@albomoni/shared/config';
import { useEffect, useState } from 'react';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { AnimatePresence } from 'framer-motion';
import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { useRouter } from 'next/navigation';
import revalidateRoute from '@albomoni/shared/lib/utils/server/revalidate';
import { PlaceAdFormElement, PlaceAdInput } from './form-variants';
import { PlaceAdQueries } from '../api';
import { PlaceAdFormState } from '../model/form.type';
import { countFields } from '../lib/count-fields';
import { CategoryContext } from '../lib/use-category';
import { base64toFile } from '../lib/base-64-to-file';

type Props = {
  formData: any;
  ad: Ad;
};

export const EditAdForm = ({ formData, ad }: Props) => {
  const { t } = useClientTranslation('place-ad');
  const { mutateAsync } = useMutation(PlaceAdQueries);
  const [token] = useCookie('token');
  const [isImagesLoaded, setImagesLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    id,
    additional,
    cost,
    description,
    seller,
    currency,
    images,
    hash,
    title,
    address: adAddress,
    city,
    country,
    country_code,
    lat,
    lon,
  } = ad.ad;

  const address = {
    address: adAddress,
    city,
    country,
    country_code,
    lat,
    lon,
  };

  const initFields = {
    price: { value: cost.toString(), currency },
    description,
    address,
    seller,
    photo: [],
    ...additional,
  };

  const initFieldsWithTitle = title ? { title, ...initFields } : initFields;

  const initErrors = () =>
    Object.keys(initFields).reduce(
      (acc: any, field: string) => ({
        ...acc,
        [field]: null,
      }),
      {},
    );

  const [form, updateForm] = useImmer<PlaceAdFormState>({
    fields: initFieldsWithTitle,
    filters: formData.filters,
    errors: initErrors(),
  });

  useEffect(() => {
    const loadImages = async () => {
      const imgArray = images.map((img) => img.full.split('/media')[1]);
      const resp = await apiClient.post<{ files: string[] }>('get-images/', {
        files: imgArray,
      });

      const fileList = resp.files.map((base64, index) =>
        base64toFile(base64, imgArray[index]),
      );

      updateForm((draft: any) => {
        draft.fields.photo = fileList;
      });
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  const handleSubmit = async () => {
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

    setIsLoading(true);

    try {
      await mutateAsync({ ...formCopy, token, hash });

      await fetch(`${API_URL}edit-images/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
          AdId: hash,
        },
        method: 'POST',
        body: photoFormData,
      });

      revalidateRoute(`/profile/my-ads/ad/${id}`);
      revalidateRoute(`/profile/my-ads/ad/${id}/edit`);
      router.replace(`/profile/my-ads/ad/${id}`);
    } catch {
      return;
    } finally {
      setIsLoading(false);
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
                      isImagesLoaded={isImagesLoaded}
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
        <div className='flex flex-col gap-4'>
          <Button
            isDisabled={!isImagesLoaded}
            size='lg'
            color='primary'
            variant='shadow'
            onPress={handleSubmit}
            isLoading={isLoading}
            className='w-min font-medium'
          >
            Обновить информацию
          </Button>

          <AnimatePresence>
            {formError && (
              <NotificationBubble type='error'>
                Заполните корректно все поля
              </NotificationBubble>
            )}
          </AnimatePresence>
        </div>
      </div>
    </CategoryContext.Provider>
  );
};
