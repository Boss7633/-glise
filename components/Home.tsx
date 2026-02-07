
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { getDailyVerse } from '../services/geminiService';

interface HomeProps {
  onNavigate: (page: Page) => void;
  lang: 'fr' | 'en';
}

const Home: React.FC<HomeProps> = ({ onNavigate, lang }) => {
  const [dailyVerse, setDailyVerse] = useState<string>('');
  const [loadingVerse, setLoadingVerse] = useState(true);

  useEffect(() => {
    const fetchVerse = async () => {
      const verse = await getDailyVerse(lang);
      setDailyVerse(verse);
      setLoadingVerse(false);
    };
    fetchVerse();
  }, [lang]);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1920&q=80" 
            alt="Eglise Man" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-indigo-900/50 to-indigo-900/80 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 rounded-full text-amber-400 text-sm font-bold tracking-widest uppercase">
            {lang === 'fr' ? "Église Baptiste Authentique de Man" : "Authentic Baptist Church of Man"}
          </div>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-[1.1]">
            {lang === 'fr' 
              ? "Vivre la Vérité, Partager l'Amour" 
              : "Living the Truth, Sharing the Love"}
          </h1>
          <p className="text-xl md:text-3xl text-indigo-50 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
            {lang === 'fr'
              ? "Une communauté chrétienne vibrante au pied des 18 montagnes, dédiée à l'enseignement biblique pur."
              : "A vibrant Christian community at the foot of the 18 mountains, dedicated to pure biblical teaching."}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => onNavigate(Page.CALENDAR)}
              className="px-10 py-5 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold text-xl transition-all shadow-xl shadow-amber-500/20 transform hover:-translate-y-1"
            >
              {lang === 'fr' ? "Horaires des cultes" : "Service Schedule"}
            </button>
            <button 
              onClick={() => onNavigate(Page.ABOUT)}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 rounded-full font-bold text-xl transition-all transform hover:-translate-y-1"
            >
              {lang === 'fr' ? "Notre Vision" : "Our Vision"}
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
           <span className="text-white/50 text-xs uppercase tracking-widest">{lang === 'fr' ? 'Découvrir' : 'Discover'}</span>
           <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
             <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
           </div>
        </div>
      </section>

      {/* Daily Verse Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
             <div className="h-px w-8 bg-amber-500/30"></div>
             <span className="text-amber-600 font-serif italic text-lg">{lang === 'fr' ? "Verset du Jour" : "Verse of the Day"}</span>
             <div className="h-px w-8 bg-amber-500/30"></div>
          </div>
          {loadingVerse ? (
            <div className="h-20 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <p className="text-2xl md:text-3xl font-serif text-slate-800 leading-relaxed italic">
              "{dailyVerse}"
            </p>
          )}
        </div>
      </section>

      {/* Quick Info Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 group hover:bg-indigo-900 transition-all duration-500">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-amber-500 group-hover:text-indigo-900 transition-colors">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4 group-hover:text-white transition-colors">{lang === 'fr' ? "Culte Dominical" : "Sunday Service"}</h3>
            <p className="text-slate-600 mb-6 group-hover:text-indigo-200 transition-colors text-lg">
              {lang === 'fr' 
                ? "Rejoignez-nous chaque dimanche pour une adoration fervente et un enseignement biblique profond." 
                : "Join us every Sunday for fervent worship and deep biblical teaching."}
            </p>
            <span className="text-indigo-600 font-bold text-xl group-hover:text-amber-400 transition-colors italic">08:00 - 10:30 & 11:00 - 13:00</span>
          </div>

          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 group hover:bg-indigo-900 transition-all duration-500">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-8 group-hover:bg-amber-500 group-hover:text-indigo-900 transition-colors">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4 group-hover:text-white transition-colors">{lang === 'fr' ? "Jeunesse" : "Youth Ministry"}</h3>
            <p className="text-slate-600 mb-6 group-hover:text-indigo-200 transition-colors text-lg">
              {lang === 'fr' 
                ? "Une plateforme pour la nouvelle génération afin de découvrir leur but divin." 
                : "A platform for the new generation to discover their divine purpose."}
            </p>
            <span className="text-indigo-600 font-bold text-xl group-hover:text-amber-400 transition-colors italic">{lang === 'fr' ? "Samedis à 15h00" : "Saturdays at 3:00 PM"}</span>
          </div>

          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 group hover:bg-indigo-900 transition-all duration-500">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-amber-500 group-hover:text-indigo-900 transition-colors">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4 group-hover:text-white transition-colors">{lang === 'fr' ? "Étude Biblique" : "Bible Study"}</h3>
            <p className="text-slate-600 mb-6 group-hover:text-indigo-200 transition-colors text-lg">
              {lang === 'fr' 
                ? "Plongez dans les profondeurs de la Parole de Dieu avec notre communauté de Man." 
                : "Dive into the depths of God's Word with our community in Man."}
            </p>
            <span className="text-indigo-600 font-bold text-xl group-hover:text-amber-400 transition-colors italic">{lang === 'fr' ? "Mercredis à 18h30" : "Wednesdays at 6:30 PM"}</span>
          </div>
        </div>
      </section>

      {/* Visual Quote / Call to Action */}
      <section className="relative py-32 px-6 bg-amber-500 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900/10 rounded-full -ml-32 -mb-32 blur-2xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 italic">
             {lang === 'fr' 
               ? "\"Vous connaîtrez la vérité, et la vérité vous affranchira.\"" 
               : "\"You will know the truth, and the truth will set you free.\""}
           </h2>
           <p className="text-amber-100 text-xl font-bold uppercase tracking-widest">— Jean 8:32</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
