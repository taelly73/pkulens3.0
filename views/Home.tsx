import React, { useState } from 'react';
import { Activity, ActivityCategory, User, UserRole } from '../types';
import { ActivityCard } from '../components/ActivityCard';
import { Search, MapPin, Sparkles, TrendingUp, Calendar, ArrowRight, Layers, Users, BookOpen, Trophy, Briefcase, Heart, Palette, Bookmark, X } from 'lucide-react';
import { getAIRecommendation } from '../services/geminiService';

interface HomeProps {
  activities: Activity[];
  user: User;
  isEnglish: boolean;
  onViewDetail: (id: string) => void;
  onCategorySelect: (category: ActivityCategory) => void;
  onToggleSave: (id: string) => void;
  setView: (view: any) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  activities, 
  user, 
  isEnglish, 
  onViewDetail, 
  onCategorySelect, 
  onToggleSave,
  setView 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to filter safely
  const todayActivities = activities.slice(0, 2);
  const weekActivities = activities.slice(0, 4);

  // Mock Mini Calendar Data
  const currentWeek = [
    { day: 'Mon', date: '20', hasEvent: true, conflict: false },
    { day: 'Tue', date: '21', hasEvent: false, conflict: false },
    { day: 'Wed', date: '22', hasEvent: true, conflict: true },
    { day: 'Thu', date: '23', hasEvent: false, conflict: false },
    { day: 'Fri', date: '24', hasEvent: false, conflict: false },
    { day: 'Sat', date: '25', hasEvent: true, conflict: false },
    { day: 'Sun', date: '26', hasEvent: true, conflict: false },
  ];

