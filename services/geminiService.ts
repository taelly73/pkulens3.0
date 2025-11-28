import { Activity } from '../types';

// Mock implementation of AI service to avoid build errors and API key issues for now.

export const getAIRecommendation = async (userRole: string, interests: string[], activities: Activity[]): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const isEnglish = userRole === 'International Student';

  if (isEnglish) {
    return `Based on your role as an ${userRole} and your interests in ${interests.join(', ')}, here are my recommendations:

1. **Cultural Exchange Gala**: A great way to meet new people and experience diverse cultures.
2. **Academic Seminar**: Fits your academic interests perfectly.

(Note: This is a simulated AI response as the live AI service is currently disabled.)`;
  }

  return `根据您的身份（${userRole}）和兴趣（${interests.join('、')}），为您推荐以下活动：

1. **北大十佳歌手大赛**：体验校园文化氛围的最佳选择。
2. **学术前沿讲座**：非常符合您的学术兴趣。

（注：当前AI服务已暂时关闭，此处为模拟推荐结果。）`;
};

export const summarizeActivity = async (title: string, description: string): Promise<string> => {
  return description.length > 20 ? description.substring(0, 20) + '...' : description;
};