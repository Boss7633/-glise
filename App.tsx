
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
    // Vérification de la session en arrière-plan sans bloquer l'affichage
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata.full_name || 'Fidèle',
        });
      }
    };

    checkSession();

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
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-amber-100 selection:text-amber-900">
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
        {user && (
          <div className="bg-amber-400 py-1.5 px-6 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-indigo-900">
            <span>{lang === 'fr' ? `Espace Fidèle: ${user.name}` : `Member Area: ${user.name}`}</span>
            <button onClick={handleLogout} className="hover:underline">{lang === 'fr' ? 'Déconnexion' : 'Logout'}</button>
          </div>
        )}
        {renderPage()}
      </main>

      <footer className="bg-slate-950 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-serif font-bold text-amber-500 mb-4 tracking-wider uppercase">Baptiste Authentique de MAN</h3>
          <p className="text-slate-500 text-sm italic">© 2024 - Quartier Commerce, Man, Côte d'Ivoire</p>
        </div>
      </footer>

      <SpiritualAssistant lang={lang} />
    </div>
  );
};

export default App;
