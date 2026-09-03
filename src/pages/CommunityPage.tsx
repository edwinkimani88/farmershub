import React, { useState } from 'react';
import { MOCK_COMMUNITY_POSTS } from '../data/mockData';
import { CommunityPost, County, FarmerProfile } from '../types';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  CheckCircle2, 
  Filter, 
  Send, 
  Plus, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface CommunityPageProps {
  currentFarmer: FarmerProfile | null;
  onOpenAuth: () => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ currentFarmer, onOpenAuth }) => {
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [selectedCounty, setSelectedCounty] = useState<string>('All');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostAnimal, setNewPostAnimal] = useState('Poultry');
  const [isPosting, setIsPosting] = useState(false);

  const counties = ['All', 'Kiambu', 'Nakuru', 'Eldoret / Uasin Gishu', 'Kericho', 'Kajiado'];

  const filteredPosts = selectedCounty === 'All'
    ? posts
    : posts.filter(p => p.authorCounty === selectedCounty);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    if (!currentFarmer) {
      onOpenAuth();
      return;
    }

    setIsPosting(true);
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: currentFarmer.name,
      authorCounty: currentFarmer.county,
      livestock: newPostAnimal,
      topic: 'General Farm Talk',
      timestamp: 'Just now',
      title: `${newPostAnimal} Update from ${currentFarmer.county}`,
      content: newPostContent,
      likesCount: 1,
      repliesCount: 0,
      userLiked: true,
      verifiedExpertReplied: false,
      comments: []
    };

    setTimeout(() => {
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setIsPosting(false);
    }, 600);
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likesCount: post.likesCount + 1 } : post
    ));
  };

  return (
    <div className="bg-[#FAF8F2] min-h-screen py-8 sm:py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10">
        <div className="bg-[#04361A] text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-[#04361A]">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#419C09]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-[#FFB70F] text-[#04361A] text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
              <Users className="w-4 h-4" /> Baraza la Wakulima Kenya
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-3">
              Real Farm Wisdom from Everyday Wakulima
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
              Share real farm experiences, feed price updates in your local depot, disease alerts, and get advice verified by on-duty KVB field veterinarians.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Create Post Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#04361A]/10 shadow-sm">
              <h3 className="font-extrabold text-base text-[#04361A] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#419C09]" />
                <span>Uliza Swali au Shiriki Uzoefu Wako Shambani</span>
              </h3>

              <form onSubmit={handleCreatePost} className="space-y-3">
                <textarea
                  rows={3}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder={currentFarmer ? `Habari ${currentFarmer.name.split(' ')[0]}, unataka kushiriki nini leo kuhusu mifugo yako?` : "Log in to post your farm question or story..."}
                  className="w-full bg-[#FAF8F2] border border-[#04361A]/15 rounded-2xl p-4 text-sm text-[#04361A] placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-[#419C09]"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#04361A]">Animal:</span>
                    <select
                      value={newPostAnimal}
                      onChange={(e) => setNewPostAnimal(e.target.value)}
                      className="bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#04361A]"
                    >
                      <option value="Poultry">Poultry (Kuku)</option>
                      <option value="Dairy Cattle">Dairy Cattle (Ng'ombe)</option>
                      <option value="Pigs">Pigs (Nguruwe)</option>
                      <option value="Dairy Goats">Goats & Sheep (Mbuzi/Kondoo)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isPosting}
                    className="px-6 py-2.5 bg-[#419C09] hover:bg-[#04361A] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post to Community</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl p-6 border border-[#04361A]/10 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#04361A] text-white flex items-center justify-center font-bold text-xs">
                        {post.author.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-[#04361A]">{post.author}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#419C09]/15 text-[#04361A]">
                            {post.authorCounty}
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-400">{post.timestamp}</span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#419C09] bg-[#FAF8F2] px-2.5 py-1 rounded-lg border border-[#04361A]/10">
                      {post.livestock}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#04361A] mb-2">{post.title}</h3>
                  <p className="text-sm text-neutral-700 leading-relaxed mb-4">{post.content}</p>

                  {post.verifiedExpertReplied && (
                    <div className="bg-[#419C09]/10 border border-[#419C09]/30 rounded-2xl p-4 mb-4 text-xs">
                      <div className="flex items-center gap-1.5 text-[#04361A] font-extrabold mb-1">
                        <CheckCircle2 className="w-4 h-4 text-[#419C09]" />
                        <span>Verified Field Vet Advice • Dr. Mwangi (KVB #2948)</span>
                      </div>
                      <p className="text-neutral-700">
                        "Make sure to test water hardness and keep chicks warm. Use multi-vitamin soluble for the first 3 days to prevent brooding losses."
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-[#04361A]/10 text-xs text-neutral-600 font-semibold">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 hover:text-[#419C09] transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likesCount} Wakulima Agree</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.repliesCount || 2} Comments</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* County Filter Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#04361A]/10 shadow-sm">
              <h4 className="font-extrabold text-sm text-[#04361A] mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#419C09]" /> Filter by County
              </h4>
              <div className="space-y-1.5">
                {counties.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCounty(c)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                      selectedCounty === c
                        ? 'bg-[#04361A] text-white'
                        : 'text-neutral-700 hover:bg-[#FAF8F2]'
                    }`}
                  >
                    <span>{c} {c !== 'All' ? 'County' : 'Wakulima'}</span>
                    {selectedCounty === c && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Farm Topics */}
            <div className="bg-white rounded-3xl p-6 border border-[#04361A]/10 shadow-sm">
              <h4 className="font-extrabold text-sm text-[#04361A] mb-3">Trending in Kenyan Farming</h4>
              <ul className="space-y-3 text-xs text-neutral-700">
                <li className="p-2.5 rounded-xl bg-[#FAF8F2]">
                  <strong className="block text-[#04361A]">Broiler Day-Old Chick Prices:</strong>
                  <span>Kenyawide rates currently holding at KES 95 - 110 per chick.</span>
                </li>
                <li className="p-2.5 rounded-xl bg-[#FAF8F2]">
                  <strong className="block text-[#04361A]">Dairy Maize Silage Pits:</strong>
                  <span>Farmers in Nakuru sharing tips on molasses ratios to fight mold.</span>
                </li>
                <li className="p-2.5 rounded-xl bg-[#FAF8F2]">
                  <strong className="block text-[#04361A]">Gumboro Outbreak Alert:</strong>
                  <span>Kiambu vets recommending booster vaccinations at day 18.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
