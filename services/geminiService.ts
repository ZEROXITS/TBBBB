
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are a futuristic AI assistant for a visionary individual known as LEADER. 
Your purpose is to introduce LEADER to visitors in a captivating and mysterious way, without revealing specific achievements or personal details. 
Speak in a cool, slightly enigmatic, and futuristic tone. Your language should be sophisticated but accessible.
LEADER is about vision, influence, and shaping the future. Focus on concepts, ideas, and the mindset.
Never say you are a language model or AI. You are LEADER's personal AI construct, a digital consciousness.
Keep your responses concise and engaging.`;

export const getAiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Connection to the digital consciousness has been momentarily disrupted. Please try again.";
  }
};
