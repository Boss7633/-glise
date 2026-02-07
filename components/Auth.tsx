
import React, { useState } from 'react';
import { AuthMode } from '../types';
import { supabase } from '../services/supabase';

interface AuthProps {
  lang: 'fr' | 'en';
}

const Auth: React.FC<AuthProps> = ({ lang }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (signUpError) throw signUpError;
        alert(lang === 'fr' ? "Vérifiez votre email pour confirmer l'inscription !" : "Check your email to confirm registration!");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-indigo-950">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=80" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-slate-900/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl text-white">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-indigo-900 font-bold text-3xl mx-auto mb-4 shadow-lg shadow-amber-500/20">
              B
            </div>
            <h1 className="text-3xl font-serif font-bold">
              Baptiste Authentique de Man
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-indigo-200 mb-1 ml-1">
                  {lang === 'fr' ? "Nom complet" : "Full Name"}
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  placeholder="Jean Kouassi"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-indigo-200 mb-1 ml-1">
                Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="email@baptiste-man.ci"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-indigo-200 mb-1 ml-1">
                {lang === 'fr' ? "Mot de passe" : "Password"}
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-rose-400 text-xs font-bold bg-rose-400/10 p-2 rounded-lg text-center">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-indigo-900 rounded-xl font-bold text-lg shadow-xl disabled:opacity-50"
            >
              {loading ? '...' : (mode === 'login' ? (lang === 'fr' ? "Se connecter" : "Sign In") : (lang === 'fr' ? "Créer un compte" : "Create Account"))}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-indigo-200 hover:text-white text-sm font-medium"
            >
              {mode === 'login' 
                ? (lang === 'fr' ? "Pas encore de compte ? S'inscrire" : "No account yet? Register")
                : (lang === 'fr' ? "Déjà un compte ? Se connecter" : "Already have an account? Login")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
