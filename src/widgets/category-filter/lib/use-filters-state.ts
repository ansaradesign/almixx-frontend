import { createContext, useContext } from 'react';

export const FiltersStateContext = createContext({});

export const useFiltersState = () => useContext(FiltersStateContext);
