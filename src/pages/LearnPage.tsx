import React, { useState } from 'react';
import { MOCK_LEARN_ARTICLES } from '../data/shopAndLivestockData';
import { LearningArticle } from '../types';
import { BookOpen, Clock, UserCheck, ArrowRight, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react';

export const LearnPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<LearningArticle | null>(null);

  return (
    <div className="bg-[#FAF8F2] min-h-screen py-8 sm:py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10">
        <div className="bg-[#04361A] text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-[#04361A]">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#419C09]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-[#FFB70F] text-[#04361A] text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4" /> Masomo ya Shamba
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-3">
              Kenyan Livestock & Poultry Knowledge Base
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
              Field-tested guides written by licensed veterinarians and animal nutritionists. Zero textbook jargon — purely practical steps to cut mortality, boost milk yield, and lower your feed bill.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_LEARN_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl border border-[#04361A]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#04361A]/90 backdrop-blur-xs text-white text-[11px] font-extrabold px-3 py-1 rounded-lg">
                    {article.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#419C09]" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span>{article.publishDate}</span>
                  </div>

                  <h3 className="font-extrabold text-lg text-[#04361A] mb-1 leading-snug group-hover:text-[#419C09] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-500 italic mb-3">
                    {article.swahiliTitle}
                  </p>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                    {article.summary}
                  </p>

                  <div className="bg-[#FAF8F2] p-3 rounded-xl border border-[#04361A]/10 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-[#419C09] block">
                      Key Takeaway:
                    </span>
                    <p className="text-xs text-neutral-700 font-medium line-clamp-2">
                      "{article.keyTakeaways[0]}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="w-full py-3 bg-[#04361A] hover:bg-[#419C09] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F2] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#04361A]/15 overflow-hidden my-8 max-h-[85vh] flex flex-col">
            <div className="relative h-64 shrink-0">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              <div>
                <span className="text-xs font-bold text-[#419C09] uppercase tracking-wider">
                  {selectedArticle.category} • {selectedArticle.readTime}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#04361A] mt-1 mb-2">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <UserCheck className="w-4 h-4 text-[#419C09]" />
                  <span>By {selectedArticle.author} ({selectedArticle.authorRole})</span>
                </div>
              </div>

              <div className="bg-[#FFB70F]/15 p-4 rounded-2xl border border-[#FFB70F]/40">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#04361A] mb-2">
                  The Golden Rules from this Masterclass:
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-800">
                  {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#419C09] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6 text-sm text-neutral-700 leading-relaxed">
                {selectedArticle.contentSections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <h3 className="font-extrabold text-lg text-[#04361A]">
                      {section.heading}
                    </h3>
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                    {section.swahiliTip && (
                      <div className="p-3.5 bg-white rounded-xl border-l-4 border-[#419C09] text-xs italic font-medium text-[#04361A]">
                        {section.swahiliTip}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#04361A]/10">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full py-3 bg-[#04361A] hover:bg-[#419C09] text-white font-bold text-sm rounded-xl shadow-md transition-colors"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
