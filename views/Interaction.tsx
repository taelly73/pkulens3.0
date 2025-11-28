import React, { useState } from 'react';
import { MOCK_POSTS } from '../constants';
import { MessageSquare, Heart, Share2, PlusCircle, X, Send, Search, Users, HelpCircle, MessageCircle, Filter } from 'lucide-react';
import { User, Post, PostTag, Comment } from '../types';

interface InteractionProps {
  isEnglish: boolean;
  user: User;
}

export const Interaction: React.FC<InteractionProps> = ({ isEnglish, user }) => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  
  // Filter State
  const [filterTag, setFilterTag] = useState<PostTag | 'All'>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedTag, setSelectedTag] = useState<PostTag>('Discussion');

  // Comment State
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const tags: PostTag[] = ['Discussion', 'Team Up', 'Lost & Found', 'Help'];

  const categoryCards = [
    { tag: 'All', label: isEnglish ? 'All Posts' : '全部动态', icon: Filter, color: 'bg-gray-100 text-gray-600 border-gray-200', desc: 'Everything' },
    { tag: 'Discussion' as PostTag, label: isEnglish ? 'Discussion' : '话题讨论', icon: MessageCircle, color: 'bg-indigo-50 text-indigo-600 border-indigo-100', desc: 'Trending topics & chat' },
    { tag: 'Team Up' as PostTag, label: isEnglish ? 'Team Up' : '组队大厅', icon: Users, color: 'bg-orange-50 text-orange-600 border-orange-100', desc: 'Find partners' },
    { tag: 'Lost & Found' as PostTag, label: isEnglish ? 'Lost & Found' : '失物招领', icon: Search, color: 'bg-blue-50 text-blue-600 border-blue-100', desc: 'Lost items' },
    { tag: 'Help' as PostTag, label: isEnglish ? 'Help' : '互助求问', icon: HelpCircle, color: 'bg-emerald-50 text-emerald-600 border-emerald-100', desc: 'Q&A' },
  ];

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
      isLiked: false,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setNewPostContent('');
    setSelectedTag('Discussion');
    setFilterTag('All'); // Reset filter to show new post
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

  const toggleComments = (postId: string) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);
    } else {
      setActiveCommentPostId(postId);
    }
  };

  const handleSendComment = (postId: string) => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      user: user.name,
      content: commentText,
      timestamp: isEnglish ? 'Just now' : '刚刚',
      likes: 0
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
          commentsCount: post.commentsCount + 1
        };
      }
      return post;
    }));

    setCommentText('');
  };

  // Filter posts logic
  const displayedPosts = filterTag === 'All' 
    ? posts 
    : posts.filter(post => post.tag === filterTag);

  return (
    <div className="pb-24 pt-20 px-4 max-w-7xl mx-auto min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Facets & Navigation */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{isEnglish ? "Explore" : "探索板块"}</h2>
            <div className="grid grid-cols-1 gap-3">
              {categoryCards.map((cat) => (
                <div 
                  key={cat.tag}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all group ${
                    filterTag === cat.tag ? 'ring-2 ring-offset-1 ring-pku-red/50 shadow-md' : ''
                  } ${cat.color}`}
                  onClick={() => setFilterTag(cat.tag as PostTag | 'All')}
                >
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{cat.label}</h3>
                    <p className="text-xs opacity-70 font-medium">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Topics (Placeholder) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hidden lg:block">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              🔥 {isEnglish ? "Hot Topics" : "热门话题"}
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2 hover:text-pku-red cursor-pointer">
                <span className="text-gray-300">1</span> #126thAnniversary
              </li>
              <li className="flex items-center gap-2 hover:text-pku-red cursor-pointer">
                <span className="text-gray-300">2</span> #CampusMarathon
              </li>
              <li className="flex items-center gap-2 hover:text-pku-red cursor-pointer">
                <span className="text-gray-300">3</span> #LibrarySeats
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Feed */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filterTag === 'All' ? (isEnglish ? "All Posts" : "全部动态") : 
               categoryCards.find(c => c.tag === filterTag)?.label}
            </h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-pku-red text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-pku-light transition-colors shadow-md hover:shadow-lg transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              {isEnglish ? "New Post" : "发布动态"}
            </button>
          </div>

          <div className="space-y-6">
            {displayedPosts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-fade-in hover:shadow-md transition-shadow">
                
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg shadow-inner">
                    {post.user.charAt(0)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900">{post.user}</p>
                        <p className="text-xs text-gray-400">{post.userRole} • {post.timestamp}</p>
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${
                        post.tag === 'Team Up' ? 'bg-orange-50 text-orange-600' :
                        post.tag === 'Lost & Found' ? 'bg-blue-50 text-blue-600' :
                        post.tag === 'Help' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {post.tag}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Post Content */}
                <p className="text-gray-800 text-base mb-4 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                
                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${activeCommentPostId === post.id ? 'text-pku-red' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <MessageSquare className="w-4 h-4" /> 
                    {post.commentsCount > 0 ? post.commentsCount : (isEnglish ? 'Comment' : '评论')}
                  </button>
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${post.isLiked ? 'text-pku-red' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} /> 
                    {post.likes > 0 ? post.likes : (isEnglish ? 'Like' : '点赞')}
                  </button>
                  <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors ml-auto">
                    <Share2 className="w-4 h-4" /> {isEnglish ? 'Share' : '分享'}
                  </button>
                </div>

                {/* Comment Section */}
                {activeCommentPostId === post.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in bg-gray-50/50 -mx-6 px-6 pb-2">
                    {/* Comment List */}
                    <div className="space-y-3 mb-4">
                      {post.comments.length > 0 ? (
                        post.comments.map(comment => (
                          <div key={comment.id} className="flex gap-3 text-sm">
                            <div className="font-bold text-gray-700 flex-shrink-0">{comment.user}:</div>
                            <div className="flex-grow">
                              <span className="text-gray-600">{comment.content}</span>
                              <div className="text-xs text-gray-400 mt-0.5">{comment.timestamp}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-400 text-xs py-2">
                          {isEnglish ? 'No comments yet. Be the first!' : '暂无评论，快来抢沙发~'}
                        </div>
                      )}
                    </div>

                    {/* Comment Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={isEnglish ? "Write a comment..." : "写下你的评论..."}
                        className="flex-grow px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pku-red/20 text-sm bg-white"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendComment(post.id)}
                      />
                      <button 
                        onClick={() => handleSendComment(post.id)}
                        disabled={!commentText.trim()}
                        className="bg-pku-red text-white p-2 rounded-full hover:bg-pku-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {displayedPosts.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-sm bg-white rounded-2xl border border-dashed border-gray-200">
                {isEnglish ? 'No posts in this category.' : '该板块暂无动态。'}
              </div>
            )}
          </div>
        </div>
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
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                      selectedTag === tag 
                        ? 'bg-pku-red text-white border-pku-red' 
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {tag === 'Discussion' && (isEnglish ? 'Discussion' : '话题讨论')}
                    {tag === 'Team Up' && (isEnglish ? 'Team Up' : '组队大厅')}
                    {tag === 'Lost & Found' && (isEnglish ? 'Lost & Found' : '失物招领')}
                    {tag === 'Help' && (isEnglish ? 'Help' : '互助求问')}
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
    </div>
  );
};