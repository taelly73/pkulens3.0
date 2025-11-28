import { GoogleGenAI } from "@google/genai";
import { Activity } from '../types';

// Initialize the Google GenAI client
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// Assume this variable is pre-configured, valid, and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRecommendation = async (userRole: string, interests: string[], activities: Activity[]): Promise<string> => {
  // Simplify context to avoid token limits
  const activityContext = activities.slice(0, 15).map(a => `- ${a.title} (${a.category}): ${a.description.substring(0, 100)}...`).join('\n');
  
  const systemInstruction = `你是一个专业的校园活动助手"PKU Lens"。请根据用户的身份和兴趣，从提供的活动列表中推荐最合适的2个活动。`;
  
  const userPrompt = `
    用户信息：
    - 身份: ${userRole}
    - 兴趣: ${interests.join(', ')}
    
    可用活动列表:
    ${activityContext}

    请推荐2个活动。
    要求：
    1. 语气亲切自然。
    2. 解释推荐理由。
    3. 如果用户身份是 International Student，请用英文回答，否则用中文回答。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "暂无推荐结果。";

  } catch (error) {
    console.error("AI Service Error:", error);
    return "AI 服务暂时不可用，请检查网络或 Key 配置。";
  }
};

export const summarizeActivity = async (title: string, description: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `请将以下活动描述总结为一句话（20字以内），用于手机通知推送。\n活动：${title}\n描述：${description}`,
      config: {
        systemInstruction: "你是一个乐于助人的助手，负责总结文本。",
      }
    });

    return response.text || description;
  } catch (error) {
    console.error("AI Service Error:", error);
    return description;
  }
};