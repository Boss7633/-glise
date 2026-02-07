
import React from 'react';

interface AboutProps {
  lang: 'fr' | 'en';
}

const About: React.FC<AboutProps> = ({ lang }) => {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-indigo-900 mb-12 text-center">
        {lang === 'fr' ? "Notre Histoire et Vision" : "Our History and Vision"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h2 className="text-3xl font-serif font-bold text-amber-600 mb-6">
            {lang === 'fr' ? "Nos Racines à Man" : "Our Roots in Man"}
          </h2>
          <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
            <p>
              {lang === 'fr' 
                ? "Fondée en 1995 dans la ville de Man, l'Église Baptiste Authentique a commencé comme une mission d'évangélisation dans la région du Tonkpi."
                : "Founded in 1995 in the city of Man, the Authentic Baptist Church began as an evangelism mission in the Tonkpi region."}
            </p>
            <p>
              {lang === 'fr'
                ? "Aujourd'hui, nous sommes un pilier spirituel pour les habitants de Man, portés par le désir de partager l'Évangile et de servir la communauté locale par l'éducation et l'entraide."
                : "Today, we are a spiritual pillar for the people of Man, driven by the desire to share the Gospel and serve the local community through education and mutual aid."}
            </p>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1548625361-195feee1c4ce?auto=format&fit=crop&w=800&q=80" alt="Church building" />
        </div>
      </div>

      <div className="bg-indigo-900 text-white rounded-3xl p-10 md:p-16 mb-24 text-center">
        <h2 className="text-3xl font-serif font-bold mb-8">
          {lang === 'fr' ? "Nos Valeurs Fondamentales" : "Our Core Values"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-amber-400 text-4xl mb-4 font-serif italic">01.</div>
            <h3 className="text-xl font-bold mb-2">{lang === 'fr' ? "Vérité Biblique" : "Biblical Truth"}</h3>
            <p className="text-indigo-200">
              {lang === 'fr' ? "Un attachement strict aux Écritures comme guide suprême." : "A strict attachment to the Scriptures as the supreme guide."}
            </p>
          </div>
          <div>
            <div className="text-amber-400 text-4xl mb-4 font-serif italic">02.</div>
            <h3 className="text-xl font-bold mb-2">{lang === 'fr' ? "Intégrité" : "Integrity"}</h3>
            <p className="text-indigo-200">
              {lang === 'fr' ? "Vivre chaque jour selon les principes de l'Évangile." : "Living every day according to the principles of the Gospel."}
            </p>
          </div>
          <div>
            <div className="text-amber-400 text-4xl mb-4 font-serif italic">03.</div>
            <h3 className="text-xl font-bold mb-2">{lang === 'fr' ? "Mission" : "Mission"}</h3>
            <p className="text-indigo-200">
              {lang === 'fr' ? "Annoncer le salut à travers toute la région montagneuse." : "Proclaiming salvation throughout the mountainous region."}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-12">
          {lang === 'fr' ? "Notre Leader" : "Our Leader"}
        </h2>
        <div className="max-w-md mx-auto">
          <div className="w-48 h-48 bg-slate-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-amber-500 shadow-xl">
             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" alt="Pastor" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Pasteur Emmanuel Gondo</h3>
          <p className="text-amber-600 font-medium mb-4">{lang === 'fr' ? "Pasteur Principal" : "Senior Pastor"}</p>
          <p className="text-slate-600 italic">
            {lang === 'fr'
              ? "\"Ma mission est de bâtir une église solide sur le roc de la parole à Man.\""
              : "\"My mission is to build a solid church on the rock of the word in Man.\""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
