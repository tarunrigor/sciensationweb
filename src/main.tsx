import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { Journal } from '@/src/components/Journal';
import { Grids } from '@/src/components/Grids';
import { Fellowship } from '@/src/components/Fellowship';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/grids" element={<Grids />} />
        <Route path="/fellowship" element={<Fellowship />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