  const categories = [
    { id: ActivityCategory.ACADEMIC, label: isEnglish ? 'Academic' : '学术讲座', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
    { id: ActivityCategory.SOCIAL, label: isEnglish ? 'Social' : '社团活动', icon: Users, color: 'bg-green-50 text-green-600' },
    { id: ActivityCategory.CULTURE, label: isEnglish ? 'Culture' : '文娱艺术', icon: Palette, color: 'bg-purple-50 text-purple-600' },
    { id: ActivityCategory.SPORTS, label: isEnglish ? 'Sports' : '体育竞技', icon: Trophy, color: 'bg-orange-50 text-orange-600' },
    { id: ActivityCategory.CAREER, label: isEnglish ? 'Career' : '职业发展', icon: Briefcase, color: 'bg-slate-50 text-slate-600' },
    { id: ActivityCategory.VOLUNTEER, label: isEnglish ? 'Volunteer' : '志愿服务', icon: Heart, color: 'bg-red-50 text-red-600' },
  ];

  // Placeholder activity to prevent crashes
  const placeholderActivity: Activity = {
    id: 'placeholder',
    title: isEnglish ? 'Coming Soon' : '虚位以待',
    description: isEnglish ? 'More events are being added.' : '更多精彩活动即将上线。',
    category: ActivityCategory.SOCIAL,
    image: 'https://picsum.photos/400/250?grayscale',
    tags: [],
    registeredCount: 0,
    maxCapacity: 0,
    organizer: 'PKU Lens',
    date: 'TBD',
    time: 'TBD',
    location: 'PKU'
  };

  const aiPick = activities[0] || placeholderActivity;
  const trendingPick = activities[3] || activities[1] || aiPick;

  return (
    <div className="pb-24 pt-16 md:pt-20 bg-gray-50 min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="bg-gradient-to-b from-pku-red/5 to-transparent border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left: Search */}
          <div className="flex-1 w-full">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {isEnglish ? 'Explore Campus Life' : '探索北大校园生活'}
            </h2>
            
            <div className="relative mb-6 group">
              <input
                type="text"
                placeholder={isEnglish ? "Search events, locations, organizers..." : "搜索活动名称、地点、主办方..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 shadow-sm focus:border-pku-red focus:ring-0 text-lg transition-all group-hover:shadow-md"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
          </div>

          {/* Right: Sidebar (Mini Calendar Only) */}
          <div className="w-full md:w-80 flex flex-col gap-4 flex-shrink-0">
            {/* Mini Calendar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pku-red" />
                  {isEnglish ? 'My Schedule' : '我的日历'}
                </h3>
                <button className="text-xs text-pku-red hover:underline" onClick={() => setView('MY_ACTIVITIES')}>{isEnglish ? 'View All' : '查看全部'}</button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                {currentWeek.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-400">{d.day}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium relative ${
                      d.date === '20' ? 'bg-pku-red text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                      {d.date}
                      {d.hasEvent && (
                        <span className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${d.conflict ? 'bg-red-600 ring-1 ring-white' : 'bg-pku-red'}`}></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        
        {/* 2. Recommendation Zone */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              {isEnglish ? 'Selected for You' : '为你推荐'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI Pick */}
            <div 
              onClick={() => onViewDetail(aiPick.id)}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-24 h-24" />
              </div>
              <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded font-bold mb-3 inline-block">AI Pick</span>
              <h4 className="font-bold text-lg text-indigo-900 mb-1 line-clamp-1">{aiPick.title}</h4>
              <p className="text-sm text-indigo-700 mb-4 line-clamp-2">{aiPick.description || 'No description available'}</p>
              <button className="text-indigo-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                {isEnglish ? 'Check Details' : '查看详情'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trending */}
            <div 
              onClick={() => onViewDetail(trendingPick.id)}
              className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100 relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="w-24 h-24" />
              </div>
              <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded font-bold mb-3 inline-block">Hot 🔥</span>
              <h4 className="font-bold text-lg text-orange-900 mb-1 line-clamp-1">{trendingPick.title}</h4>
              <p className="text-sm text-orange-700 mb-4 line-clamp-2">
                {trendingPick.registeredCount > 0 
                  ? `${trendingPick.registeredCount} students joined this activity.` 
                  : (isEnglish ? 'Be the first to join!' : '快来抢先报名！')}
              </p>
              <button className="text-orange-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                {isEnglish ? 'Join Now' : '立即参与'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Theme Collection */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer text-white">
              <img src="https://picsum.photos/400/250?random=10" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" alt="Theme" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <span className="text-yellow-400 font-bold tracking-wider text-xs uppercase mb-1">Collection</span>
                <h4 className="font-bold text-xl mb-1">{isEnglish ? '126th Anniversary' : '126周年校庆特辑'}</h4>
                <p className="text-gray-300 text-sm mb-0">{isEnglish ? 'Explore history & events' : '探索历史与系列活动'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Category Grid */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
             <Layers className="w-5 h-5 text-pku-red" />
             {isEnglish ? 'Explore Categories' : '分类浏览'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => onCategorySelect(cat.id)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white group"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-gray-700 text-sm">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Timeline Feed */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                 {isEnglish ? 'Happening Today & This Week' : '今日 · 本周活动'}
              </h3>
              <button className="text-sm text-gray-500 hover:text-pku-red">{isEnglish ? 'View Calendar' : '查看完整日程'}</button>
            </div>
            
            <div className="space-y-2">
              {weekActivities.length > 0 ? weekActivities.map(activity => (
                <ActivityCard 
                  key={activity.id}
                  activity={activity}
                  userRole={user.role}
                  isEnglish={isEnglish}
                  isJoined={user.joinedActivities.includes(activity.id)}
                  onViewDetail={onViewDetail}
                  isSaved={user.savedActivities.includes(activity.id)}
                  onToggleSave={onToggleSave}
                />
              )) : (
                <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                  {isEnglish ? 'No activities scheduled for this week.' : '本周暂无活动安排。'}
                </div>
              )}
            </div>
          </div>
          
          {/* 5. Community Sidebar (Desktop Only) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
             <h3 className="text-xl font-bold text-gray-900 mb-4">{isEnglish ? 'Community Buzz' : '社群动态'}</h3>
             <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">JS</div>
                    <span className="text-sm font-semibold">John Smith</span>
                  </div>
                  <p className="text-sm text-gray-600">Anyone want to practice English together at the Global Lounge?</p>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-600">XL</div>
                    <span className="text-sm font-semibold">Xiao Liu</span>
                  </div>
                  <div className="h-20 bg-gray-100 rounded-lg mb-2 overflow-hidden">
                    <img src="https://picsum.photos/300/100?random=20" alt="Moment" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-gray-600">The library cat is so cute today! 🐱</p>
                </div>
                <button className="w-full py-2 text-sm text-pku-red font-medium hover:bg-red-50 rounded-lg transition-colors">
                  {isEnglish ? 'View All Discussions' : '查看全部讨论'}
                </button>
             </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm text-gray-600">
            <a href="#" className="hover:text-pku-red">{isEnglish ? 'About Us' : '关于我们'}</a>
            <a href="#" className="hover:text-pku-red">{isEnglish ? 'Guidelines' : '发布规范'}</a>
            <a href="#" className="hover:text-pku-red">{isEnglish ? 'Privacy Policy' : '隐私政策'}</a>
            <a href="#" className="hover:text-pku-red">{isEnglish ? 'Contact' : '联系方式'}</a>
          </div>
          <p className="text-xs text-gray-400">© 2024 PKU Lens. Designed for Peking University Students.</p>
        </div>
      </footer>
    </div>
  );
};