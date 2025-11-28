import React, { useState } from 'react';
import { MOCK_POSTS } from '../constants';
import { MessageSquare, Heart, Share2, PlusCircle, X, Send } from 'lucide-react';
import { User, Post, PostTag } from '../types';

interface InteractionProps {
  isEnglish: boolean;
  user: User;
}

export const Interaction: React.FC<InteractionProps> = ({ isEnglish, user }) => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedTag, setSelectedTag] = useState<PostTag>('Discussion');

  const tags: PostTag[] = ['Discussion', 'Team Up', 'Lost & Found', 'Help'];

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: `new-${Date.now()}`,
      user: user.name,
      userRole: user.role,
      content: newPostContent,
      tag: selectedTag,
      timestamp: isEnglish ? 'Just now' : '刚刚',
      likes: 0,
      commentsCount: 0,
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setNewPostContent('');
    setSelectedTag('Discussion');
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  return (
    <div className="pb-24 pt-4 md:pt-20 px-4 max-w-3xl mx-auto min-h-screen">
       <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEnglish ? "Interaction Center" : "互动中心"}
          </h2>
          <p className="text-sm text-gray-500">
            {isEnglish ? "Find teammates & discuss events" : "寻找队友，讨论热门活动"}
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-pku-red text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-pku-light transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          {isEnglish ? "New Post" : "发帖"}
        </button>
      </div>

      {/* Post Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">{isEnglish ? 'Create Post' : '发布动态'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedTag === tag 
                        ? 'bg-pku-red text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag === 'Discussion' && (isEnglish ? 'Discussion' : '讨论')}
                    {tag === 'Team Up' && (isEnglish ? 'Team Up' : '组队')}
                    {tag === 'Lost & Found' && (isEnglish ? 'Lost & Found' : '失物招领')}
                    {tag === 'Help' && (isEnglish ? 'Help' : '求助')}
                  </button>
                ))}
              </div>

              <textarea
                className="w-full h-32 p-3 bg-gray-50 rounded-xl border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-pku-red/20 text-sm"
                placeholder={isEnglish ? "What's on your mind?" : "分享你的想法..."}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
               <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-500 font-medium hover:bg-gray-200 rounded-lg transition-colors"
              >
                {isEnglish ? 'Cancel' : '取消'}
              </button>
              <button 
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
                className="px-4 py-2 bg-pku-red text-white text-sm font-bold rounded-lg hover:bg-pku-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                {isEnglish ? 'Post' : '发布'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories / Quick Filters (Visual Only for now) */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 cursor-pointer hover:shadow-md transition-all group">
          <h3 className="font-bold text-orange-800 mb-1 group-hover:text-orange-900">{isEnglish ? "Team Up" : "组队大厅"}</h3>
          <p className="text-xs text-orange-600">Find partners for sports, games, and projects.</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 cursor-pointer hover:shadow-md transition-all group">
          <h3 className="font-bold text-blue-800 mb-1 group-hover:text-blue-900">{isEnglish ? "Lost & Found" : "失物招领"}</h3>
          <p className="text-xs text-blue-600">Campus items lost and found.</p>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
             <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
                {post.user.charAt(0)}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{post.user}</p>
                    <p className="text-xs text-gray-400">{post.userRole} • {post.timestamp}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    post.tag === 'Team Up' ? 'bg-orange-100 text-orange-600' :
                    post.tag === 'Lost & Found' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {post.tag}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-800 text-sm mb-4 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            
            <div className="flex items-center gap-6 text-gray-500 text-xs">
              <button 
                className="flex items-center gap-1 hover:text-pku-red transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> {post.commentsCount}
              </button>
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1 transition-colors ${post.isLiked ? 'text-pku-red' : 'hover:text-pku-red'}`}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} /> {post.likes}
              </button>
              <button className="flex items-center gap-1 hover:text-pku-red transition-colors">
                <Share2 className="w-4 h-4" /> {isEnglish ? 'Share' : '分享'}
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            {isEnglish ? 'No posts yet. Be the first to share!' : '暂无动态，快来发布第一条吧！'}
          </div>
        )}
      </div>
    </div>
  );
};