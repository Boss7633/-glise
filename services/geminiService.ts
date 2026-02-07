
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    // Tentative d'accès à la variable d'environnement injectée
    return process.env.API_KEY || "";
  } catch (e) {
    // Fallback silencieux si process n'est pas défini
    return "";
  }
};

export const getSpiritualGuidance = async (query: string, language: string = 'fr') => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("Gemini API Key missing.");
    return language === 'fr' 
      ? "L'assistant IA est en cours de maintenance. Veuillez nous excuser pour ce désagrément." 
      : "The AI assistant is currently undergoing maintenance. We apologize for the inconvenience.";
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview";

  const systemInstruction = language === 'fr' 
    ? "Tu es un assistant spirituel bienveillant pour le site web de l'église Baptiste Authentique de Man (Côte d'Ivoire). Réponds aux questions avec sagesse, en utilisant des versets bibliques quand c'est approprié. Sois encourageant et respectueux. Garde tes réponses concises et adaptées au contexte de la région du Tonkpi et de la ville de Man."
    : "You are a kind spiritual assistant for the Authentic Baptist Church website in Man (Ivory Coast). Answer questions with wisdom, using Bible verses when appropriate. Be encouraging and respectful. Keep responses concise and culturally sensitive to the Tonkpi region and the city of Man.";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: query }] }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || (language === 'fr' ? "Je n'ai pas pu générer de réponse." : "Could not generate response.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'fr' ? "Une erreur est survenue lors de la connexion spirituelle." : "An error occurred during the spiritual connection.";
  }
};

export const getDailyVerse = async (language: string = 'fr') => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return language === 'fr' 
      ? "Jean 3:16 - Car Dieu a tant aimé le monde qu'il a donné son Fils unique afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle."
      : "John 3:16 - For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.";
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview";

  const prompt = language === 'fr'
    ? "Génère un verset biblique inspirant pour aujourd'hui avec une courte explication (2 phrases max). Format: Verset (Référence) - Explication."
    : "Generate an inspiring Bible verse for today with a short explanation (max 2 sentences). Format: Verse (Reference) - Explanation.";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 1.0,
      },
    });
    return response.text || "";
  } catch (error) {
    return language === 'fr' 
      ? "Psaume 23:1 - L'Éternel est mon berger: je ne manquerai de rien."
      : "Psalm 23:1 - The Lord is my shepherd, I lack nothing.";
  }
};
