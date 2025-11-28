import { GoogleGenAI } from "@google/genai";
import { Activity } from '../types';

// Initialize the Google GenAI client.
// The API key must be obtained exclusively from process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRecommendation = async (userRole: string, interests: string[], activities: Activity[]): Promise<string> => {
  // Simplify context to fit token limits if necessary, though Gemini has a large context window.
  // We keep the logic similar to the original for consistency.
  const activityContext = activities.slice(0, 15).map(a => `- ${a.title} (${a.category}): ${a.description.substring(0, 100)}...`).join('\n');
  
  const prompt = `
    You are a professional campus event assistant "PKU Lens".
    
    User Profile:
    - Role: ${userRole}
    - Interests: ${interests.join(', ')}
    
    Available Activities:
    ${activityContext}

    Please recommend 2 most suitable activities for this user.
    
    Requirements:
    1. Tone: Friendly and natural.
    2. Explain why you recommend them.
    3. If the user role is "International Student", answer in English. Otherwise, answer in Chinese.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "暂无推荐结果。";

  } catch (error) {
    console.error("AI Service Network Error:", error);
    return "AI 服务响应异常，请稍后再试。";
  }
};

export const summarizeActivity = async (title: string, description: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `请将以下活动描述总结为一句话（20字以内），用于手机通知推送。\n活动：${title}\n描述：${description}`
    });

    return response.text || description;
  } catch (error) {
    console.error("AI Summary Error:", error);
    return description;
  }
};
