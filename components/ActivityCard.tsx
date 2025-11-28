import React from 'react';
import { Activity, UserRole } from '../types';
import { MapPin, Calendar, Heart } from 'lucide-react';

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
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 relative h-20 group cursor-pointer"
      onClick={() => onViewDetail(activity.id)}
    >
      <div className="flex h-full">
        {/* Left: Image - Fixed Size 80px x 80px (h-full) */}
        <div className="w-20 h-full flex-shrink-0 bg-gray-100">
          <img 
            src={activity.image} 
            alt={displayTitle} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right: Content */}
        <div className="flex-grow p-2 flex flex-col min-w-0 relative">
          
          {/* Title Area */}
          <div className="pr-16"> {/* Padding right to avoid overlap with top-right action */}
            <h3 className="font-bold text-gray-900 text-xs md:text-sm line-clamp-1 leading-tight group-hover:text-pku-red transition-colors">
              {displayTitle}
            </h3>
          </div>

          {/* Metadata Row */}
          <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-500">
            <span className="bg-gray-50 px-1 rounded border border-gray-100 truncate max-w-[60px]">{activity.category}</span>
            <div className="flex items-center gap-0.5">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span>{activity.date}</span>
            </div>
            <div className="flex items-center gap-0.5 truncate max-w-[100px]">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="truncate">{activity.location}</span>
            </div>
          </div>

          {/* Absolute Positioned Actions to remove vertical whitespace */}
          
          {/* Top Right: Save Heart */}
          {onToggleSave && (
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleSave(activity.id); }}
              className={`absolute top-2 right-2 p-1 rounded-full transition-colors z-10 ${
                isSaved 
                  ? 'text-pku-red' 
                  : 'text-gray-300 hover:text-pku-red'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}

          {/* Bottom Right: Status Button */}
          <div className="absolute bottom-2 right-2">
             <button 
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                isJoined 
                  ? 'bg-green-50 text-green-600 border border-green-100'
                  : 'bg-pku-red text-white'
              }`}
            >
              {isJoined 
                ? (isEnglish ? 'Joined' : '已报名') 
                : (isEnglish ? 'Detail' : '详情')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};