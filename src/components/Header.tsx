import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, Search, User, Bell, X, Youtube, 
  Settings, Cast, Mic
} from 'lucide-react';
import { useMindful } from '../context/MindfulContext';

const Header: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { isMindfulModeEnabled, toggleMindfulMode } = useMindful();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-[#0f0f0f] z-10 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo and menu */}
        <div className={`flex items-center space-x-4 transition-all duration-300 ${isSearchActive ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Menu size={20} className="text-gray-700 dark:text-gray-200" />
          </button>
          <Link to="/" className="flex items-center group">
            <Youtube size={24} className="text-red-600 transition-transform group-hover:scale-110" />
            <span className="ml-1 font-semibold text-gray-900 dark:text-white">YouTube</span>
          </Link>
        </div>

        {/* Search bar */}
        <div className={`flex items-center flex-1 mx-2 transition-all duration-300 ${isSearchActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute left-0 right-0'}`}>
          <button 
            onClick={() => setIsSearchActive(false)}
            className="p-2 mr-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 focus-within:ring-2 ring-blue-500 transition-all">
            <Search size={18} className="text-gray-500 mr-3" />
            <input 
              type="text" 
              placeholder="Search YouTube" 
              className="bg-transparent w-full focus:outline-none text-gray-900 dark:text-white text-base"
            />
            <button className="ml-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Mic size={18} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Right side icons */}
        <div className={`flex items-center space-x-1 transition-all duration-300 ${isSearchActive ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Cast size={20} className="text-gray-700 dark:text-gray-200" />
          </button>
          <button className="p-2 relative group">
            <Settings size={20} className="text-gray-700 dark:text-gray-200 transition-transform group-hover:rotate-45" />
            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
              <div className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                <div className="flex items-center justify-between">
                  <span>Mindful Mode</span>
                  <button 
                    onClick={toggleMindfulMode}
                    className={`w-10 h-5 rounded-full transition-all duration-300 flex items-center p-0.5 ${isMindfulModeEnabled ? 'bg-blue-500 justify-end' : 'bg-gray-300 dark:bg-gray-600'}`}
                  >
                    <span className="block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Bell size={20} className="text-gray-700 dark:text-gray-200" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <User size={20} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;