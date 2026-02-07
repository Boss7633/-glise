
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("🚀 Lancement de l'application Baptiste Authentique...");

const startApp = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error("❌ Erreur critique : Élément #root introuvable");
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✅ Application montée avec succès sur le DOM");
  } catch (error) {
    console.error("❌ Échec du rendu React :", error);
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; padding: 20px; text-align: center;">
        <h1 style="color: #ef4444;">Erreur de Chargement</h1>
        <p style="color: #64748b;">Le site n'a pas pu démarrer correctement.</p>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 12px 24px; background: #4338ca; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
          Réessayer la connexion
        </button>
      </div>
    `;
  }
};

// Exécution immédiate
startApp();
