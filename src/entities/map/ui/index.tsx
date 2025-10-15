import { useCallback, useState } from 'react';
import {
  LoadScript,
  Autocomplete,
  GoogleMap,
  Marker,
  Libraries as TLibraries,
} from '@react-google-maps/api';
import { m } from 'framer-motion';
import { Input } from '@nextui-org/input';
import { PiFloppyDiskBold, PiMapPinBold } from 'react-icons/pi';
import { TLocation } from '@albomoni/shared/model/types/location.type';
import { TGoogleSuggestion } from '../model/google-suggestion.type';
import { MapSkeleton } from './skeleton';
import { Libraries } from '../config/map-config';

type Props = {
  setSelectedVariant: (variant: TGoogleSuggestion) => void;
  types?: '(cities)' | 'address';
  onSave?: () => void;
  initialLocation?: TLocation;
};

export const Map = ({
  setSelectedVariant,
  types = '(cities)',
  onSave,
  initialLocation,
}: Props) => {
  const initialCoords = {
    lat: initialLocation?.lat || 55.7483,
    lng: initialLocation?.lon || 55.7483,
  };
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [position, setPosition] = useState(initialCoords);
  const [map, setMap] = useState(null);
  const [value, setValue] = useState(initialLocation?.address || '');

  const onLoad = useCallback((autocompleteInstance: any) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setIsEdited(true);
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setPosition({ lat, lng });
        setMap((mapInstance: any) => {
          if (mapInstance) {
            mapInstance.panTo({ lat, lng });
          }
          return mapInstance;
        });
        setValue(place.formatted_address);
        setSelectedVariant(place);
      }
    } else {
      return;
    }
  }, [autocomplete]);

  const onMapLoad = useCallback((mapInstance: any) => {
    setMap(mapInstance);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_URL as string}
      loadingElement={<MapSkeleton onSave={onSave} />}
      libraries={Libraries as TLibraries}
    >
      <Autocomplete
        className='-mt-4 flex items-center'
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          types: [types],
        }}
      >
        <div className='w-full flex gap-4'>
          <Input
            size='lg'
            startContent={<PiMapPinBold size={20} className='opacity-50' />}
            type='text'
            placeholder='Введите адрес'
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            classNames={{ input: 'font-medium' }}
          />
          {onSave && isEdited && (
            <m.button
              type='button'
              onClick={onSave}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className='w-min rounded-[14px] bg-primary flex items-center justify-center text-white flex-shrink-0 font-medium px-4 gap-2'
            >
              <PiFloppyDiskBold size={20} />
              Сохранить
            </m.button>
          )}
        </div>
      </Autocomplete>
      <GoogleMap
        mapContainerClassName='w-full aspect-square md:aspect-video rounded-2xl'
        center={position}
        zoom={12}
        onLoad={onMapLoad}
      >
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};
