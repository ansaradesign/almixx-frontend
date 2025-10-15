import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { createContext, useContext, useState } from 'react';
import { useEffectOnce } from 'react-use';

const CurrenciesContext = createContext({});

type Props = {
  children: React.ReactNode;
};

export const CurrenciesProvider = ({ children }: Props) => {
  const [currencies, setCurrencies] = useState({});

  useEffectOnce(() => {
    const getCurrencies = async () => {
      const actualCurrencies = await getCurrenciesAsync();
      setCurrencies(actualCurrencies);
    };

    try {
      getCurrencies();
    } catch {
      return;
    }
  });

  return (
    <CurrenciesContext.Provider value={currencies}>
      {children}
    </CurrenciesContext.Provider>
  );
};

export const useCurrencies = () => useContext(CurrenciesContext);
