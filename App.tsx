import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './views/Home';
import { Interaction } from './views/Interaction';
import { MyActivities } from './views/MyActivities';
import { ActivityDetail } from './views/ActivityDetail';
import { CategoryDetail } from './views/CategoryDetail';
import { Login } from './views/Login';
import { GeminiAssistant } from './components/GeminiAssistant';
import { ViewState, User, Activity, ActivityCategory } from './types';
import { MOCK_USER, ACTIVITIES } from './constants';
import { Languages } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>(MOCK_USER);
  
  const [activities, setActivities] = useState<Activity[]>(ACTIVITIES);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | null>(null);
  
  // Detect if user is International Student to toggle language by default
  const [isEnglish, setIsEnglish] = useState(false);

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('pku_lens_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        if (parsedUser.role === 'International Student') {
          setIsEnglish(true);
        }
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setIsLoggedIn(true);
    if (loggedInUser.role === 'International Student') {
      setIsEnglish(true);
    }
    setCurrentView(ViewState.HOME);
  };

  const handleLogout = () => {
    localStorage.removeItem('pku_lens_user');
    setIsLoggedIn(false);
    // Optional: Reset to default MOCK_USER or empty state
    // setUser(MOCK_USER); 
    setCurrentView(ViewState.HOME);
    alert(isEnglish ? "Logged out successfully" : "已退出登录");
  };

  const handleViewChange = (view: ViewState) => {
    // Protect Routes
    if ((view === ViewState.MY_ACTIVITIES || view === ViewState.INTERACTION) && !isLoggedIn) {
      setCurrentView(ViewState.LOGIN);
      return;
    }
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleViewActivityDetail = (id: string) => {
    setSelectedActivityId(id);
    setCurrentView(ViewState.ACTIVITY_DETAIL);
    window.scrollTo(0, 0);
  };

  const handleCategorySelect = (category: ActivityCategory) => {
    setSelectedCategory(category);
    setCurrentView(ViewState.CATEGORY_DETAIL);
    window.scrollTo(0, 0);
  };

  const handleToggleSave = (id: string) => {
    if (!isLoggedIn) {
      setCurrentView(ViewState.LOGIN);
      return;
    }

    setUser(prev => {
      const isSaved = prev.savedActivities.includes(id);
      const newSavedActivities = isSaved 
        ? prev.savedActivities.filter(a => a !== id) 
        : [...prev.savedActivities, id];
      
      const newUser = {
        ...prev,
        savedActivities: newSavedActivities
      };
      
      localStorage.setItem('pku_lens_user', JSON.stringify(newUser));
      return newUser;
    });
  };

  const handleJoinActivity = (id: string) => {
    if (!isLoggedIn) {
      setCurrentView(ViewState.LOGIN);
      return;
    }

    // Optimistic update
    setUser(prev => {
      if (prev.joinedActivities.includes(id)) return prev;
      const newUser = {
        ...prev,
        joinedActivities: [...prev.joinedActivities, id]
      };
      localStorage.setItem('pku_lens_user', JSON.stringify(newUser));
      return newUser;
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
      const newUser = {
        ...prev,
        joinedActivities: prev.joinedActivities.filter(a => a !== id),
        completedActivities: [...prev.completedActivities, id],
        points: prev.points + 50 // Award 50 points
      };
      localStorage.setItem('pku_lens_user', JSON.stringify(newUser));
      return newUser;
    });
    alert(isEnglish ? "Activity Completed! +50 Points" : "活动已完成！获得 50 积分");
  };

  const handleRedeemReward = (id: string, cost: number) => {
    setUser(prev => {
      if (prev.points < cost) return prev;
      const newUser = {
        ...prev,
        points: prev.points - cost,
        redeemedRewards: [...prev.redeemedRewards, id]
      };
      localStorage.setItem('pku_lens_user', JSON.stringify(newUser));
      return newUser;
    });
    alert(isEnglish ? "Reward Redeemed Successfully!" : "奖励兑换成功！");
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.LOGIN:
        return <Login isEnglish={isEnglish} onLogin={handleLogin} />;
      case ViewState.HOME:
        return <Home 
          activities={activities} 
          user={user} 
          isEnglish={isEnglish} 
          onViewDetail={handleViewActivityDetail}
          onCategorySelect={handleCategorySelect}
          onToggleSave={handleToggleSave}
          setView={handleViewChange}
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
          onToggleSave={handleToggleSave}
        />;
      case ViewState.ACTIVITY_DETAIL:
        const activity = activities.find(a => a.id === selectedActivityId);
        if (!activity) return <Home activities={activities} user={user} isEnglish={isEnglish} onViewDetail={handleViewActivityDetail} onCategorySelect={handleCategorySelect} onToggleSave={handleToggleSave} setView={handleViewChange} />;
        
        return <ActivityDetail 
          activity={activity} 
          isEnglish={isEnglish} 
          isJoined={isLoggedIn && user.joinedActivities.includes(activity.id)}
          isSaved={isLoggedIn && user.savedActivities.includes(activity.id)}
          onJoin={handleJoinActivity}
          onToggleSave={handleToggleSave}
          onBack={() => setCurrentView(ViewState.HOME)}
        />;
      case ViewState.CATEGORY_DETAIL:
        if (!selectedCategory) return <Home activities={activities} user={user} isEnglish={isEnglish} onViewDetail={handleViewActivityDetail} onCategorySelect={handleCategorySelect} onToggleSave={handleToggleSave} setView={handleViewChange} />;
        return <CategoryDetail 
          category={selectedCategory}
          activities={activities}
          user={user}
          isEnglish={isEnglish}
          onBack={() => setCurrentView(ViewState.HOME)}
          onViewDetail={handleViewActivityDetail}
          onToggleSave={handleToggleSave}
        />;
      default:
        return <Home 
          activities={activities} 
          user={user} 
          isEnglish={isEnglish} 
          onViewDetail={handleViewActivityDetail}
          onCategorySelect={handleCategorySelect}
          onToggleSave={handleToggleSave}
          setView={handleViewChange}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      {currentView !== ViewState.LOGIN && (
        <Navbar 
          currentView={currentView} 
          setView={handleViewChange} 
          isEnglish={isEnglish} 
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={handleLogout}
        />
      )}
      
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

      {isLoggedIn && currentView !== ViewState.LOGIN && (
        <GeminiAssistant user={user} activities={activities} isEnglish={isEnglish} />
      )}
    </div>
  );
};

export default App;