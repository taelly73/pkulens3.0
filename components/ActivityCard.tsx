import React from 'react';
import { Activity, UserRole } from '../types';
import { MapPin, Calendar, Users, Clock, ChevronRight } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  userRole: UserRole;
  isEnglish: boolean;
  onViewDetail: (id: string) => void;
  isJoined: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  userRole, 
  isEnglish, 
  onViewDetail,
  isJoined
}) => {
  const displayTitle = (isEnglish && activity.titleEn) ? activity.titleEn : activity.title;
  const displayDesc = (isEnglish && activity.descriptionEn) ? activity.descriptionEn : activity.description;

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full cursor-pointer group"
      onClick={() => onViewDetail(activity.id)}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={activity.image} 
          alt={displayTitle} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-pku-red uppercase tracking-wider">
          {activity.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-pku-red transition-colors">
          {displayTitle}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-pku-red" />
            <span>{activity.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-pku-red" />
            <span className="truncate">{activity.location}</span>
          </div>
        </div>

        <div className="mt-auto">
          <button 
            className={`w-full py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-1 ${
              isJoined 
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'bg-gray-50 text-pku-red hover:bg-red-50'
            }`}
          >
            {isJoined 
              ? (isEnglish ? 'Registered' : '已报名') 
              : (
                <>
                  {isEnglish ? 'View Details' : '查看详情'}
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
          </button>
        </div>
      </div>
    </div>
  );
};