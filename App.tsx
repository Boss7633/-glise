
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
  const [newsEmail, setNewsEmail] = useState('');
  const [newsStatus, setNewsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // On essaie de récupérer la session mais on ne bloque pas plus de 1.5s
    const initTimer = setTimeout(() => setIsInitializing(false), 1500);

    const checkUser = async () => {
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
        console.error("Auth check failed", e);
      } finally {
        setIsInitializing(false);
        clearTimeout(initTimer);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata.full_name || 'Fidèle',
        });
      } else {
        setUser(null);
      }
      setIsInitializing(false);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(initTimer);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setNewsStatus('loading');
    try {
      const { error } = await supabase.from('newsletter_subscriptions').insert([{ email: newsEmail }]);
      if (error) throw error;
      setNewsStatus('success');
      setNewsEmail('');
    } catch (err) {
      setNewsStatus('error');
    }
    setTimeout(() => setNewsStatus('idle'), 5000);
  };

  // On affiche un chargement très bref
  if (isInitializing && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Si pas d'utilisateur après l'init, on montre Auth
  if (!user) {
    return <Auth lang={lang} />;
  }

  const renderPage = () => {
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
      />
      
      <main className="flex-grow pt-16">
        <div className="bg-amber-400 py-1.5 px-6 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-indigo-900">
          <span>{lang === 'fr' ? `Fidèle: ${user.name}` : `Member: ${user.name}`}</span>
          <button onClick={handleLogout} className="hover:underline">{lang === 'fr' ? 'Déconnexion' : 'Logout'}</button>
        </div>
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
