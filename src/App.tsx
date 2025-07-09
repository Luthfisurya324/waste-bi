import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import {
  DashboardPage,
  InputTrukPage,
  PencacahanPage,
  TrukBelumDicacahPage,
  TrukSudahDicacahPage
} from './pages';

// Import components
import { NotificationProvider, ErrorBoundary } from './components/UI';

// Import constants
import { UI_LABELS } from './constants';

function App() {

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/input-truk" element={<InputTrukPage />} />
            <Route path="/pencacahan" element={<PencacahanPage />} />
            <Route path="/truk-belum-dicacah" element={<TrukBelumDicacahPage />} />
            <Route path="/truk-sudah-dicacah" element={<TrukSudahDicacahPage />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
