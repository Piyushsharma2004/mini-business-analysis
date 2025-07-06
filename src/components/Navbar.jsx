import React, { useState } from 'react';
import { Menu, X, Clock } from 'lucide-react';

function Navbar({ currentTime }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GrowthProAI
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">Business Intelligence Dashboard</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#overview" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Overview</a>
            <a href="#analytics" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Analytics</a>
            <a href="#seo" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">SEO Tools</a>
            <a href="#recommendations" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Growth Tips</a>
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{currentTime}</span>
            </div>
          </nav>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 focus:outline-none">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="flex flex-col p-4 space-y-2">
              <a href="#overview" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2">Overview</a>
              <a href="#analytics" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2">Analytics</a>
              <a href="#seo" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2">SEO Tools</a>
              <a href="#recommendations" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2">Growth Tips</a>
              <div className="text-sm text-gray-500 flex items-center space-x-2 py-2">
                <Clock className="w-5 h-5" />
                <span>{currentTime}</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;