import { createContext, useContext } from 'react';

export const FiltersContext = createContext({});

export const useFilters = () => useContext(FiltersContext);
