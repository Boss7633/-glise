
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
      try {
        const verse = await getDailyVerse(lang);
        setDailyVerse(verse);
      } catch (e) {
        setDailyVerse(lang === 'fr' ? 'Psaume 23:1' : 'Psalm 23:1');
      } finally {
        setLoadingVerse(false);
      }
    };
    fetchVerse();
  }, [lang]);

  return (
    <div className="animate-fade-in">
      {/* Hero V2.1 */}
      <section className="relative min-h-[85vh] flex items-center px-6 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=85" 
            alt="Eglise Man" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-500 text-indigo-900 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl animate-bounce">
              <span>● {lang === 'fr' ? 'Nouveau Site En Ligne' : 'New Website Live'}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-black text-white leading-[0.9] tracking-tighter">
              {lang === 'fr' 
                ? "L'Authentique à Man" 
                : "Authentic in Man"}
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 font-medium max-w-xl leading-relaxed">
              {lang === 'fr'
                ? "Une église ancrée dans la Parole de Dieu, située au cœur des 18 montagnes. Bienvenue dans votre nouvelle maison spirituelle."
                : "A church rooted in God's Word, located in the heart of the 18 mountains. Welcome to your new spiritual home."}
            </p>
            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => onNavigate(Page.CALENDAR)}
                className="px-10 py-5 bg-white text-indigo-900 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
              >
                {lang === 'fr' ? "Nos Cultes" : "Services"}
              </button>
              <button 
                onClick={() => onNavigate(Page.SERMONS)}
                className="px-10 py-5 border-2 border-white/20 text-white backdrop-blur-xl rounded-2xl font-black text-lg transition-all hover:bg-white/10"
              >
                {lang === 'fr' ? "Replays" : "Watch Replay"}
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 shadow-2xl relative">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-indigo-950 font-black rotate-12 shadow-xl">
                LIVE
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="w-12 h-12 bg-indigo-500/30 rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{lang === 'fr' ? "Prochain Direct" : "Next Live"}</h4>
                    <p className="text-indigo-300 text-sm font-medium">{lang === 'fr' ? "Dimanche à 08h00" : "Sunday at 08:00 AM"}</p>
                  </div>
                </div>
                <div className="p-6 bg-indigo-950/50 rounded-3xl border border-indigo-500/20">
                  <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">{lang === 'fr' ? 'Méditation du moment' : 'Current Meditation'}</span>
                  <p className="text-white font-serif italic text-lg mt-2">
                    {loadingVerse ? '...' : `"${dailyVerse}"`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid d'action rapide */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: lang === 'fr' ? 'Horaires' : 'Schedules', 
              icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
              color: 'bg-indigo-100 text-indigo-700',
              desc: lang === 'fr' ? 'Retrouvez tous nos rendez-vous de la semaine.' : 'Find all our appointments for the week.'
            },
            { 
              title: lang === 'fr' ? 'Sermons' : 'Sermons', 
              icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
              color: 'bg-amber-100 text-amber-700',
              desc: lang === 'fr' ? 'Écoutez la Parole de Dieu en replay.' : 'Listen to God\'s Word on replay.'
            },
            { 
              title: lang === 'fr' ? 'Donner' : 'Donations', 
              icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
              color: 'bg-emerald-100 text-emerald-700',
              desc: lang === 'fr' ? 'Soutenez l\'œuvre de Dieu à Man.' : 'Support God\'s work in Man.'
            }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer group">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 font-medium mb-8">{item.desc}</p>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <span>{lang === 'fr' ? 'Explorer' : 'Explore'}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Nouveau Membre */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-indigo-600 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/20 -skew-x-12 translate-x-1/4"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-6xl font-serif font-black mb-6">
                {lang === 'fr' ? "Prêt à nous rejoindre ?" : "Ready to join us?"}
              </h2>
              <p className="text-xl text-indigo-100 font-medium mb-10 leading-relaxed">
                {lang === 'fr' 
                  ? "Inscrivez-vous pour accéder à votre espace fidèle, recevoir les nouvelles et participer activement à la vie de l'église." 
                  : "Sign up to access your member area, receive news, and actively participate in church life."}
              </p>
              <button 
                onClick={() => onNavigate(Page.LOGIN)}
                className="px-12 py-5 bg-amber-500 text-indigo-900 rounded-2xl font-black text-xl shadow-xl shadow-amber-500/30 hover:scale-105 transition-all"
              >
                {lang === 'fr' ? "Créer un compte" : "Create Account"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3">
                 <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80" alt="Church Family" className="w-full h-full object-cover" />
               </div>
               <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl -rotate-6 translate-y-8">
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Worship" className="w-full h-full object-cover" />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
