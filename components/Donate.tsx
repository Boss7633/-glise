
import React from 'react';

interface DonateProps {
  lang: 'fr' | 'en';
}

const Donate: React.FC<DonateProps> = ({ lang }) => {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-indigo-900 mb-6">
          {lang === 'fr' ? "Soutenir notre Mission" : "Support our Mission"}
        </h1>
        <p className="text-slate-600 text-lg">
          {lang === 'fr'
            ? "Votre générosité nous permet de continuer l'œuvre du Seigneur, de soutenir les plus démunis et de maintenir nos programmes spirituels à Abidjan."
            : "Your generosity allows us to continue the work of the Lord, support the needy, and maintain our spiritual programs in Abidjan."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Orange-logo.svg/1024px-Orange-logo.svg.png" className="w-10 h-10 object-contain" alt="Orange Money" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Orange Money</h3>
          <p className="text-slate-500 mb-8 flex-grow">
            {lang === 'fr' ? "Faites un don instantané via votre compte Orange Money." : "Make an instant donation via your Orange Money account."}
          </p>
          <button className="w-full py-3 bg-[#FF7900] text-white rounded-xl font-bold hover:opacity-90 transition-all">
            {lang === 'fr' ? "Faire un don" : "Donate Now"}
          </button>
        </div>

        <div className="bg-indigo-900 p-10 rounded-3xl shadow-2xl text-white flex flex-col items-center text-center transform scale-105">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
             <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Virement Bancaire</h3>
          <p className="text-indigo-200 mb-8 flex-grow">
            {lang === 'fr' ? "Idéal pour les dons réguliers et la dîme." : "Ideal for regular donations and tithing."}
          </p>
          <div className="bg-white/10 p-4 rounded-xl text-left w-full mb-6">
            <p className="text-xs text-indigo-300 uppercase font-bold mb-1">RIB Abidjan</p>
            <p className="font-mono text-sm">CI000 01001 0123456789 01</p>
          </div>
          <button className="w-full py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-all">
            {lang === 'fr' ? "Télécharger le RIB" : "Download Bank Details"}
          </button>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="w-10 h-10 object-contain" alt="PayPal" />
          </div>
          <h3 className="text-2xl font-bold mb-4">PayPal / Diaspora</h3>
          <p className="text-slate-500 mb-8 flex-grow">
            {lang === 'fr' ? "Soutenez-nous depuis l'international en toute sécurité." : "Support us internationally with full security."}
          </p>
          <button className="w-full py-3 bg-[#003087] text-white rounded-xl font-bold hover:opacity-90 transition-all">
            {lang === 'fr' ? "Payer via PayPal" : "Pay via PayPal"}
          </button>
        </div>
      </div>

      <div className="bg-slate-100 rounded-3xl p-10 text-center italic text-slate-600">
        {lang === 'fr' 
          ? "\"Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte; car Dieu aime celui qui donne avec joie.\" - 2 Corinthiens 9:7" 
          : "\"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.\" - 2 Corinthians 9:7"}
      </div>
    </div>
  );
};

export default Donate;
