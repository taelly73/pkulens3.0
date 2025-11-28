import React, { useState } from 'react';
import { User, UserRole, ActivityCategory } from '../types';
import { MOCK_REVIEWS } from '../constants';
import { User as UserIcon, Lock, ArrowRight, BookOpen } from 'lucide-react';

interface LoginProps {
  isEnglish: boolean;
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ isEnglish, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: UserRole.UNDERGRAD_LOW
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API Call / Mock Login
    // In a real app, you would validate credentials against a backend here.
    
    const mockUser: User = {
      name: formData.username || "Student",
      role: formData.role,
      preferences: [ActivityCategory.ACADEMIC, ActivityCategory.SOCIAL],
      joinedActivities: ['23'], // Default mock data
      savedActivities: [],
      completedActivities: ['101', '102'],
      redeemedRewards: [],
      points: isRegistering ? 0 : 340, // New users start with 0, existing (mock) have points
      reviews: isRegistering ? [] : MOCK_REVIEWS
    };

    // Save to local storage to persist session (optional simple implementation)
    localStorage.setItem('pku_lens_user', JSON.stringify(mockUser));
    
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-100">
        
        {/* Left Side: Brand / Image */}
        <div className="bg-pku-red text-white p-8 md:p-12 md:w-1/2 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain bg-white rounded-full p-1" />
              <h1 className="text-3xl font-serif font-bold">PKU Lens</h1>
            </div>
            <p className="text-white/80 text-lg leading-relaxed">
              {isEnglish 
                ? "Your gateway to campus life at Peking University. Discover events, meet friends, and grow."
                : "北京大学校园生活聚合平台。发现精彩活动，结识志同道合的伙伴。"}
            </p>
          </div>
          
          <div className="relative z-10 mt-12">
            <div className="flex items-center gap-4 text-sm font-medium bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
              <BookOpen className="w-8 h-8" />
              <div>
                <p>{isEnglish ? "60+ Active Events" : "60+ 正在进行的活动"}</p>
                <p className="text-white/60">{isEnglish ? "Academic, Social, Sports..." : "学术讲座、社团社交、体育竞技..."}</p>
              </div>
            </div>
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isRegistering 
                ? (isEnglish ? "Create Account" : "注册新账号") 
                : (isEnglish ? "Welcome Back" : "欢迎回来")}
            </h2>
            <p className="text-gray-500 text-sm">
              {isRegistering 
                ? (isEnglish ? "Join the PKU community today" : "加入 PKU Lens，开启校园探索之旅") 
                : (isEnglish ? "Please enter your details to sign in" : "请输入账号密码登录")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{isEnglish ? "Username / Student ID" : "用户名 / 学号"}</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pku-red focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder={isEnglish ? "Enter your ID" : "请输入您的学号"}
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{isEnglish ? "Password" : "密码"}</label>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pku-red focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{isEnglish ? "Identity" : "身份类型"}</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pku-red focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
                >
                  <option value={UserRole.UNDERGRAD_LOW}>{isEnglish ? "Freshman/Sophomore" : "本科低年级"}</option>
                  <option value={UserRole.UNDERGRAD_HIGH}>{isEnglish ? "Junior/Senior" : "本科高年级"}</option>
                  <option value={UserRole.GRADUATE}>{isEnglish ? "Graduate Student" : "研究生/博士"}</option>
                  <option value={UserRole.INTERNATIONAL}>{isEnglish ? "International Student" : "留学生"}</option>
                </select>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-pku-red text-white py-3.5 rounded-xl font-bold hover:bg-pku-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-pku-red/20 mt-4"
            >
              {isRegistering ? (isEnglish ? "Sign Up" : "立即注册") : (isEnglish ? "Sign In" : "登录")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {isRegistering ? (isEnglish ? "Already have an account?" : "已有账号？") : (isEnglish ? "Don't have an account?" : "还没有账号？")}
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="ml-2 font-bold text-pku-red hover:underline"
              >
                {isRegistering ? (isEnglish ? "Sign In" : "去登录") : (isEnglish ? "Register Now" : "立即注册")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};