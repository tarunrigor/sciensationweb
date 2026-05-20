import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { Journal } from '@/src/components/Journal';
import { Grids } from '@/src/components/Grids';
import { Fellowship } from '@/src/components/Fellowship';
import { Identity } from '@/src/components/Identity';
import en from '@/src/components/identity/en';
import te from '@/src/components/identity/te';
import hi from '@/src/components/identity/hi';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/grids" element={<Grids />} />
        <Route path="/fellowship" element={<Fellowship />} />
        <Route path="/identity" element={<Identity locale={en} />} />
        <Route path="/identitytelugu" element={<Identity locale={te} />} />
        <Route path="/identityhindi" element={<Identity locale={hi} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
