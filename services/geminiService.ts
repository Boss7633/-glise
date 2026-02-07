
import { GoogleGenAI } from "@google/genai";

export const getSpiritualGuidance = async (query: string, language: string = 'fr') => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("Gemini API Key missing.");
    return language === 'fr' 
      ? "L'assistant IA est en cours de maintenance (Clé API absente)." 
      : "The AI assistant is currently undergoing maintenance (Missing API Key).";
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview";

  const systemInstruction = language === 'fr' 
    ? "Tu es un assistant spirituel bienveillant pour l'église Baptiste Authentique de Man (Côte d'Ivoire). Réponds avec sagesse et versets bibliques."
    : "You are a kind spiritual assistant for the Authentic Baptist Church in Man (Ivory Coast). Answer with wisdom and Bible verses.";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: query }] }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue.";
  }
};

export const getDailyVerse = async (language: string = 'fr') => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return language === 'fr' 
      ? "Jean 3:16 - Car Dieu a tant aimé le monde qu'il a donné son Fils unique."
      : "John 3:16 - For God so loved the world that he gave his one and only Son.";
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: "Donne un verset biblique court." }] }],
    });
    return response.text || "Psaume 23:1";
  } catch (error) {
    return "Psaume 23:1";
  }
};
