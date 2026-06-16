import { createContext, useContext, useState } from 'react';
import { translations } from '../data/translations';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState('de');
  const t = translations[lang];
  const toggle = () => setLang(prev => prev === 'de' ? 'en' : 'de');
  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
