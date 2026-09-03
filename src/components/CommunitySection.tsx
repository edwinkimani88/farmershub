import React, { useState } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MapPin, 
  CheckCircle2, 
  Search, 
  Filter, 
  Plus, 
  Send, 
  X, 
  ShieldCheck, 
  Sparkles,
  User,
  ArrowRight
} from 'lucide-react';
import { CommunityPost, CommunityTopic, County, FarmerProfile, Comment } from '../types';

interface CommunitySectionProps {
  posts: CommunityPost[];
  currentFarmer: FarmerProfile | null;
  selectedCountyFilter: string | null;
  onSelectCountyFilter: (county: string | null) => void;
  onOpenRegister: () => void;
  onAddNewPost: (post: Omit<CommunityPost, 'id' | 'timestamp' | 'repliesCount' | 'likesCount' | 'comments'>) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

const TOPICS: { name: CommunityTopic | 'All'; icon: string }[] = [
  { name: 'All', icon: '🌾' },
  { name: 'Dairy & Cattle', icon: '🐄' },
  { name: 'Poultry', icon: '🐔' },
  { name: 'Goats & Sheep', icon: '🐐' },
  { name: 'Pigs', icon: '🐖' },
  { name: 'Feed & Nutrition', icon: '🌱' },
  { name: 'Weather & Farming', icon: '🌦️' },
  { name: 'Animal Health', icon: '🩺' },
  { name: 'Crops & Agronomy', icon: '🌾' },
  { name: 'General Farm Talk', icon: '💬' },
];

const COUNTIES: string[] = [
  'All Counties',
  'Kiambu',
  'Kericho',
  'Nakuru',
  'Kajiado',
  'Nyeri',
  'Eldoret',
  'Bomet',
  'Machakos'
];

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  posts,
  currentFarmer,
  selectedCountyFilter,
  onSelectCountyFilter,
  onOpenRegister,
  onAddNewPost,
  onLikePost,
  onAddComment
}) => {
  const [selectedTopic, setSelectedTopic] = useState<CommunityTopic | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePostModal, setActivePostModal] = useState<CommunityPost | null>(null);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  // New post form state
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTopic, setNewPostTopic] = useState<CommunityTopic>('Dairy & Cattle');
  const [newPostCounty, setNewPostCounty] = useState<County>('Kiambu');
  const [newPostLivestock, setNewPostLivestock] = useState('Dairy & Cattle');

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesTopic = selectedTopic === 'All' || post.topic === selectedTopic;
    const matchesCounty = !selectedCountyFilter || selectedCountyFilter === 'All Counties' || post.authorCounty.toLowerCase().includes(selectedCountyFilter.toLowerCase());
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorCounty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesCounty && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    onAddNewPost({
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      author: currentFarmer ? currentFarmer.name : 'Mkulima Mwenzetu',
      authorCounty: currentFarmer ? currentFarmer.county : newPostCounty,
      livestock: newPostLivestock,
      topic: newPostTopic,
    });

    setNewPostTitle('');
    setNewPostContent('');
    setIsNewPostModalOpen(false);
  };

  const handlePostCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !activePostModal) return;

    onAddComment(activePostModal.id, commentInput.trim());
    setCommentInput('');
  };

  // Sync active post details when posts update
  const currentModalPost = activePostModal 
    ? posts.find(p => p.id === activePostModal.id) || activePostModal
    : null;

  return (
    <section id="community" className="py-16 sm:py-24 bg-[#F7F8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header with Title and "Post Discussion" Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E3EDE0] border border-[#CFDFCB] text-[#1B4332] text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
              <span>LIVE FARMER COMMUNITY • JAMII YA WAKULIMA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152B1E] tracking-tight">
              What Are You Seeing <span className="text-[#2D6A4F] font-script text-4xl sm:text-5xl font-bold">Kwa Shamba?</span>
            </h2>

            <p className="text-sm sm:text-base text-[#42594A]">
              Real questions, real feed prices, and honest solutions from Kenyan farmers and verified veterinary experts. 
              <strong> Hakuna gatekeeping.</strong>
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsNewPostModalOpen(true)}
              className="inline-flex items-center space-x-2 bg-[#1B4332] hover:bg-[#143525] text-white text-sm sm:text-base font-bold py-3.5 px-6 rounded-full shadow-md transition-all active:scale-98 group"
            >
              <Plus className="w-4 h-4 text-[#95D5B2]" />
              <span>Uliza Swali / Post Topic</span>
            </button>
          </div>
        </div>

        {/* Filter Controls: Topics + County Selector + Search */}
        <div className="bg-white border border-[#DCE6D7] rounded-2xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          
          {/* Top Search and County Selector Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-[#7A9382] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tafuta topic: e.g. 'eggs', 'cold weather', 'silage', 'mastitis'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] text-[#1B4332] placeholder-[#8EA596]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* County dropdown */}
            <div className="w-full sm:w-auto flex items-center space-x-2">
              <Filter className="w-4 h-4 text-[#2D6A4F] hidden sm:inline" />
              <select
                value={selectedCountyFilter || 'All Counties'}
                onChange={(e) => onSelectCountyFilter(e.target.value === 'All Counties' ? null : e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-sm font-semibold text-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 cursor-pointer"
              >
                {COUNTIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Topic Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            {TOPICS.map((topic) => (
              <button
                key={topic.name}
                onClick={() => setSelectedTopic(topic.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 flex items-center space-x-1.5 ${
                  selectedTopic === topic.name
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-[#EFF5EC] text-[#36503E] hover:bg-[#E2EDE0]'
                }`}
              >
                <span>{topic.icon}</span>
                <span>{topic.name}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Discussions Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#DCE6D7] p-8 space-y-3">
            <div className="text-4xl">🌾</div>
            <h3 className="text-lg font-bold text-[#183525]">Hakuna discussions zinazo match hiyo search</h3>
            <p className="text-sm text-[#5C7565]">
              Be the first farmer to start a conversation in {selectedCountyFilter || 'this topic'}!
            </p>
            <button
              onClick={() => setIsNewPostModalOpen(true)}
              className="mt-2 inline-flex items-center space-x-2 bg-[#2D6A4F] text-white px-5 py-2 rounded-full text-sm font-bold shadow-xs hover:bg-[#1B4332]"
            >
              <Plus className="w-4 h-4" />
              <span>Anzisha Mazungumzo</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setActivePostModal(post)}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D8E3D2] shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  
                  {/* Post Badges */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EAF2E7] text-[#2D6A4F] font-bold text-[11px]">
                      {post.topic}
                    </span>
                    <div className="flex items-center space-x-1 text-[#668070] text-[11px] font-medium">
                      <MapPin className="w-3 h-3 text-[#2D6A4F]" />
                      <span>{post.authorCounty}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#163321] group-hover:text-[#2D6A4F] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-[#4E6656] line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Verified Vet Badge Highlight if expert commented */}
                  {post.verifiedExpertReplied && (
                    <div className="p-2.5 rounded-xl bg-[#F0F7EE] border border-[#CFE3CA] flex items-center space-x-2 text-[11px] text-[#1E4D34] font-semibold">
                      <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                      <span className="truncate">Farmers Hub Vet ✓ has answered this question</span>
                    </div>
                  )}

                </div>

                {/* Card Footer: Author & Metrics */}
                <div className="pt-4 mt-4 border-t border-[#EDF3EA] flex items-center justify-between text-xs text-[#526D5B]">
                  <div className="flex items-center space-x-2 truncate">
                    <div className="w-6 h-6 rounded-full bg-[#E5EDE2] text-[#2D6A4F] flex items-center justify-center font-bold text-xs shrink-0">
                      {post.author.charAt(0)}
                    </div>
                    <span className="truncate font-semibold text-[#1E3B29]">{post.author}</span>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikePost(post.id);
                      }}
                      className="flex items-center space-x-1 hover:text-[#2D6A4F] transition-colors"
                      aria-label="Like post"
                    >
                      <Heart className={`w-3.5 h-3.5 ${post.userLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{post.likesCount}</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>{post.repliesCount}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Bottom Community Promise */}
        <div className="mt-12 text-center p-6 bg-[#EBF2E7] rounded-2xl border border-[#D2E2CE] max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center space-x-2 text-[#1B4332] font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
            <span>Nurturing Everyday Kenyan Farming Success</span>
          </div>
          <p className="text-xs sm:text-sm text-[#48604F]">
            Every registered member gets access to verified community wisdom, direct answers from KVB registered veterinarians, and regional pricing alerts.
          </p>
        </div>

      </div>

      {/* =========================================================
          POST DETAIL & DISCUSSION MODAL
         ========================================================= */}
      {currentModalPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#DCE6D7] max-h-[90vh] flex flex-col overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#EDF3EA] flex items-start justify-between gap-4 bg-[#FAFBF8]">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EAF2E7] text-[#2D6A4F] font-bold text-xs">
                    {currentModalPost.topic}
                  </span>
                  <span className="text-xs text-[#6C8575] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#2D6A4F]" />
                    {currentModalPost.authorCounty} • {currentModalPost.livestock}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#153120] leading-snug">
                  {currentModalPost.title}
                </h3>
                <div className="flex items-center space-x-2 text-xs text-[#526B5A] mt-1">
                  <span>Posted by <strong>{currentModalPost.author}</strong></span>
                  <span>•</span>
                  <span>{currentModalPost.timestamp}</span>
                </div>
              </div>

              <button
                onClick={() => setActivePostModal(null)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Main Post Content + Comments list */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Main Content */}
              <div className="bg-[#F8FAF6] p-4 sm:p-5 rounded-2xl border border-[#E3ECE0] text-[#2C4234] text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                {currentModalPost.content}
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between text-xs text-[#587362] border-b border-[#EDF3EA] pb-4">
                <button
                  onClick={() => onLikePost(currentModalPost.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#EFF5EC] hover:bg-[#E2EDE0] font-bold text-[#1B4332] transition-colors"
                >
                  <Heart className={`w-4 h-4 ${currentModalPost.userLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{currentModalPost.likesCount} Wakulima liked this</span>
                </button>

                <div className="flex items-center space-x-1.5 text-xs font-semibold">
                  <MessageSquare className="w-4 h-4 text-[#2D6A4F]" />
                  <span>{currentModalPost.comments.length} Replies</span>
                </div>
              </div>

              {/* Comments Stream */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                  Farmer & Vet Responses
                </h4>

                {currentModalPost.comments.length === 0 ? (
                  <div className="text-center py-8 text-xs text-[#7A9383] bg-[#FBFDFB] rounded-xl border border-dashed border-[#CFDFCB]">
                    Be the first to share your experience with {currentModalPost.author}!
                  </div>
                ) : (
                  currentModalPost.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-4 rounded-2xl text-xs sm:text-sm space-y-2 ${
                        comment.isVetVerified
                          ? 'bg-[#EBF5E7] border-2 border-[#52B788]/60 shadow-xs'
                          : 'bg-[#FAFBF9] border border-[#E7EFE4]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {comment.avatar ? (
                            <img
                              src={comment.avatar}
                              alt={comment.author}
                              className="w-7 h-7 rounded-full object-cover border border-[#2D6A4F]"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center font-bold text-xs">
                              {comment.author.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="font-bold text-[#183525]">{comment.author}</span>
                              {comment.isVetVerified && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#2D6A4F] text-white text-[10px] font-bold">
                                  Farmers Hub Vet ✓
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#5C7765]">
                              {comment.authorLocation} • {comment.timestamp}
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] text-[#698573] font-medium flex items-center gap-1">
                          <Heart className="w-3 h-3 text-[#2D6A4F]" />
                          <span>{comment.likes}</span>
                        </div>
                      </div>

                      <p className="text-[#324B3B] leading-relaxed pl-9">
                        {comment.content}
                      </p>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Comment Input Box */}
            <form onSubmit={handlePostCommentSubmit} className="p-4 sm:p-5 border-t border-[#EDF3EA] bg-[#FAFBF8] flex items-center space-x-3">
              <input
                type="text"
                placeholder={currentFarmer ? `Jibu swali hapa kama ${currentFarmer.name}...` : 'Share your shamba experience or advice...'}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border border-[#D2DEC9] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] text-[#1B4332]"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="inline-flex items-center space-x-1.5 bg-[#1B4332] hover:bg-[#143525] disabled:opacity-40 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl transition-colors shadow-xs"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </div>
      )}

      {/* =========================================================
          NEW POST / ULIZA SWALI MODAL
         ========================================================= */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-[#DCE6D7] overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-5 sm:p-6 border-b border-[#EDF3EA] flex items-center justify-between bg-[#FAFBF8]">
              <div>
                <h3 className="text-xl font-extrabold text-[#173523]">
                  Uliza Swali • Start Shamba Talk
                </h3>
                <p className="text-xs text-[#52796F] mt-0.5">
                  Connect with local farmers and verified field vets in your county.
                </p>
              </div>

              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-5 sm:p-6 space-y-4">
              
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1B4332]">
                  Headline / Swali lako (e.g. “Ng'ombe wangu amepunguza maziwa...”)
                </label>
                <input
                  type="text"
                  required
                  placeholder="What are you seeing kwa shamba?"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F9FAF7] border border-[#D5E1D0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 text-[#1B4332]"
                />
              </div>

              {/* Topic and County Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1B4332]">Category / Topic</label>
                  <select
                    value={newPostTopic}
                    onChange={(e) => setNewPostTopic(e.target.value as CommunityTopic)}
                    className="w-full px-3 py-2.5 bg-[#F9FAF7] border border-[#D5E1D0] rounded-xl text-xs font-semibold text-[#1B4332] focus:outline-none"
                  >
                    <option value="Dairy & Cattle">🐄 Dairy & Cattle</option>
                    <option value="Poultry">🐔 Poultry</option>
                    <option value="Goats & Sheep">🐐 Goats & Sheep</option>
                    <option value="Pigs">🐖 Pigs</option>
                    <option value="Feed & Nutrition">🌱 Feed & Nutrition</option>
                    <option value="Weather & Farming">🌦️ Weather & Farming</option>
                    <option value="Animal Health">🩺 Animal Health</option>
                    <option value="Crops & Agronomy">🌾 Crops & Agronomy</option>
                    <option value="General Farm Talk">💬 General Farm Talk</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1B4332]">Shamba County</label>
                  <select
                    value={currentFarmer ? currentFarmer.county : newPostCounty}
                    onChange={(e) => setNewPostCounty(e.target.value as County)}
                    disabled={!!currentFarmer}
                    className="w-full px-3 py-2.5 bg-[#F9FAF7] border border-[#D5E1D0] rounded-xl text-xs font-semibold text-[#1B4332] focus:outline-none"
                  >
                    {COUNTIES.filter(c => c !== 'All Counties').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Content Body */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1B4332]">
                  Maelezo kamili (Provide details: breed, age, feeds, weather signs)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain what has changed: unawalisha nini, dalili gani umeanza kuona, or any remedies you have tried..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full p-4 bg-[#F9FAF7] border border-[#D5E1D0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 text-[#1B4332]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-[#556F5E] hover:text-[#183525]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#143525] text-white text-xs sm:text-sm font-bold rounded-full shadow-md"
                >
                  Share kwa Community
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  );
};
