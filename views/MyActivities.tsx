import React, { useState } from 'react';
import { User, Activity, Review, Reward } from '../types';
import { Calendar, CheckCircle, Clock, Star, Gift, Archive, MessageSquare } from 'lucide-react';
import { MOCK_REWARDS } from '../constants';

interface MyActivitiesProps {
  user: User;
  activities: Activity[];
  isEnglish: boolean;
  onCompleteActivity: (id: string) => void;
  onRedeemReward: (id: string, cost: number) => void;
}

export const MyActivities: React.FC<MyActivitiesProps> = ({ 
  user, 
  activities, 
  isEnglish,
  onCompleteActivity,
  onRedeemReward
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'reviews' | 'rewards'>('upcoming');

  const upcomingActivities = activities.filter(a => user.joinedActivities.includes(a.id));
  const pastActivities = activities.filter(a => user.completedActivities.includes(a.id));
  
  // Render Column Headers for Desktop, Tabs for Mobile
  const ColumnHeader: React.FC<{ icon: any, title: string, count?: number, active?: boolean, onClick?: () => void }> = ({ icon: Icon, title, count, active, onClick }) => (
    <div 
      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all ${active ? 'bg-pku-red text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
      <span className="font-bold flex-grow">{title}</span>
      {count !== undefined && <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>{count}</span>}
    </div>
  );

  return (
    <div className="pb-24 pt-16 md:pt-24 px-4 max-w-[1600px] mx-auto min-h-screen">
      
      <div className="mb-8 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-pku-red text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-md">
           {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-500">
             <span>{user.role}</span>
             <span className="flex items-center gap-1 text-yellow-600 font-bold bg-yellow-50 px-2 py-0.5 rounded-full">
               <Gift className="w-3 h-3" /> {user.points} pts
             </span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="md:hidden grid grid-cols-4 gap-2 mb-6">
        <button onClick={() => setActiveTab('reviews')} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'reviews' ? 'bg-pku-red text-white' : 'bg-white text-gray-600'}`}>
          <MessageSquare className="w-5 h-5 mb-1" />
          <span className="text-[10px]">{isEnglish ? 'Reviews' : '我的评价'}</span>
        </button>
        <button onClick={() => setActiveTab('past')} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'past' ? 'bg-pku-red text-white' : 'bg-white text-gray-600'}`}>
          <Archive className="w-5 h-5 mb-1" />
          <span className="text-[10px]">{isEnglish ? 'History' : '已参加'}</span>
        </button>
        <button onClick={() => setActiveTab('upcoming')} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'upcoming' ? 'bg-pku-red text-white' : 'bg-white text-gray-600'}`}>
          <Calendar className="w-5 h-5 mb-1" />
          <span className="text-[10px]">{isEnglish ? 'Upcoming' : '即将参加'}</span>
        </button>
        <button onClick={() => setActiveTab('rewards')} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'rewards' ? 'bg-pku-red text-white' : 'bg-white text-gray-600'}`}>
          <Gift className="w-5 h-5 mb-1" />
          <span className="text-[10px]">{isEnglish ? 'Rewards' : '奖励'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-250px)]">
        
        {/* Column 1: Reviews */}
        <div className={`flex flex-col ${activeTab === 'reviews' ? 'flex' : 'hidden md:flex'}`}>
           <div className="hidden md:block mb-4">
             <ColumnHeader icon={MessageSquare} title={isEnglish ? 'My Reviews' : '我的评价'} count={user.reviews.length} active />
           </div>
           <div className="bg-white rounded-xl border border-gray-200 flex-grow overflow-y-auto p-4 space-y-4 shadow-sm">
             {user.reviews.map(review => (
               <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                 <div className="flex justify-between items-start mb-1">
                   <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{review.activityTitle}</h4>
                   <span className="text-xs text-gray-400">{review.timestamp}</span>
                 </div>
                 <div className="flex text-yellow-400 mb-2">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                   ))}
                 </div>
                 <p className="text-sm text-gray-600 leading-relaxed">{review.content}</p>
               </div>
             ))}
             {user.reviews.length === 0 && (
               <div className="text-center text-gray-400 py-10 text-sm">{isEnglish ? 'No reviews yet' : '暂无评价'}</div>
             )}
           </div>
        </div>

        {/* Column 2: Participated */}
        <div className={`flex flex-col ${activeTab === 'past' ? 'flex' : 'hidden md:flex'}`}>
           <div className="hidden md:block mb-4">
             <ColumnHeader icon={Archive} title={isEnglish ? 'Participated' : '我已参加'} count={pastActivities.length} active />
           </div>
           <div className="bg-white rounded-xl border border-gray-200 flex-grow overflow-y-auto p-4 space-y-3 shadow-sm">
              {pastActivities.map(activity => (
                <div key={activity.id} className="p-3 rounded-lg border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex gap-3">
                    <img src={activity.image} className="w-12 h-12 rounded-md object-cover bg-gray-100" alt="" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-800 line-clamp-1 group-hover:text-pku-red transition-colors">
                        {isEnglish && activity.titleEn ? activity.titleEn : activity.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Column 3: Upcoming (Interactive) */}
        <div className={`flex flex-col ${activeTab === 'upcoming' ? 'flex' : 'hidden md:flex'}`}>
           <div className="hidden md:block mb-4">
             <ColumnHeader icon={Calendar} title={isEnglish ? 'Upcoming' : '即将参加'} count={upcomingActivities.length} active />
           </div>
           <div className="bg-white rounded-xl border border-gray-200 flex-grow overflow-y-auto p-4 space-y-3 shadow-sm relative">
              <div className="absolute top-0 right-0 p-2 text-[10px] text-gray-400 bg-gray-50 rounded-bl-lg border-b border-l border-gray-100 z-10">
                {isEnglish ? 'Check to complete' : '勾选以完成'}
              </div>
              {upcomingActivities.map(activity => (
                <div key={activity.id} className="p-3 rounded-lg border border-gray-100 hover:border-pku-red/30 transition-all bg-gray-50/50">
                  <div className="flex gap-3 items-start">
                    <div className="pt-1">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-pku-red focus:ring-pku-red cursor-pointer"
                        onChange={() => onCompleteActivity(activity.id)}
                        title={isEnglish ? "Mark as completed" : "标记为已完成"}
                      />
                    </div>
                    <div className="flex-grow">
                       <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-gray-800 line-clamp-2">
                            {isEnglish && activity.titleEn ? activity.titleEn : activity.title}
                          </h4>
                       </div>
                       <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                         <Clock className="w-3 h-3" /> {activity.time}
                       </div>
                       <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                         <span className="bg-pku-red/10 text-pku-red px-1.5 py-0.5 rounded">{activity.category}</span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
              {upcomingActivities.length === 0 && (
               <div className="text-center text-gray-400 py-10 text-sm">
                 {isEnglish ? 'No upcoming activities' : '暂无即将参加的活动'}
               </div>
             )}
           </div>
        </div>

        {/* Column 4: Rewards */}
        <div className={`flex flex-col ${activeTab === 'rewards' ? 'flex' : 'hidden md:flex'}`}>
           <div className="hidden md:block mb-4">
             <ColumnHeader icon={Gift} title={isEnglish ? 'Rewards' : '奖励兑换'} active />
           </div>
           <div className="bg-white rounded-xl border border-gray-200 flex-grow overflow-y-auto p-4 space-y-4 shadow-sm">
             <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100 text-center mb-2">
                <span className="text-xs text-yellow-700 uppercase font-bold tracking-wider">{isEnglish ? 'Current Balance' : '当前积分'}</span>
                <div className="text-3xl font-bold text-yellow-600 mt-1">{user.points}</div>
             </div>
             
             {MOCK_REWARDS.map(reward => {
               const canAfford = user.points >= reward.cost;
               return (
                <div key={reward.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-all">
                  <div className="text-2xl">{reward.icon}</div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-gray-800">{reward.title}</h4>
                    <p className="text-xs text-yellow-600 font-bold">{reward.cost} pts</p>
                  </div>
                  <button 
                    disabled={!canAfford}
                    onClick={() => onRedeemReward(reward.id, reward.cost)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      canAfford 
                      ? 'bg-pku-red text-white hover:bg-pku-light' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isEnglish ? 'Redeem' : '兑换'}
                  </button>
                </div>
               );
             })}
           </div>
        </div>

      </div>
    </div>
  );
};