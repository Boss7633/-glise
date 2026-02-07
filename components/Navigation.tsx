
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
    { id: Page.ABOUT, label: lang === 'fr' ? 'Vision' : 'Vision' },
    { id: Page.CALENDAR, label: lang === 'fr' ? 'Horaires' : 'Schedule' },
    { id: Page.SERMONS, label: lang === 'fr' ? 'Enseignements' : 'Sermons' },
    { id: Page.GALLERY, label: lang === 'fr' ? 'Photos' : 'Photos' },
    { id: Page.CONTACT, label: lang === 'fr' ? 'Contact' : 'Contact' },
    { id: Page.DONATE, label: lang === 'fr' ? 'Donner' : 'Give' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-slate-100 h-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => onNavigate(Page.HOME)}
        >
          <div className="w-10 h-10 bg-indigo-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 group-hover:bg-indigo-600 transition-all rotate-3 group-hover:rotate-0">
            B
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black text-lg text-slate-900 leading-none">
              Baptiste Authentique
            </span>
            <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mt-0.5">Man, Côte d'Ivoire</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                currentPage === item.id 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="ml-6 flex items-center space-x-4 pl-6 border-l border-slate-100">
            {user ? (
              <button 
                onClick={onLogout}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md"
              >
                {lang === 'fr' ? 'Déconnexion' : 'Logout'}
              </button>
            ) : (
              <button 
                onClick={() => onNavigate(Page.LOGIN)}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                {lang === 'fr' ? 'Connexion' : 'Join Us'}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          {!user && (
            <button 
              onClick={() => onNavigate(Page.LOGIN)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest"
            >
              {lang === 'fr' ? 'Inscrire' : 'Join'}
            </button>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-900"
          >
            <div className="w-6 flex flex-col gap-1.5 items-end">
              <span className={`h-0.5 bg-current transition-all ${isMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`}></span>
              <span className={`h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
              <span className={`h-0.5 bg-current transition-all ${isMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-16 bg-white z-[90] lg:hidden transition-all duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-8 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMenuOpen(false);
              }}
              className={`w-full text-left py-4 px-6 rounded-2xl text-lg font-bold transition-all ${
                currentPage === item.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          {user && (
            <button
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left py-4 px-6 rounded-2xl text-rose-600 font-bold border-2 border-rose-50 mt-4"
            >
              {lang === 'fr' ? 'Déconnexion' : 'Sign Out'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
