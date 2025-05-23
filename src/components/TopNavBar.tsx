import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, UserCircle2 } from 'lucide-react';

const TopNavBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
    if (location.pathname !== '/') navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex items-center px-4 py-2">
      {/* Logo */}
      <Link to="/" className="flex items-center mr-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="Logo" className="h-6 w-auto mr-2" />
        <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">YouTube</span>
      </Link>
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex-1 flex items-center max-w-xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search"
          className="w-full px-4 py-1.5 rounded-l-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
        />
        <button type="submit" className="px-4 py-1.5 rounded-r-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-t border-b border-r border-gray-300 dark:border-gray-700">
          <Search size={18} />
        </button>
      </form>
      {/* User Avatar */}
      <div className="ml-4">
        <UserCircle2 size={32} className="text-gray-400 dark:text-gray-600" />
      </div>
    </header>
  );
};

export default TopNavBar; 