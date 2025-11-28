import React, { useState } from 'react';
import { Activity, ActivityCategory } from '../types';
import { PlusCircle, Image as ImageIcon } from 'lucide-react';

interface PublishProps {
  isEnglish: boolean;
  onPublish: (activity: Activity) => void;
}

export const Publish: React.FC<PublishProps> = ({ isEnglish, onPublish }) => {
  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    date: '',
    time: '',
    location: '',
    category: ActivityCategory.ACADEMIC,
    description: '',
    capacity: 100
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newActivity: Activity = {
      id: Date.now().toString(),
      title: formData.title,
      organizer: formData.organizer,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      category: formData.category,
      description: formData.description,
      image: `https://picsum.photos/400/250?random=${Date.now()}`,
      tags: [formData.category],
      registeredCount: 0,
      maxCapacity: formData.capacity,
      status: 'upcoming'
    };
    onPublish(newActivity);
    alert(isEnglish ? 'Activity Published Successfully!' : '活动发布成功！');
    setFormData({
      title: '', organizer: '', date: '', time: '', location: '', 
      category: ActivityCategory.ACADEMIC, description: '', capacity: 100
    });
  };

  return (
    <div className="pb-24 pt-20 px-4 max-w-2xl mx-auto min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Publish Activity' : '发布新活动'}</h2>
        <p className="text-gray-500 text-sm mt-1">
          {isEnglish ? 'Contribute to the remaining data points (Currently 5 existing)' : '为您预留的数据录入接口（当前已有5条数据）'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{isEnglish ? 'Activity Title' : '活动名称'}</label>
          <input
            required
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pku-red focus:border-transparent outline-none transition-all"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isEnglish ? 'Date' : '日期'}</label>
            <input
              required
              type="date"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pku-red outline-none"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isEnglish ? 'Time' : '时间'}</label>
            <input
              required
              type="text"
              placeholder="e.g. 14:00 - 16:00"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pku-red outline-none"
              value={formData.time}
              onChange={e => setFormData({...formData, time: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">{isEnglish ? 'Organizer' : '主办方'}</label>
             <input
              required
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pku-red outline-none"
              value={formData.organizer}
              onChange={e => setFormData({...formData, organizer: e.target.value})}
            />
          </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">{isEnglish ? 'Location' : '地点'}</label>
             <input
              required
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pku-red outline-none"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{isEnglish ? 'Category' : '分类'}</label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pku-red outline-none bg-white"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value as ActivityCategory})}
          >
            {Object.values(ActivityCategory).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">{isEnglish ? 'Description' : '活动详情'}</label>
           <textarea
             required
             rows={4}
             className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pku-red outline-none"
             value={formData.description}
             onChange={e => setFormData({...formData, description: e.target.value})}
           />
        </div>

        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400">
           <ImageIcon className="w-8 h-8 mb-2" />
           <span className="text-xs">{isEnglish ? 'Upload Cover Image (Optional)' : '上传封面图（可选）'}</span>
        </div>

        <button 
          type="submit"
          className="w-full bg-pku-red text-white py-3 rounded-xl font-bold hover:bg-pku-light transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          {isEnglish ? 'Publish Activity' : '确认发布'}
        </button>

      </form>
    </div>
  );
};