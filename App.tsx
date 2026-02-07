
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
    // On initialise l'auth en arrière-plan
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata.full_name || 'Fidèle',
        });
      }
    });

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

    return () => subscription.unsubscribe();
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
    <div className="min-h-screen flex flex-col font-sans bg-white">
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
        <div className="bg-indigo-900 text-white relative">
          <div className="max-w-7xl mx-auto py-2 px-6 flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>Site Officiel de l'Église de Man</span>
            </div>
            {user && (
              <button onClick={handleLogout} className="text-amber-400 hover:underline">{user.name} (Quitter)</button>
            )}
          </div>
        </div>

        {renderPage()}
      </main>

      <footer className="bg-slate-950 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-serif font-bold text-white mb-2 uppercase italic">Baptiste Authentique de MAN</h3>
          <p className="text-slate-500 text-[10px] tracking-widest uppercase">© 2024 - Quartier Commerce, Man</p>
        </div>
      </footer>

      <SpiritualAssistant lang={lang} />
    </div>
  );
};

export default App;
