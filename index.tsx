
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(<App />);
  } catch (error) {
    console.error("Failed to render React application:", error);
    container.innerHTML = `<div style="padding: 20px; text-align: center;">Erreur critique au démarrage.</div>`;
  }
} else {
  console.error("Le conteneur 'root' est introuvable.");
}
