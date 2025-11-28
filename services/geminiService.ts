import { Activity } from '../types';

// ==================================================================================
// Zhipu AI (GLM-4) Configuration
// ==================================================================================
// The API Key is loaded from the environment variable.
// Configure your environment (e.g., .env file or Vercel settings) with:
// API_KEY=a18ec8228eca4e239990562a72a74fe8.EL6jIxJ3nNfGFPTA
const API_KEY = process.env.API_KEY; 
const API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

export const getAIRecommendation = async (userRole: string, interests: string[], activities: Activity[]): Promise<string> => {
  if (!API_KEY) {
    return "Error: API Key is missing. Please configure process.env.API_KEY.";
  }

  // Simplify context to avoid token limits, taking top 15 activities
  const activityContext = activities.slice(0, 15).map(a => `- ${a.title} (${a.category}): ${a.description.substring(0, 100)}...`).join('\n');
  
  const systemInstruction = `You are an intelligent assistant for the "PKU Lens" campus activity app. Your goal is to recommend activities based on user profiles.`;
  
  const userPrompt = `
    The user is a ${userRole} interested in ${interests.join(', ')}.
    
    Here are the available activities:
    ${activityContext}

    Please recommend 2 specific activities from this list that best match the user's profile.
    Explain why briefly in a friendly tone. 
    Format the response as plain text with bullet points.
    If the user is an International Student, respond in English. Otherwise, respond in Chinese.
  `;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "glm-4-flash",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt }
        ],
        stream: false,
        temperature: 0.1,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      throw new Error(`Zhipu API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No recommendation generated.";

  } catch (error) {
    console.error("AI Service Error:", error);
    return "AI service is currently unavailable. Please check your network or API Key.";
  }
};

export const summarizeActivity = async (title: string, description: string): Promise<string> => {
  if (!API_KEY) return description;

  const systemInstruction = "You are a helpful assistant that summarizes text.";
  const userPrompt = `Summarize the following activity description into one catchy sentence (under 20 words) for a mobile notification. Activity: ${title}. Description: ${description}.`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "glm-4-flash",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt }
        ],
        stream: false,
        temperature: 0.1
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || description;
  } catch (error) {
    console.error("AI Service Error:", error);
    return description;
  }
};
