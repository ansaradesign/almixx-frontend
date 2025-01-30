'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getGeolocation } from '@albomoni/shared/api/get-geolocation';
import { googleGeosuggest } from '@albomoni/shared/api/get-google-geosuggest';
import { getCookie, setCookie } from 'cookies-next';
import { saveLocation } from '@albomoni/shared/api/save-location';
import { TLocation } from '@albomoni/shared/model/types/location.type';
import { useSession } from '../../hooks/use-session';
import { useModal } from '../modal/lib/use-modal';
import { EModalStates } from '../modal/model/modal-states.enum';
import { parseLocation } from '../../utils/parse-location';

type Props = {
  children: ReactNode;
};

const initialLocation = {
  address: 'Весь мир',
  city: 'Весь мир',
  country: 'Весь мир',
  country_code: '',
  lat: 0,
  lon: 0,
};

const LocationContext = createContext(initialLocation);

export const LocationProvider = ({ children }: Props) => {
  const cookieLocation = getCookie('location');
  const [locationState, setLocationState] = useState<TLocation>(
    cookieLocation ? JSON.parse(cookieLocation) : initialLocation,
  );
  const { user, isPending } = useSession();
  const token = getCookie('token');

  const { setModalState } = useModal();
  const userLocation = user?.address;
  useEffect(() => {
    if (!cookieLocation && !isPending) {
      const getGeo = async () => {
        try {
          const resp = await getGeolocation();

          const resp2 = await googleGeosuggest(
            resp.latitude.toString(),
            resp.longitude.toString(),
          );

          const location = parseLocation(resp2.results[0]);

          if (token) {
            try {
              await saveLocation(location, token);
            } catch {
              return;
            }
          }

          setCookie('location', location);
          console.log(location);
          setLocationState(location);
          setModalState(EModalStates.LOCATION);
        } catch {
          return;
        }
      };
      if (userLocation) {
        const { address, city, country, country_code, lat, lon } = user;
        const location = { address, city, country, country_code, lat, lon };
        setLocationState(location);
        setCookie('location', location);
      } else {
        getGeo();
      }
    }
  }, [isPending]);

  return (
    <LocationContext.Provider value={locationState}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
