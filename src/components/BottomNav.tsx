import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Plus, PlaySquare, Library } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Plus, label: 'Create', path: '/create', circle: true },
    { icon: PlaySquare, label: 'Subscriptions', path: '/subscriptions' },
    { icon: Library, label: 'Library', path: '/library' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-[#0f0f0f] border-t border-gray-200 dark:border-gray-800 flex items-center justify-around z-10 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 transition-all duration-300">
      {navItems.map((item, index) => {
        const isActive = currentPath === item.path;
        const IconComponent = item.icon;
        
        return (
          <Link
            key={index}
            to={item.path}
            className={`flex flex-col items-center justify-center py-1 relative group transition-all duration-200 ${
              isActive ? 'text-red-600' : 'text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500'
            }`}
          >
            <div 
              className={`p-1 transition-all duration-200 ${
                item.circle 
                  ? 'bg-red-600 rounded-full hover:bg-red-700 transform hover:scale-110' 
                  : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-800 rounded-lg'
              }`}
            >
              <IconComponent
                size={item.circle ? 20 : 22}
                className={`transition-transform duration-200 ${item.circle ? 'text-white' : 'group-hover:scale-110'}`}
              />
            </div>
            <span className={`text-[10px] mt-1 transition-all duration-200 ${isActive ? 'font-medium' : ''}`}>
              {item.label}
            </span>
            {isActive && (
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;