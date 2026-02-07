
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("React Bootloader Start");

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React Application Mounted Successfully");
  } catch (err) {
    console.error("React Mounting Failed:", err);
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif; color: #4338ca;">
        <h1>Erreur de Démarrage</h1>
        <p>Une erreur est survenue lors de l'initialisation de l'application.</p>
        <button onclick="window.location.reload()" style="padding: 12px 24px; background: #4338ca; color: white; border: none; border-radius: 12px; font-weight: bold; margin-top: 20px;">Réessayer</button>
      </div>
    `;
  }
} else {
  console.error("Root element not found in DOM");
}
