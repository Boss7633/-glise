
import React from 'react';
import { Page, User } from '../types';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  lang: 'fr' | 'en';
  setLang: (l: 'fr' | 'en') => void;
  user: User | null;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onNavigate, 
  isMenuOpen, 
  setIsMenuOpen,
  lang,
  setLang,
  user,
  onLogout
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-indigo-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer group" 
          onClick={() => onNavigate(Page.HOME)}
        >
          <div className="w-9 h-9 bg-indigo-700 rounded-lg flex items-center justify-center text-amber-400 font-bold text-lg transition-transform group-hover:scale-110">
            B
          </div>
          <span className="font-serif font-bold text-lg text-indigo-900 hidden sm:block">
            Baptiste Authentique
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
          
          <div className="ml-4 pl-4 border-l border-slate-200 flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setLang('fr')}
                className={`text-[10px] font-bold px-2 py-1 rounded ${lang === 'fr' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                FR
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`text-[10px] font-bold px-2 py-1 rounded ${lang === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                EN
              </button>
            </div>

            {user ? (
              <button 
                onClick={onLogout}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
              >
                {lang === 'fr' ? 'Déconnexion' : 'Logout'}
              </button>
            ) : (
              <button 
                onClick={() => onNavigate(Page.LOGIN)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-indigo-200"
              >
                {lang === 'fr' ? 'Connexion' : 'Login'}
              </button>
            )}
          </div>
        </div>

        <div className="lg:hidden flex items-center space-x-4">
          {!user && (
             <button 
              onClick={() => onNavigate(Page.LOGIN)}
              className="text-[10px] font-bold text-white px-3 py-1.5 bg-indigo-600 rounded-full uppercase tracking-widest"
            >
              {lang === 'fr' ? 'Connect' : 'Login'}
            </button>
          )}
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
        <div className="lg:hidden bg-white border-b border-indigo-50 animate-fade-in-down max-h-[80vh] overflow-y-auto">
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
            {user && (
              <button
                onClick={onLogout}
                className="block w-full text-left px-3 py-4 text-rose-600 font-bold border-t border-slate-100 mt-2"
              >
                {lang === 'fr' ? 'Déconnexion' : 'Logout'}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
