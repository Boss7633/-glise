
import React, { useState } from 'react';
import { supabase } from '../services/supabase';

interface ContactProps {
  lang: 'fr' | 'en';
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: lang === 'fr' ? "Demande de prière" : "Prayer Request",
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('contact_messages')
      .insert([{
        sender_name: formData.name,
        sender_email: formData.email,
        subject: formData.subject,
        message: formData.message
      }]);

    if (!error) {
      setSubmitted(true);
    } else {
      alert("Erreur lors de l'envoi.");
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-indigo-900 mb-12 text-center">
        {lang === 'fr' ? "Contactez-nous" : "Contact Us"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{lang === 'fr' ? "Message Envoyé !" : "Message Sent!"}</h2>
              <button onClick={() => setSubmitted(false)} className="text-indigo-600 font-bold hover:underline">Envoyer un autre message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{lang === 'fr' ? "Nom Complet" : "Full Name"}</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Jean Kouassi" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="email@exemple.ci" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{lang === 'fr' ? "Sujet" : "Subject"}</label>
                <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>{lang === 'fr' ? "Demande de prière" : "Prayer Request"}</option>
                  <option>{lang === 'fr' ? "Informations cultes" : "Service Info"}</option>
                  <option>{lang === 'fr' ? "Autre" : "Other"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Votre message ici..."></textarea>
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50">
                {loading ? '...' : (lang === 'fr' ? "Envoyer le message" : "Send Message")}
              </button>
            </form>
          )}
        </div>
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-indigo-900">Infos Pratiques</h3>
            <p className="text-slate-600">Quartier Commerce, Man. Côte d'Ivoire.</p>
            <div className="h-64 rounded-2xl bg-slate-200 overflow-hidden">
                <iframe 
                    title="Church Map"
                    width="100%" height="100%" frameBorder="0" 
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Centre%20Ville%20Man%20Cote%20d'Ivoire+(Baptiste%20Authentique%20de%20Man)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
