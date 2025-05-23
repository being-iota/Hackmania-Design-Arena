import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import BottomNav from './BottomNav';
import SessionTimer from './mindful/SessionTimer';
import { useMindful } from '../context/MindfulContext';
import BreatherOverlay from './mindful/BreatherOverlay';

const Layout: React.FC = () => {
  const { isMindfulModeEnabled, shouldShowBreather } = useMindful();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] dark:bg-[#0f0f0f] transition-colors duration-300">
      <TopNavBar onSearch={setSearchQuery} />
      {/* Session timer with fade animation */}
      <div className={`transition-opacity duration-300 ${isMindfulModeEnabled ? 'opacity-100' : 'opacity-0'}`}>
        {isMindfulModeEnabled && <SessionTimer />}
      </div>
      <main className="flex-1 pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="animate-fadeIn">
          {/* Pass searchQuery to Home page only */}
          {location.pathname === '/' ? <Outlet context={{ searchQuery }} /> : <Outlet />}
        </div>
      </main>
      <BottomNav />
      {/* Breather overlay with slide animation */}
      <div className={`fixed inset-0 transition-transform duration-500 ease-in-out ${shouldShowBreather ? 'translate-y-0' : 'translate-y-full'}`}>
        {shouldShowBreather && <BreatherOverlay />}
      </div>
    </div>
  );
};

export default Layout;