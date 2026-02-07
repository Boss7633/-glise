
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  // Suppression de StrictMode pour une initialisation plus directe de Supabase
  root.render(<App />);
} else {
  console.error("Le conteneur 'root' est introuvable.");
}
