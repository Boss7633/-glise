
import React, { useState, useEffect } from 'react';
import { Page, User } from './types';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Calendar from './components/Calendar';
import Sermons from './components/Sermons';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Donate from './components/Donate';
import SpiritualAssistant from './components/SpiritualAssistant';
import Auth from './components/Auth';
import { supabase } from './services/supabase';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Session check in background - No blocker
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata.full_name || 'Fidèle',
          });
        }
      } catch (e) {
        console.error("Auth init error:", e);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata.full_name || 'Fidèle',
        });
        if (currentPage === Page.LOGIN) setCurrentPage(Page.HOME);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [currentPage]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage(Page.HOME);
  };

  const renderPage = () => {
    if (currentPage === Page.LOGIN) {
      return <Auth lang={lang} onSuccess={() => setCurrentPage(Page.HOME)} />;
    }

    switch (currentPage) {
      case Page.HOME: return <Home onNavigate={setCurrentPage} lang={lang} />;
      case Page.ABOUT: return <About lang={lang} />;
      case Page.CALENDAR: return <Calendar lang={lang} />;
      case Page.SERMONS: return <Sermons lang={lang} />;
      case Page.GALLERY: return <Gallery lang={lang} />;
      case Page.CONTACT: return <Contact lang={lang} />;
      case Page.DONATE: return <Donate lang={lang} />;
      default: return <Home onNavigate={setCurrentPage} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        lang={lang}
        setLang={setLang}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow pt-16">
        {/* Bandeau de bienvenue V2 visible par tous */}
        <div className="bg-indigo-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-indigo-600/20 translate-x-1/2 -skew-x-12"></div>
          <div className="max-w-7xl mx-auto py-2 px-6 flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold relative z-10">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>{lang === 'fr' ? 'Version Web Officielle 2.0.1 - Direct' : 'Official Web Version 2.0.1 - Direct'}</span>
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-amber-400">{lang === 'fr' ? `Compte : ${user.name}` : `Account: ${user.name}`}</span>
                <button onClick={handleLogout} className="hover:text-amber-400 transition-colors">[{lang === 'fr' ? 'Quitter' : 'Exit'}]</button>
              </div>
            )}
          </div>
        </div>

        {renderPage()}
      </main>

      <footer className="bg-slate-950 text-white py-16 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-serif font-black text-white mb-2 tracking-tighter uppercase italic">Baptiste Authentique</h3>
              <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase">Étoile de Man, Tonkpi</p>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setCurrentPage(Page.CONTACT)} className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Contact</button>
              <button onClick={() => setCurrentPage(Page.DONATE)} className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Faire un don</button>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between text-[10px] text-slate-600 uppercase tracking-widest font-bold">
            <p>© 2024 Baptiste Authentique de MAN. Tous droits réservés.</p>
            <p>Conçu pour la gloire de Dieu</p>
          </div>
        </div>
      </footer>

      <SpiritualAssistant lang={lang} />
    </div>
  );
};

export default App;
