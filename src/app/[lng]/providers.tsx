'use client';

import { LanguageProvider } from '@albomoni/shared/lib/providers';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { Provider as StoreProvider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { useState } from 'react';
import { ThemeColorObserver } from '@albomoni/shared/lib/utils/client/theme-color-observer';
import { FavoriteProvider } from '@albomoni/shared/lib/providers/favorite-provider';
import { Modal } from '@albomoni/shared/lib/providers/modal';
import { OriginTracker } from '@albomoni/shared/lib/providers/origin-provider';
import { LocationProvider } from '@albomoni/shared/lib/providers/location-provider';
import { CurrenciesProvider } from '@albomoni/shared/lib/providers/currencies-provider';
import { store } from '../_env/store';

type Props = {
  children: React.ReactNode;
  lang: string;
};

const loadFeatures = () =>
  import('@albomoni/shared/model/dom-max').then((res) => res.domMax);

const Providers = ({ children, lang }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <QueryClientProvider client={queryClient}>
        <StoreProvider store={store}>
          <CurrenciesProvider>
            <FavoriteProvider>
              <OriginTracker>
                <LazyMotion features={loadFeatures}>
                  <NextUIProvider>
                    <ThemeProvider attribute='class'>
                      <ThemeColorObserver>
                        <LanguageProvider lang={lang}>
                          <LocationProvider>
                            <Modal />
                            {children}
                          </LocationProvider>
                        </LanguageProvider>
                      </ThemeColorObserver>
                    </ThemeProvider>
                  </NextUIProvider>
                </LazyMotion>
              </OriginTracker>
            </FavoriteProvider>
          </CurrenciesProvider>
        </StoreProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default Providers;
