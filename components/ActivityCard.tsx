import React from 'react';
import { Activity, UserRole } from '../types';
import { MapPin, Calendar, Heart, ChevronRight } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  userRole: UserRole;
  isEnglish: boolean;
  onViewDetail: (id: string) => void;
  isJoined: boolean;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  userRole, 
  isEnglish, 
  onViewDetail,
  isJoined,
  isSaved,
  onToggleSave
}) => {
  const displayTitle = (isEnglish && activity.titleEn) ? activity.titleEn : activity.title;
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex gap-3 p-3 cursor-pointer group h-full"
      onClick={() => onViewDetail(activity.id)}
    >
      {/* Left: Image - More compact size */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
        <img 
          src={activity.image} 
          alt={displayTitle} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Right: Content */}
      <div className="flex flex-col flex-grow justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-gray-800 line-clamp-1 group-hover:text-pku-red transition-colors text-sm">
              {displayTitle}
            </h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 whitespace-nowrap border border-gray-100">
              {activity.category}
            </span>
          </div>
          
          <div className="space-y-0.5 mt-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="w-3 h-3 text-pku-red" />
              <span>{activity.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="w-3 h-3 text-pku-red" />
              <span className="truncate">{activity.location}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-1.5">
          {onToggleSave && (
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleSave(activity.id); }}
              className={`p-1 rounded-full transition-colors ${
                isSaved 
                  ? 'text-pku-red bg-red-50' 
                  : 'text-gray-400 hover:text-pku-red hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}

          <button 
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-colors flex items-center gap-1 ${
              isJoined 
                ? 'bg-green-50 text-green-600 border border-green-100'
                : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-pku-red hover:text-white hover:border-pku-red'
            }`}
          >
            {isJoined 
              ? (isEnglish ? 'Joined' : '已报名') 
              : (isEnglish ? 'Detail' : '详情')}
          </button>
        </div>
      </div>
    </div>
  );
};
