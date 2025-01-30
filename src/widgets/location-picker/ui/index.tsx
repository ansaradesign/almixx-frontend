'use client';

import { useLocalStorage } from 'react-use';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Map } from '@albomoni/entities/map';
import { useState } from 'react';
import { TGoogleSuggestion } from '@albomoni/entities/map/model/google-suggestion.type';
import { parseLocation } from '@albomoni/shared/lib/utils/parse-location';
import { saveLocation } from '@albomoni/shared/api/save-location';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';

export const LocationPicker = () => {
  const token = getCookie('token');
  const [backPage, , deleteBackPage] = useLocalStorage<string>('back-page');
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<TGoogleSuggestion>();
  const cookieLocation = getLocation();

  const handleSave = async () => {
    if (selectedVariant) {
      const location = parseLocation(selectedVariant);

      if (token) {
        await saveLocation(location, token);
      }

      setCookie('location', location);

      if (backPage) {
        router.push(backPage);
        deleteBackPage();
      } else {
        router.push('/');
      }
    }
  };

  return (
    <>
      <div className='w-full flex flex-col gap-6 lg:w-1/2'>
        <p className='opacity-50 font-medium -mb-3'>Выберите город и страну</p>
      </div>
      <div className='w-full flex flex-col gap-4 -mt-2'>
        <Map
          initialLocation={cookieLocation}
          setSelectedVariant={setSelectedVariant}
          onSave={handleSave}
        />
      </div>
    </>
  );
};
