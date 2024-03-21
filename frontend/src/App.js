import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoanApplicationForm from './components/LoanApplicationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/apply" element={<LoanApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
