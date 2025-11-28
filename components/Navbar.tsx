import React, { useState } from 'react';
import { ViewState, User } from '../types';
import { Home, MessageCircle, Calendar, Bell, User as UserIcon, LogOut, LogIn } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isEnglish: boolean;
  isLoggedIn: boolean;
  user: User;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isEnglish, isLoggedIn, user, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
          <img 
            src="/logo.png" 
            alt="PKU Lens Logo" 
            className="h-10 w-10 object-contain"
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
        <div className="flex items-center gap-4 w-48 justify-end relative">
          {isLoggedIn ? (
            <>
              <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
              </button>
              
              {/* Profile Dropdown Trigger */}
              <div 
                className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-1 rounded-full transition-colors"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                   <span className="font-bold text-sm">{user.name.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium truncate max-w-[80px]">{user.name}</span>
              </div>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                  <div className="absolute top-12 right-0 bg-white text-gray-800 rounded-xl shadow-xl py-2 w-48 z-50 animate-fade-in border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-bold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <button 
                      onClick={() => { setView(ViewState.MY_ACTIVITIES); setShowProfileMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4" />
                      {isEnglish ? 'My Profile' : '个人中心'}
                    </button>
                    <button 
                      onClick={() => { onLogout(); setShowProfileMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {isEnglish ? 'Logout' : '退出登录'}
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <button 
              onClick={() => setView(ViewState.LOGIN)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-pku-red rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all"
            >
              <LogIn className="w-4 h-4" />
              {isEnglish ? 'Sign In' : '登录'}
            </button>
          )}
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
            src="/logo.png" 
            alt="PKU Lens Logo" 
            className="h-8 w-8 object-contain"
          />
           <span className="font-bold font-serif text-lg">PKU Lens</span>
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div 
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              onClick={() => setView(ViewState.MY_ACTIVITIES)}
            >
               <UserIcon className="w-4 h-4" />
            </div>
          ) : (
            <button 
              onClick={() => setView(ViewState.LOGIN)}
              className="bg-white/20 p-1.5 rounded-full"
            >
              <LogIn className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};