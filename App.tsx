
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
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Vérifier la session actuelle
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata.full_name || 'Fidèle',
          });
        }
      } catch (err) {
        console.error("Erreur initialisation Auth:", err);
      } finally {
        setIsAuthReady(true);
      }
    };

    initAuth();

    // Écouter les changements d'auth
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
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [currentPage]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    
    setNewsStatus('loading');
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: newsEmail }]);

      if (error) throw error;
      setNewsStatus('success');
      setNewsEmail('');
    } catch (err) {
      setNewsStatus('error');
    }
    setTimeout(() => setNewsStatus('idle'), 5000);
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-950 text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-amber-500 rounded-xl mb-4"></div>
          <p className="text-sm font-bold tracking-widest uppercase">Connexion au temple...</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900 bg-white">
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
          <span>
            {lang === 'fr' ? `Bienvenue, ${user.name}` : `Welcome, ${user.name}`}
          </span>
          <button 
            onClick={handleLogout}
            className="hover:underline"
          >
            {lang === 'fr' ? 'Se déconnecter' : 'Logout'}
          </button>
        </div>

        {renderPage()}
      </main>

      <section className="bg-indigo-900 py-16 px-6 text-white overflow-hidden relative">
         <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-serif font-bold mb-4">
                {lang === 'fr' ? "Restez Connectés" : "Stay Connected"}
              </h3>
              <p className="text-indigo-200">
                {lang === 'fr' 
                  ? "Recevez nos dernières annonces, sermons et événements directement dans votre boîte mail." 
                  : "Receive our latest announcements, sermons, and events directly in your inbox."}
              </p>
            </div>
            <div className="md:w-1/2 w-full">
              {newsStatus === 'success' ? (
                <div className="bg-emerald-500 p-4 rounded-xl text-white font-bold animate-bounce text-center">
                  {lang === 'fr' ? "Inscription réussie !" : "Successfully subscribed!"}
                </div>
              ) : (
                <form onSubmit={handleNewsSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    required
                    type="email" 
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="email@exemple.ci" 
                    className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button 
                    type="submit" 
                    disabled={newsStatus === 'loading'}
                    className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-indigo-900 rounded-full font-bold transition-all shadow-lg disabled:opacity-50"
                  >
                    {newsStatus === 'loading' ? '...' : (lang === 'fr' ? "S'abonner" : "Subscribe")}
                  </button>
                </form>
              )}
              {newsStatus === 'error' && (
                <p className="text-rose-400 text-xs mt-2 text-center">
                  {lang === 'fr' ? "Une erreur est survenue." : "An error occurred."}
                </p>
              )}
            </div>
         </div>
      </section>

      <footer className="bg-slate-950 text-white py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-amber-500 mb-6 uppercase tracking-wider">Baptiste<br/>Authentique</h3>
            <p className="text-slate-400 leading-relaxed">
              {lang === 'fr' 
                ? "Une église fondée sur le roc de la Parole de Dieu à Man."
                : "A church founded on the rock of God's Word in Man."}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-200">{lang === 'fr' ? "Explorer" : "Explore"}</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button onClick={() => setCurrentPage(Page.HOME)} className="hover:text-amber-500 transition-colors">{lang === 'fr' ? "Accueil" : "Home"}</button></li>
              <li><button onClick={() => setCurrentPage(Page.ABOUT)} className="hover:text-amber-500 transition-colors">{lang === 'fr' ? "À propos" : "About"}</button></li>
              <li><button onClick={() => setCurrentPage(Page.CALENDAR)} className="hover:text-amber-500 transition-colors">{lang === 'fr' ? "Événements" : "Events"}</button></li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-lg mb-6 text-slate-200">Contact</h4>
             <p className="text-slate-400">Quartier Commerce, Man</p>
             <p className="text-slate-400">info@baptiste-man.ci</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-200">Social</h4>
            <div className="flex space-x-4">
               <div className="w-8 h-8 rounded-full bg-slate-800"></div>
               <div className="w-8 h-8 rounded-full bg-slate-800"></div>
            </div>
          </div>
        </div>
      </footer>

      <SpiritualAssistant lang={lang} />
    </div>
  );
};

export default App;
