
import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Sermon } from '../types';

interface SermonsProps {
  lang: 'fr' | 'en';
}

const Sermons: React.FC<SermonsProps> = ({ lang }) => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSermons = async () => {
      const { data, error } = await supabase
        .from('sermons')
        .select('*')
        .order('sermon_date', { ascending: false });

      if (!error && data) {
        setSermons(data);
      }
      setLoading(false);
    };

    fetchSermons();
  }, []);

  if (loading) return <div className="py-20 text-center text-indigo-900 font-bold">Chargement...</div>;

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-indigo-900 mb-4">
          {lang === 'fr' ? "Ressources Spirituelles" : "Spiritual Resources"}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {sermons.map((sermon) => (
          <div key={sermon.id} className="group cursor-pointer">
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-indigo-200/50 transition-all">
              <img src={sermon.thumbnail_url || 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=400&q=80'} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <a 
                  href={`https://youtube.com/watch?v=${sermon.youtube_id}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform"
                >
                  <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </a>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors mb-1">
              {sermon.title}
            </h3>
            <div className="text-sm text-slate-500 mb-1">{sermon.speaker}</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-tighter">{sermon.sermon_date}</div>
          </div>
        ))}
        {sermons.length === 0 && (
          <p className="col-span-full text-center text-slate-500 italic">Aucun sermon disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Sermons;
