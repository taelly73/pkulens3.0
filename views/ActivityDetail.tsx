import React, { useState } from 'react';
import { Activity } from '../types';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Share2, Heart, CheckCircle, ExternalLink, X, QrCode } from 'lucide-react';

interface ActivityDetailProps {
  activity: Activity;
  isEnglish: boolean;
  isJoined: boolean;
  isSaved?: boolean;
  onBack: () => void;
  onJoin: (id: string) => void;
  onToggleSave: (id: string) => void;
}

export const ActivityDetail: React.FC<ActivityDetailProps> = ({
  activity,
  isEnglish,
  isJoined,
  isSaved,
  onBack,
  onJoin,
  onToggleSave
}) => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const displayTitle = (isEnglish && activity.titleEn) ? activity.titleEn : activity.title;
  const displayDesc = (isEnglish && activity.descriptionEn) ? activity.descriptionEn : activity.description;
  
  const descriptionParagraphs = displayDesc.split('\n');

  // Handle the registration process
  const handleRegistrationClick = () => {
    if (isJoined) return;
    setShowRegistrationModal(true);
  };

  const confirmRegistration = () => {
    onJoin(activity.id);
    setShowRegistrationModal(false);
  };

  return (
    <div className="bg-white min-h-screen pb-24 animate-fade-in-up relative">
      
      {/* 报名弹窗 / Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all scale-100">
            <div className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-pku-red/10 rounded-full flex items-center justify-center mb-4 text-pku-red">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isEnglish ? 'Official Registration' : '官方报名通道'}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {isEnglish 
                  ? 'Please use the external link or QR code below to complete your registration with the organizer.'
                  : '本平台提供活动聚合服务。请通过下方官方链接或二维码完成最终报名。'}
              </p>

              {/* 外部链接跳转 */}
              {activity.externalLink && (
                 <a 
                   href={activity.externalLink} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center justify-center gap-2 w-full py-3 bg-blue-50 text-blue-700 font-bold rounded-xl mb-4 hover:bg-blue-100 transition-colors"
                 >
                   <ExternalLink className="w-4 h-4" />
                   {isEnglish ? 'Go to Registration Page' : '跳转至官方报名页面'}
                 </a>
              )}

              {/* 模拟二维码展示区域 */}
              <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 mb-6 flex flex-col items-center">
                 {/* 这里是一个通用的二维码占位符，真实项目中可以替换为 activity.qrCodeImage */}
                 <img 
                   src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(activity.externalLink || 'https://www.pku.edu.cn')}`} 
                   alt="Registration QR Code" 
                   className="w-32 h-32 mb-2 mix-blend-multiply"
                 />
                 <span className="text-xs text-gray-400">
                   {isEnglish ? 'Scan with WeChat' : '请使用微信扫码报名'}
                 </span>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowRegistrationModal(false)}
                  className="flex-1 py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                >
                  {isEnglish ? 'Cancel' : '稍后'}
                </button>
                <button 
                  onClick={confirmRegistration}
                  className="flex-1 py-3 bg-pku-red text-white font-bold rounded-xl shadow-md hover:bg-pku-light transition-colors"
                >
                  {isEnglish ? 'I Have Registered' : '我已完成报名'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navbar Placeholder */}
      <div className="h-16 md:hidden"></div>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white z-40 flex items-center justify-between px-4 border-b border-gray-100 md:hidden">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-700">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="font-bold text-gray-900 truncate max-w-[200px]">{displayTitle}</div>
        <button className="p-2 -mr-2 text-gray-700">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Back Button */}
      <div className="hidden md:block max-w-4xl mx-auto pt-24 px-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-pku-red transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          {isEnglish ? 'Back to List' : '返回列表'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto md:bg-white md:rounded-3xl md:shadow-lg md:border md:border-gray-100 md:overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 w-full">
          <img 
            src={activity.image} 
            alt={displayTitle} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-pku-red shadow-sm uppercase tracking-wider">
            {activity.category}
          </div>
        </div>

        <div className="p-5 md:p-10">
          {/* Header Info */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {displayTitle}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-pku-red/10 flex items-center justify-center text-pku-red font-bold text-lg border border-pku-red/20">
                {activity.organizer.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{isEnglish ? 'Organizer' : '主办方'}</p>
                <p className="font-bold text-gray-900">{activity.organizer}</p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-pku-red mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">{isEnglish ? 'Date' : '日期'}</p>
                <p className="text-gray-600">{activity.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-pku-red mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">{isEnglish ? 'Time' : '时间'}</p>
                <p className="text-gray-600">{activity.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-pku-red mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">{isEnglish ? 'Location' : '地点'}</p>
                <p className="text-gray-600">{activity.location}</p>
              </div>
            </div>
             <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-pku-red mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">{isEnglish ? 'Availability' : '名额'}</p>
                <p className="text-gray-600">{activity.registeredCount} / {activity.maxCapacity} {isEnglish ? 'Joined' : '已报名'}</p>
              </div>
            </div>
          </div>

          {/* Activity Description (Full Text) */}
          <div className="mb-20">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-pku-red pl-3">
              {isEnglish ? 'Activity Details' : '活动详情'}
            </h3>
            <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
              {descriptionParagraphs.map((para, index) => (
                <p key={index} className="mb-4 text-justify">
                  {para || (isEnglish ? "No detailed description provided." : "暂无详细描述。")}
                </p>
              ))}
            </div>
            
            {/* 补充说明 */}
            <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-700">
              <strong>💡 {isEnglish ? 'Note:' : '提示：'}</strong> 
              {isEnglish 
                ? ' This activity information is aggregated from official school channels. Please refer to the organizer\'s official announcement for the most up-to-date information.' 
                : ' 本活动信息来源于校内官方渠道聚合。具体变动请以主办方最新通知为准。'}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-6 md:px-0 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button 
            onClick={() => onToggleSave(activity.id)}
            className={`flex flex-col items-center justify-center transition-colors min-w-[60px] ${
              isSaved ? 'text-pku-red' : 'text-gray-500 hover:text-pku-red'
            }`}
          >
             <Heart className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
             <span className="text-xs mt-1">{isSaved ? (isEnglish ? 'Saved' : '已收藏') : (isEnglish ? 'Save' : '收藏')}</span>
          </button>
          
          <button 
            onClick={handleRegistrationClick}
            disabled={isJoined}
            className={`flex-grow py-3.5 rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
              isJoined 
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-gradient-to-r from-pku-red to-red-700 text-white hover:shadow-xl'
            }`}
          >
            {isJoined ? (
              <>
                <CheckCircle className="w-5 h-5" />
                {isEnglish ? 'Registration Successful' : '报名成功'}
              </>
            ) : (
              isEnglish ? 'Register Now' : '立即报名'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};