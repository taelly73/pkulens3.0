import React from 'react';
import { ViewState } from '../types';
import { Home, MessageCircle, Calendar, Bell, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isEnglish: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isEnglish }) => {
  // Removed "Activities" (List) as requested because it duplicates Home/Facets
  const navItems = [
    { id: ViewState.HOME, label: isEnglish ? 'Home' : '首页', icon: Home },
    { id: ViewState.INTERACTION, label: isEnglish ? 'Community' : '社群', icon: MessageCircle },
    { id: ViewState.MY_ACTIVITIES, label: isEnglish ? 'Mine' : '我的', icon: Calendar },
  ];

  return (
    <>
      {/* Desktop Fixed Navbar */}
      <div className="hidden md:flex fixed top-0 w-full bg-pku-red text-white z-50 h-16 items-center justify-between px-6 shadow-md">
        {/* Left: Logo Area */}
        <div className="flex items-center gap-3 w-48 cursor-pointer" onClick={() => setView(ViewState.HOME)}>
          {/* USER PROVIDED LOGO - Replace src with local file if needed */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Peking_University_seal.svg/150px-Peking_University_seal.svg.png" 
            alt="PKU Logo" 
            className="h-10 w-10 object-contain bg-white rounded-full p-0.5"
          />
          <h1 className="text-xl font-bold tracking-tight font-serif">PKU Lens</h1>
        </div>

        {/* Center: Navigation Items */}
        <div className="flex gap-6 flex-1 justify-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium ${
                currentView === item.id 
                  ? 'bg-white text-pku-red shadow-sm' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right: User Profile Area */}
        <div className="flex items-center gap-4 w-48 justify-end">
          <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
             <Bell className="w-5 h-5" />
             <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
          </button>
          <div 
            className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:bg-white/30 transition-colors"
            onClick={() => setView(ViewState.MY_ACTIVITIES)}
          >
             <UserIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                currentView === item.id ? 'text-pku-red' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'fill-current opacity-20' : ''}`} strokeWidth={currentView === item.id ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile Top Logo Bar */}
      <div className="md:hidden fixed top-0 w-full bg-pku-red text-white z-50 h-14 flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center gap-2">
           <img 
            src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Peking_University_seal.svg/150px-Peking_University_seal.svg.png" 
            alt="PKU Logo" 
            className="h-8 w-8 object-contain bg-white rounded-full p-0.5"
          />
           <span className="font-bold font-serif text-lg">PKU Lens</span>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5" />
          <div 
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
            onClick={() => setView(ViewState.MY_ACTIVITIES)}
          >
             <UserIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </>
  );
};