import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DrugSearchPage from './pages/DrugSearchPage';
import DrugDetailsPage from './pages/DrugDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/drugs/search" />} />
        <Route path="/drugs/search" element={<DrugSearchPage />} />
        <Route path="/drugs/:drugName" element={<DrugDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
