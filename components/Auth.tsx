
import React, { useState } from 'react';
import { AuthMode } from '../types';
import { supabase } from '../services/supabase';

interface AuthProps {
  lang: 'fr' | 'en';
  onSuccess?: () => void;
}

const Auth: React.FC<AuthProps> = ({ lang, onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name }
          }
        });
        if (signUpError) throw signUpError;
        setSuccess(lang === 'fr' 
          ? "Inscription réussie ! Veuillez cliquer sur le lien envoyé par email." 
          : "Registration successful! Please check your email.");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          if (signInError.message.includes('Email not confirmed')) {
            setError(lang === 'fr' 
              ? "Email non confirmé. Vérifiez vos spams." 
              : "Email not confirmed. Check your spam.");
          } else {
            throw signInError;
          }
        } else if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) return;
    setLoading(true);
    await supabase.auth.resend({ type: 'signup', email });
    setLoading(false);
    setSuccess(lang === 'fr' ? "Email renvoyé !" : "Email resent!");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-indigo-900">
              {mode === 'login' 
                ? (lang === 'fr' ? "Bon retour !" : "Welcome back!") 
                : (lang === 'fr' ? "Rejoignez-nous" : "Join us")}
            </h1>
            <p className="text-slate-500 mt-2">
              {mode === 'login' 
                ? (lang === 'fr' ? "Connectez-vous à votre espace fidèle" : "Sign in to your member area")
                : (lang === 'fr' ? "Créez votre compte en quelques secondes" : "Create your account in seconds")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                  {lang === 'fr' ? "Nom complet" : "Full Name"}
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Jean Kouassi"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="email@exemple.ci"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                {lang === 'fr' ? "Mot de passe" : "Password"}
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
                <p className="text-rose-600 text-sm font-medium">{error}</p>
                {error.includes('confirmed') && (
                  <button type="button" onClick={handleResendEmail} className="text-xs font-bold text-indigo-600 mt-2 underline">
                    {lang === 'fr' ? "Renvoyer l'email" : "Resend email"}
                  </button>
                )}
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                <p className="text-emerald-600 text-sm font-medium">{success}</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 transition-all active:scale-[0.98]"
            >
              {loading ? '...' : (mode === 'login' ? (lang === 'fr' ? "Se connecter" : "Sign In") : (lang === 'fr' ? "S'inscrire" : "Register"))}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors"
            >
              {mode === 'login' 
                ? (lang === 'fr' ? "Nouveau ici ? Créer un compte" : "New here? Create account")
                : (lang === 'fr' ? "Déjà membre ? Se connecter" : "Already a member? Login")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
