import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY; 
const genAI = new GoogleGenerativeAI(apiKey);

let AichatSession;

async function initializeAI() {
  const model = await genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  AichatSession = await model.startChat({
    generationConfig,
    history: [],
  });
}

initializeAI();

export { AichatSession };
