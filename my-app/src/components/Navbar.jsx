import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const Navbar = ({ onThemeToggle, isDarkMode }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              PLP Task Manager
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'primary' : 'outline'} 
                size="small"
              >
                Home
              </Button>
            </Link>
            <Link to="/tasks">
              <Button 
                variant={isActive('/tasks') ? 'primary' : 'outline'} 
                size="small"
              >
                Tasks
              </Button>
            </Link>
            <Link to="/api-data">
              <Button 
                variant={isActive('/api-data') ? 'primary' : 'outline'} 
                size="small"
              >
                API Data
              </Button>
            </Link>
            
            <Button
              variant="outline"
              size="small"
              onClick={onThemeToggle}
              className="flex items-center gap-2"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;