'use client';

import { LangProvider } from '../src/context/LangContext';
import Navbar from '../src/components/Navbar';
import Preloader from '../src/components/Preloader';
import CustomCursor from '../src/components/CustomCursor';

export default function ClientShell({ children }) {
  return (
    <LangProvider>
      <Preloader />
      <CustomCursor />
      <Navbar />
      {children}
    </LangProvider>
  );
}
