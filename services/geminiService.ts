import { Activity } from '../types';

// ============================================================
// 重要配置：修复 Vercel 白屏问题
// 在 Vite 中必须使用 import.meta.env.VITE_API_KEY
// ============================================================

const getApiKey = () => {
  // 安全获取环境变量，防止 'process is not defined' 导致白屏
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY || '';
    }
  } catch (e) {
    console.warn("Environment access warning");
  }
  return '';
};

const API_KEY = getApiKey();
const API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

export const getAIRecommendation = async (userRole: string, interests: string[], activities: Activity[]): Promise<string> => {
  if (!API_KEY) {
    return "配置错误：未找到 API Key。请在 Vercel 环境变量中添加 'VITE_API_KEY'。";
  }

  // 简化上下文以适应 token 限制
  const activityContext = activities.slice(0, 15).map(a => `- ${a.title} (${a.category}): ${a.description.substring(0, 100)}...`).join('\n');
  
  const systemPrompt = `你是一个专业的校园活动助手"PKU Lens"。请根据用户的身份和兴趣，从提供的活动列表中推荐最合适的2个活动。`;
  
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
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "glm-4-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        stream: false,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("AI API Error:", errorData);
      return "AI 服务响应异常，请稍后再试。";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "暂无推荐结果。";

  } catch (error) {
    console.error("AI Service Network Error:", error);
    return "网络连接失败，请检查网络设置。";
  }
};

export const summarizeActivity = async (title: string, description: string): Promise<string> => {
  if (!API_KEY) return description;

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
          { role: "system", content: "你是一个乐于助人的助手，负责总结文本。" },
          { role: "user", content: `请将以下活动描述总结为一句话（20字以内），用于手机通知推送。\n活动：${title}\n描述：${description}` }
        ],
        stream: false,
        temperature: 0.5
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || description;
  } catch (error) {
    return description;
  }
};