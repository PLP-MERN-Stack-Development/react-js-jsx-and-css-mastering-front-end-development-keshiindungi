import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              PLP Task Manager
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              A modern task management application built with React and Tailwind CSS.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-600 dark:text-gray-300 hover:text-blue-500">
                Home
              </Link>
              <Link to="/tasks" className="block text-gray-600 dark:text-gray-300 hover:text-blue-500">
                Task Manager
              </Link>
              <Link to="/api-data" className="block text-gray-600 dark:text-gray-300 hover:text-blue-500">
                API Data
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
              Connect
            </h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-blue-500">
                GitHub
              </a>
              <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-blue-500">
                Documentation
              </a>
              <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-blue-500">
                Support
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} PLP Task Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;