/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import { FormEvent, memo, useRef } from 'react';
import {
  PiArrowCounterClockwiseBold,
  PiPlusCircleBold,
  PiXBold,
} from 'react-icons/pi';
import * as yup from 'yup';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { AnimatePresence } from 'framer-motion';
import { PlaceAdInputProps } from '../../model/form.type';
import { rotateImageFile } from '../../lib/rotate-file';

const yupSchema = yup.object({
  images: yup.array().min(3, 'images.min').max(10, 'images.max'),
});

export const PlaceAdPhotos = memo(
  ({ title, form, updateForm, value, isImagesLoaded }: PlaceAdInputProps) => {
    const { t } = useClientTranslation('place-ad');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement & { files: FileList };

      updateForm((draft: any) => {
        if (draft.fields[title]) {
          const imgArray = [
            ...draft.fields[title],
            ...Object.values(target.files),
          ];

          try {
            yupSchema.validateSync({ images: imgArray });
            draft.errors[title] = null;
          } catch (err: any) {
            draft.errors[title] = err.message;
          }

          draft.fields[title] = imgArray;
        } else {
          const imgArray = Object.values(target.files);

          try {
            yupSchema.validateSync({ images: imgArray });
            draft.errors[title] = null;
          } catch (err: any) {
            draft.errors[title] = err.message;
          }

          draft.fields[title] = imgArray;
        }
      });
    };

    const handleOpenInput = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleDeleteFile = (event: any) => {
      const photoIndex = event.target.id;
      const newDraft = value.filter(
        (_file: File, index: number) => index !== Number(photoIndex),
      );

      updateForm((draft: any) => {
        try {
          yupSchema.validateSync({ images: newDraft });
          draft.errors[title] = null;
        } catch (err: any) {
          draft.errors[title] = err.message;
        }

        draft.fields[title] = newDraft;
      });
    };

    const showModalHandler = (file: File) => async (event: any) => {
      const photoIndex = event.target.id;
      const newFile = await rotateImageFile(file);

      const newDraft = value.filter(
        (_file: File, index: number) => index !== Number(photoIndex),
      );

      newDraft.splice(photoIndex, 0, newFile);

      updateForm((draft: any) => {
        draft.fields[title] = newDraft;
      });
    };

    if (isImagesLoaded === false)
      return (
        <div className='w-full flex gap-3'>
          <Spinner size='sm' color='secondary' className='animate-pulse' />
          <p className='animate-pulse font-semibold'>Загрузка фотографий...</p>
        </div>
      );

    return (
      <div className='flex gap-4 flex-col'>
        <h5 className='text-md font-medium opacity-50'>{t(`${title}.name`)}</h5>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 flex-wrap'>
          {value &&
            Object.values(value).map((image: any, index) => {
              return (
                <div
                  key={`image.name.${index}`}
                  className='w-full aspect-square rounded-lg overflow-clip md:rounded-2xl relative'
                >
                  <Image
                    unoptimized
                    src={URL.createObjectURL(image)}
                    fill
                    alt={image.name}
                    className='w-28 h-28 object-cover'
                  />
                  <Button
                    size='sm'
                    radius='full'
                    isIconOnly
                    id={index.toString()}
                    onPress={showModalHandler(image)}
                    className='absolute left-1 top-1 dark:bg-black/50 backdrop-blur-lg'
                  >
                    <PiArrowCounterClockwiseBold size={16} />
                  </Button>
                  <Button
                    size='sm'
                    radius='full'
                    isIconOnly
                    id={index.toString()}
                    onPress={handleDeleteFile}
                    className='absolute right-1 top-1 dark:bg-black/50 backdrop-blur-lg'
                  >
                    <PiXBold size={16} />
                  </Button>
                </div>
              );
            })}
          {(!value || value?.length < 10) && (
            <button
              type='button'
              aria-label='Add image'
              className='w-full aspect-square bg-[--element] rounded-lg md:rounded-2xl flex items-center justify-center'
              onClick={handleOpenInput}
            >
              <PiPlusCircleBold size={32} className='opacity-50' />
            </button>
          )}
        </div>

        <AnimatePresence>
          {form?.errors[title] && (
            <NotificationBubble type='error'>
              {t(`errors.${form.errors[title]}`)}
            </NotificationBubble>
          )}
        </AnimatePresence>

        <input
          type='file'
          accept='image/*'
          multiple
          className='hidden'
          onChange={handleInputChange}
          ref={fileInputRef}
        />
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.form?.fields[prevProps.title] ===
    nextProps.form?.fields[prevProps.title],
);
