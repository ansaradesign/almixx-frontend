import { createContext, useContext } from 'react';

const LangContext = createContext({});

type Props = {
  children: React.ReactNode;
  lang: string;
};

export const LanguageProvider = ({ children, lang }: Props) => (
  <LangContext.Provider value={lang}>{children}</LangContext.Provider>
);

export const useLangContext = () => useContext(LangContext);
