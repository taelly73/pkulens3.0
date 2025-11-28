import React, { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { getAIRecommendation } from '../services/geminiService';
import { User, Activity } from '../types';

interface GeminiAssistantProps {
  user: User;
  activities: Activity[];
  isEnglish: boolean;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ user, activities, isEnglish }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleAskAI = async () => {
    setLoading(true);
    const result = await getAIRecommendation(user.role, user.preferences, activities);
    setResponse(result);
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-gradient-to-r from-pku-red to-orange-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-40 flex items-center gap-2 animate-bounce"
      >
        <Sparkles className="w-6 h-6" />
        <span className="text-sm font-bold pr-1">{isEnglish ? 'AI Pick' : '智能推荐'}</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-40 flex flex-col overflow-hidden animate-fade-in-up">
      <div className="bg-pku-red text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-bold">{isEnglish ? 'AI Assistant' : 'AI 智能助手'}</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 bg-gray-50 min-h-[200px] max-h-[400px] overflow-y-auto text-sm">
        {!response && !loading && (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-4">
              {isEnglish 
                ? "I can analyze all campus events and find the best ones for your schedule and interests."
                : "我可以分析所有校园活动，根据你的兴趣和日程为你推荐最合适的活动。"}
            </p>
            <button
              onClick={handleAskAI}
              className="bg-white border border-gray-200 text-pku-red px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 font-medium"
            >
              {isEnglish ? 'Find events for me' : '为我推荐活动'}
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center h-full space-y-3">
            <div className="w-8 h-8 border-4 border-pku-red border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 animate-pulse">Thinking...</p>
          </div>
        )}

        {response && (
          <div className="prose prose-sm prose-p:my-2 prose-ul:my-2 text-gray-700">
            <div className="whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </div>

      {response && (
        <div className="p-3 border-t bg-white flex justify-end">
          <button 
            onClick={() => setResponse(null)}
            className="text-xs text-gray-500 hover:text-pku-red underline"
          >
            {isEnglish ? 'Clear Chat' : '清空对话'}
          </button>
        </div>
      )}
    </div>
  );
};
