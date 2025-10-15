'use client';

import { editUserField } from '@albomoni/shared/lib/providers/modal/api/(edit-user)/edit-user-field';
import { RichTextEditor } from '@albomoni/shared/ui/(inputs)/rich-text-editor';
import DraftJsRenderer from '@albomoni/shared/ui/draft-js-render/ui';
import { Button } from '@nextui-org/react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const EditDescription = ({ description }: { description: string }) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const [desc, setDesc] = useState('');
  useEffect(() => {
    if (description) {
      try {
        if (JSON.parse(description).blocks[0].text.length) {
          setDesc(description);
        } else {
          setDesc('');
        }
      } catch (error) {
        setDesc(description);
      }
    }
  }, [description]);
  const handleSave = async () => {
    try {
      const token = getCookie('token');
      await editUserField({ description: desc }, token as string);
      setIsEdit(false);
      router.refresh();
    } catch (error) {
      return;
    }
  };
  return (
    <div className='w-full flex flex-col gap-2'>
      <h3 className='opacity-50 font-medium'>Описание</h3>
      {isEdit ? (
        <div className='w-full gap-4 flex flex-col'>
          <RichTextEditor value={desc} onChange={setDesc} />
          <Button
            onPress={handleSave}
            className='w-full'
            color='primary'
            variant='shadow'
          >
            Сохранить
          </Button>
        </div>
      ) : (
        <div className='w-full flex gap-4 flex-col'>
          {desc.trim().length ? (
            <>
              <DraftJsRenderer value={desc} />
              <Button
                onPress={() => setIsEdit(true)}
                color='primary'
                variant='shadow'
              >
                Редактировать описание
              </Button>
            </>
          ) : (
            <Button
              onPress={() => setIsEdit(true)}
              color='primary'
              variant='shadow'
            >
              Добавить описание
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
