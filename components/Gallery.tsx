
import React from 'react';

interface GalleryProps {
  lang: 'fr' | 'en';
}

const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  const images = [
    { url: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=400&q=80', title: 'Culte' },
    { url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80', title: 'Famille' },
    { url: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=400&q=80', title: 'Chorale' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', title: 'Pasteur' },
    { url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=400&q=80', title: 'Nature' },
    { url: 'https://images.unsplash.com/photo-1548625361-195feee1c4ce?auto=format&fit=crop&w=400&q=80', title: 'Architecture' },
    { url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=400&q=80', title: 'Lumière' },
    { url: 'https://images.unsplash.com/photo-1501183638710-841dd1904538?auto=format&fit=crop&w=400&q=80', title: 'Maison' },
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-indigo-900 mb-4 text-center">
        {lang === 'fr' ? "La Vie de l'Église" : "Church Life"}
      </h1>
      <p className="text-slate-600 text-center mb-16 max-w-2xl mx-auto">
        {lang === 'fr' 
          ? "Découvrez en images les moments forts de notre communauté, de nos célébrations aux actions sociales." 
          : "Discover through images the highlights of our community, from celebrations to social actions."}
      </p>

      <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
        {images.map((img, i) => (
          <div key={i} className="relative group overflow-hidden rounded-2xl break-inside-avoid">
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-serif italic text-lg">{img.title}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-xl transition-all hover:shadow-indigo-200/50">
          {lang === 'fr' ? "Voir tout l'album Google Photos" : "View Full Google Photos Album"}
        </button>
      </div>
    </div>
  );
};

export default Gallery;
