
import React from 'react';
import { Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  lang: 'fr' | 'en';
  setLang: (l: 'fr' | 'en') => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onNavigate, 
  isMenuOpen, 
  setIsMenuOpen,
  lang,
  setLang
}) => {
  const menuItems = [
    { id: Page.HOME, label: lang === 'fr' ? 'Accueil' : 'Home' },
    { id: Page.ABOUT, label: lang === 'fr' ? 'À propos' : 'About' },
    { id: Page.CALENDAR, label: lang === 'fr' ? 'Calendrier' : 'Calendar' },
    { id: Page.SERMONS, label: lang === 'fr' ? 'Sermons' : 'Sermons' },
    { id: Page.GALLERY, label: lang === 'fr' ? 'Galerie' : 'Gallery' },
    { id: Page.CONTACT, label: lang === 'fr' ? 'Contact' : 'Contact' },
    { id: Page.DONATE, label: lang === 'fr' ? 'Dons' : 'Donate' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-indigo-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer group" 
          onClick={() => onNavigate(Page.HOME)}
        >
          <div className="w-10 h-10 bg-indigo-700 rounded-lg flex items-center justify-center text-amber-400 font-bold text-xl transition-transform group-hover:scale-110">
            B
          </div>
          <span className="font-serif font-bold text-lg md:text-xl text-indigo-900 hidden sm:block">
            Baptiste Authentique de MAN
          </span>
        </div>

        <div className="hidden lg:flex items-center space-x-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                currentPage === item.id 
                  ? 'text-amber-600 bg-amber-50' 
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="ml-4 pl-4 border-l border-slate-200 flex items-center space-x-2">
            <button 
              onClick={() => setLang('fr')}
              className={`text-xs px-2 py-1 rounded ${lang === 'fr' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              FR
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`text-xs px-2 py-1 rounded ${lang === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="lg:hidden flex items-center space-x-4">
          <button 
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="text-xs font-bold text-indigo-600 px-2 py-1 bg-indigo-50 rounded"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-indigo-900 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-indigo-50 animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium ${
                  currentPage === item.id 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
