import { GoogleGenAI } from "@google/genai";
import { Activity } from '../types';

let genAI: GoogleGenAI | null = null;

// Initialize the client if API key is present
if (process.env.API_KEY) {
  genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const getAIRecommendation = async (userRole: string, interests: string[], activities: Activity[]): Promise<string> => {
  if (!genAI) return "Please provide an API Key to enable AI recommendations.";

  const activityContext = activities.map(a => `- ${a.title} (${a.category}): ${a.description}`).join('\n');
  const prompt = `
    You are an intelligent assistant for the "PKU Lens" campus activity app.
    The user is a ${userRole} interested in ${interests.join(', ')}.
    
    Here are the available activities:
    ${activityContext}

    Please recommend 2 specific activities from this list that best match the user's profile.
    Explain why briefly in a friendly tone. 
    Format the response as plain text with bullet points.
    If the user is an International Student, respond in English. Otherwise, respond in Chinese.
  `;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No recommendation generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI service is currently unavailable.";
  }
};

export const summarizeActivity = async (title: string, description: string): Promise<string> => {
  if (!genAI) return description;

  const prompt = `Summarize the following activity description into one catchy sentence (under 20 words) for a mobile notification. Activity: ${title}. Description: ${description}.`;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || description;
  } catch (error) {
    return description;
  }
};