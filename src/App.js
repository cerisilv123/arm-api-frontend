import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';

import './App.css';
import AppLayout from './components/AppLayout';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';

// Registering Syncfusion license key
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx0TXxbf1x0ZFRGalhXTnRaUiweQnxTdEFjXX1fcXRRQGJZWEN2Xg==');

const TestPage = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page to demonstrate the concept of routing with different sidebar states.</p>
    </div>
  );
};

function App() {
  return (
    <Router>
        <div>
          <Routes>
            <Route 
                  path="/upload" 
                  element={<AppLayout isSidebarExpanded={true}><UploadPage /></AppLayout>}
            />       
            <Route 
                  path="/results" 
                  element={<AppLayout isSidebarExpanded={true}><ResultsPage /></AppLayout>}
            />        
          </Routes>
        </div>
    </Router>
  );
}

export default App;
