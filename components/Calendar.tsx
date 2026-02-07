
import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Event } from '../types';

interface CalendarProps {
  lang: 'fr' | 'en';
}

const Calendar: React.FC<CalendarProps> = ({ lang }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true });

      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-16 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-indigo-900 mb-4">
          {lang === 'fr' ? "Calendrier des Événements" : "Event Calendar"}
        </h1>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {loading ? (
          <div className="p-20 text-center text-indigo-900">Chargement...</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {events.map((event) => (
              <div key={event.id} className="p-8 flex flex-col md:flex-row gap-6 hover:bg-slate-50 transition-colors">
                <div className="md:w-32 flex-shrink-0">
                  <div className="text-amber-600 font-bold text-lg mb-1">{event.event_date}</div>
                  <div className="text-slate-400 font-medium">{event.event_time}</div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold text-indigo-900">{event.title}</h3>
                    <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full font-bold bg-indigo-100 text-indigo-600">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-slate-600">{event.description}</p>
                  <p className="text-sm text-slate-400 mt-2 italic">{event.location}</p>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <div className="p-20 text-center text-slate-500 italic">Aucun événement à venir.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
