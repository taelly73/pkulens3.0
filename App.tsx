import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './views/Home';
import { Interaction } from './views/Interaction';
import { MyActivities } from './views/MyActivities';
import { ActivityDetail } from './views/ActivityDetail';
import { CategoryDetail } from './views/CategoryDetail'; // Imported
import { GeminiAssistant } from './components/GeminiAssistant';
import { ViewState, User, Activity, ActivityCategory } from './types';
import { MOCK_USER, ACTIVITIES } from './constants';
import { Languages } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [activities, setActivities] = useState<Activity[]>(ACTIVITIES);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | null>(null);
  
  // Detect if user is International Student to toggle language by default
  const [isEnglish, setIsEnglish] = useState(user.role === 'International Student');

  const handleViewActivityDetail = (id: string) => {
    setSelectedActivityId(id);
    setCurrentView(ViewState.ACTIVITY_DETAIL);
    window.scrollTo(0, 0); // Scroll to top
  };

  const handleCategorySelect = (category: ActivityCategory) => {
    setSelectedCategory(category);
    setCurrentView(ViewState.CATEGORY_DETAIL);
    window.scrollTo(0, 0);
  };

  const handleJoinActivity = (id: string) => {
    // Optimistic update
    setUser(prev => {
      if (prev.joinedActivities.includes(id)) return prev;
      return {
        ...prev,
        joinedActivities: [...prev.joinedActivities, id]
      };
    });
    
    // Update count on activity
    setActivities(prev => prev.map(a => 
      a.id === id ? { ...a, registeredCount: a.registeredCount + 1 } : a
    ));

    alert(isEnglish ? "Registration Successful!" : "报名成功！");
  };

  const handleCompleteActivity = (id: string) => {
    // Move from joined to completed and add points
    setUser(prev => {
      if (!prev.joinedActivities.includes(id)) return prev;
      return {
        ...prev,
        joinedActivities: prev.joinedActivities.filter(a => a !== id),
        completedActivities: [...prev.completedActivities, id],
        points: prev.points + 50 // Award 50 points
      };
    });
    alert(isEnglish ? "Activity Completed! +50 Points" : "活动已完成！获得 50 积分");
  };

  const handleRedeemReward = (id: string, cost: number) => {
    setUser(prev => {
      if (prev.points < cost) return prev;
      return {
        ...prev,
        points: prev.points - cost,
        redeemedRewards: [...prev.redeemedRewards, id]
      };
    });
    alert(isEnglish ? "Reward Redeemed Successfully!" : "奖励兑换成功！");
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home 
          activities={activities} 
          user={user} 
          isEnglish={isEnglish} 
          onViewDetail={handleViewActivityDetail}
          onCategorySelect={handleCategorySelect}
          setView={setCurrentView}
        />;
      case ViewState.INTERACTION:
        return <Interaction isEnglish={isEnglish} user={user} />;
      case ViewState.MY_ACTIVITIES:
        return <MyActivities 
          user={user} 
          activities={activities} 
          isEnglish={isEnglish} 
          onCompleteActivity={handleCompleteActivity}
          onRedeemReward={handleRedeemReward}
        />;
      case ViewState.ACTIVITY_DETAIL:
        const activity = activities.find(a => a.id === selectedActivityId);
        // Fallback to Home if ID not found
        if (!activity) return <Home activities={activities} user={user} isEnglish={isEnglish} onViewDetail={handleViewActivityDetail} onCategorySelect={handleCategorySelect} setView={setCurrentView} />;
        
        return <ActivityDetail 
          activity={activity} 
          isEnglish={isEnglish} 
          isJoined={user.joinedActivities.includes(activity.id)}
          onJoin={handleJoinActivity}
          onBack={() => setCurrentView(ViewState.HOME)}
        />;
      case ViewState.CATEGORY_DETAIL:
        if (!selectedCategory) return <Home activities={activities} user={user} isEnglish={isEnglish} onViewDetail={handleViewActivityDetail} onCategorySelect={handleCategorySelect} setView={setCurrentView} />;
        return <CategoryDetail 
          category={selectedCategory}
          activities={activities}
          user={user}
          isEnglish={isEnglish}
          onBack={() => setCurrentView(ViewState.HOME)}
          onViewDetail={handleViewActivityDetail}
        />;
      default:
        return <Home 
          activities={activities} 
          user={user} 
          isEnglish={isEnglish} 
          onViewDetail={handleViewActivityDetail}
          onCategorySelect={handleCategorySelect}
          setView={setCurrentView}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      <Navbar currentView={currentView} setView={setCurrentView} isEnglish={isEnglish} />
      
      {/* Global Language Toggle */}
      <button 
        onClick={() => setIsEnglish(!isEnglish)}
        className="fixed bottom-24 md:top-20 right-4 z-[40] bg-white/90 backdrop-blur text-gray-700 p-2 rounded-full shadow-md hover:bg-white transition-all border border-gray-200"
        title="Switch Language"
      >
        <Languages className="w-5 h-5" />
      </button>

      <main className="min-h-screen">
        {renderView()}
      </main>

      <GeminiAssistant user={user} activities={activities} isEnglish={isEnglish} />
    </div>
  );
};

export default App;