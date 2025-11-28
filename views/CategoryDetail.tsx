import React from 'react';
import { Activity, ActivityCategory, User } from '../types';
import { ActivityCard } from '../components/ActivityCard';
import { ArrowLeft, BookOpen, Users, Palette, Trophy, Briefcase, Heart, Filter } from 'lucide-react';

interface CategoryDetailProps {
  category: ActivityCategory;
  activities: Activity[];
  user: User;
  isEnglish: boolean;
  onBack: () => void;
  onViewDetail: (id: string) => void;
  onToggleSave: (id: string) => void;
}

export const CategoryDetail: React.FC<CategoryDetailProps> = ({
  category,
  activities,
  user,
  isEnglish,
  onBack,
  onViewDetail,
  onToggleSave
}) => {
  // Filter activities by the selected category
  const filteredActivities = activities.filter(a => a.category === category);

  // Helper to get category display info
  const getCategoryInfo = (cat: ActivityCategory) => {
    switch (cat) {
      case ActivityCategory.ACADEMIC:
        return { 
          label: isEnglish ? 'Academic' : '学术讲座', 
          desc: isEnglish ? 'Lectures, seminars, and research sharing.' : '前沿讲座、学术研讨与科研分享。',
          icon: BookOpen, 
          color: 'bg-blue-50 text-blue-600',
          gradient: 'from-blue-600 to-indigo-600'
        };
      case ActivityCategory.SOCIAL:
        return { 
          label: isEnglish ? 'Social' : '社团活动', 
          desc: isEnglish ? 'Club events, gatherings, and parties.' : '百团大战、社团招新与联谊聚会。',
          icon: Users, 
          color: 'bg-green-50 text-green-600',
          gradient: 'from-green-600 to-teal-600'
        };
      case ActivityCategory.CULTURE:
        return { 
          label: isEnglish ? 'Culture' : '文娱艺术', 
          desc: isEnglish ? 'Concerts, exhibitions, and performances.' : '十佳歌手、艺术展览与话剧演出。',
          icon: Palette, 
          color: 'bg-purple-50 text-purple-600',
          gradient: 'from-purple-600 to-pink-600'
        };
      case ActivityCategory.SPORTS:
        return { 
          label: isEnglish ? 'Sports' : '体育竞技', 
          desc: isEnglish ? 'Tournaments, training, and outdoor fun.' : '新生杯、运动会与户外素质拓展。',
          icon: Trophy, 
          color: 'bg-orange-50 text-orange-600',
          gradient: 'from-orange-500 to-red-500'
        };
      case ActivityCategory.CAREER:
        return { 
          label: isEnglish ? 'Career' : '职业发展', 
          desc: isEnglish ? 'Job fairs, workshops, and networking.' : '双选会、企业宣讲与求职工坊。',
          icon: Briefcase, 
          color: 'bg-slate-50 text-slate-600',
          gradient: 'from-slate-600 to-gray-700'
        };
      case ActivityCategory.VOLUNTEER:
        return { 
          label: isEnglish ? 'Volunteer' : '志愿服务', 
          desc: isEnglish ? 'Community service and charity events.' : '支教、公益劳动与志愿者招募。',
          icon: Heart, 
          color: 'bg-red-50 text-red-600',
          gradient: 'from-red-500 to-rose-600'
        };
      default:
        return { 
          label: isEnglish ? 'Activities' : '活动', 
          desc: '',
          icon: Filter, 
          color: 'bg-gray-50 text-gray-600',
          gradient: 'from-gray-600 to-gray-800'
        };
    }
  };

  const info = getCategoryInfo(category);
  const Icon = info.icon;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header Section */}
      <div className={`relative bg-gradient-to-r ${info.gradient} pb-20 pt-24 px-4 shadow-lg text-white overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <Icon className="w-96 h-96 absolute -right-20 -top-20 transform rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            {isEnglish ? 'Back to Home' : '返回首页'}
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{info.label}</h1>
          </div>
          <p className="text-white/80 text-lg max-w-xl">{info.desc}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-t-3xl min-h-[500px] p-6 shadow-sm border border-gray-100">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-900 font-bold text-lg">
              {isEnglish ? `Found ${filteredActivities.length} Activities` : `共找到 ${filteredActivities.length} 个活动`}
            </h2>
            {/* Simple Sort/Filter Mockup */}
            <div className="flex gap-2">
               <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                 {isEnglish ? 'Latest' : '最新发布'}
               </button>
               <button className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 text-gray-500 rounded-full hover:bg-gray-50 transition-colors">
                 {isEnglish ? 'Popular' : '最热'}
               </button>
            </div>
          </div>

          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map(activity => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  userRole={user.role}
                  isEnglish={isEnglish}
                  onViewDetail={onViewDetail}
                  isJoined={user.joinedActivities.includes(activity.id)}
                  isSaved={user.savedActivities.includes(activity.id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {isEnglish ? 'No activities found' : '暂无相关活动'}
              </h3>
              <p className="text-gray-500 text-sm max-w-xs">
                {isEnglish 
                  ? 'We haven\'t found any upcoming activities in this category yet.' 
                  : '该分类下暂时没有即将开始的活动，去看看其他分类吧。'}
              </p>
              <button 
                onClick={onBack}
                className="mt-6 px-6 py-2 bg-pku-red text-white text-sm font-medium rounded-full hover:bg-pku-light transition-colors"
              >
                {isEnglish ? 'Explore Others' : '浏览其他'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};