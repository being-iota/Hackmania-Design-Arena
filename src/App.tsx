import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MindfulProvider } from './context/MindfulContext';
import Layout from './components/Layout';
import SmartSessionTracker from './components/mindful/SmartSessionTracker';
import Home from './pages/Home';
import Watch from './pages/Watch';

function App() {
  return (
    <Router>
      <MindfulProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <SmartSessionTracker />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="watch" element={<Watch />} />
            </Route>
          </Routes>
        </div>
      </MindfulProvider>
    </Router>
  );
}

export default App;