import React, { useState } from 'react';
import { MOCK_LIVESTOCK_GUIDES } from '../data/shopAndLivestockData';
import { LivestockSpeciesGuide } from '../types';
import { 
  Egg, 
  ShieldCheck, 
  Calendar, 
  AlertTriangle, 
  Sprout, 
  CheckCircle2, 
  ArrowRight,
  Info,
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LivestockPage: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<LivestockSpeciesGuide>(MOCK_LIVESTOCK_GUIDES[0]); // Default Poultry!
  const [activeTab, setActiveTab] = useState<'breeds' | 'feeding' | 'diseases' | 'vaccines'>('breeds');

  return (
    <div className="bg-[#FAF8F2] min-h-screen py-8 sm:py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10">
        <div className="bg-[#04361A] text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-[#04361A]">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#419C09]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-20 bottom-4 w-40 h-40 bg-[#FFB70F]/15 rounded-full blur-xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#FFB70F] text-[#04361A] text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4">
              <Egg className="w-4 h-4" /> Multi-Species Shamba Protocols
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              Livestock & Poultry Production Guides
            </h1>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-medium mb-6">
              Practical Kenyan protocols for Poultry (Layers, Broilers, Kienyeji), Dairy Cattle, Pigs, Goats, Sheep, and Horses. Real vaccination schedules, least-cost feeding tables, and disease outbreak triage.
            </p>

            {/* Quick Species Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {MOCK_LIVESTOCK_GUIDES.map((guide) => {
                const isSelected = selectedGuide.id === guide.id;
                return (
                  <button
                    key={guide.id}
                    onClick={() => {
                      setSelectedGuide(guide);
                      setActiveTab('breeds');
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#FFB70F] text-[#04361A] shadow-md scale-105'
                        : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-xs'
                    }`}
                  >
                    {guide.category === 'Poultry' && <span>🐔</span>}
                    {guide.category === 'Dairy Cattle' && <span>🐄</span>}
                    {guide.category === 'Pigs' && <span>🐖</span>}
                    {guide.category === 'Dairy Goats' && <span>🐐</span>}
                    {guide.category === 'Meat Goats & Sheep' && <span>🐑</span>}
                    {guide.category === 'Horses' && <span>🐎</span>}
                    <span>{guide.category}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Species Deep Dive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl border border-[#04361A]/10 shadow-sm p-6 sm:p-10 mb-10">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#04361A]/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#419C09]">
                  {selectedGuide.category}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-xs font-medium text-neutral-500 italic">
                  {selectedGuide.swahiliName}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#04361A]">
                {selectedGuide.name}
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                {selectedGuide.tagline}
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                to="/shop"
                className="px-5 py-2.5 bg-[#419C09] hover:bg-[#04361A] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>View {selectedGuide.category} Feeds & Meds</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Importance & Kenyan Pro Tip */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
            <div className="lg:col-span-2 bg-[#FAF8F2] p-5 rounded-2xl border border-[#04361A]/10 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <h4 className="font-bold text-[#04361A] text-sm mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#419C09]" /> Agricultural Context in Kenya
              </h4>
              <p>{selectedGuide.importanceInKenya}</p>
            </div>

            <div className="bg-[#FFB70F]/15 p-5 rounded-2xl border border-[#FFB70F]/40 text-xs sm:text-sm text-[#04361A] leading-relaxed">
              <h4 className="font-black text-[#04361A] text-sm mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#419C09]" /> Mkulima Pro-Tip
              </h4>
              <p className="font-medium italic">"{selectedGuide.kenyanProTip}"</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-[#04361A]/10 pb-3 mb-8 overflow-x-auto scrollbar-none">
            {[
              { id: 'breeds', label: 'Key Kenyan Breeds & Yields' },
              { id: 'feeding', label: 'Feeding Charts & Daily Ration' },
              { id: 'diseases', label: 'Critical Diseases & Triage' },
              { id: 'vaccines', label: 'Routine Vaccination Calendar' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#04361A] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-[#04361A] hover:bg-neutral-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Breeds */}
          {activeTab === 'breeds' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedGuide.keyBreeds.map((breed, bIdx) => (
                <div key={bIdx} className="bg-[#FAF8F2] rounded-2xl border border-[#04361A]/10 overflow-hidden flex flex-col">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-black text-base text-[#04361A] mb-1">
                        {breed.name}
                      </h4>
                      <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
                        {breed.traits}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#04361A]/10 bg-white -mx-5 -mb-5 p-4">
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">Performance & Yield</span>
                      <span className="text-xs font-black text-[#419C09]">{breed.yield}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Feeding Charts */}
          {activeTab === 'feeding' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#04361A] text-white">
                      <th className="p-3.5 rounded-tl-xl font-bold">Growth Stage / Period</th>
                      <th className="p-3.5 font-bold">Recommended Feed Formulation</th>
                      <th className="p-3.5 rounded-tr-xl font-bold">Daily Quantity per Animal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#04361A]/10 bg-[#FAF8F2]">
                    {selectedGuide.nutritionAndFeedChart.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white transition-colors">
                        <td className="p-3.5 font-bold text-[#04361A]">{row.stage}</td>
                        <td className="p-3.5 text-neutral-700">{row.feedType}</td>
                        <td className="p-3.5 font-semibold text-[#419C09]">{row.quantityPerDay}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#FAF8F2] p-5 rounded-2xl border border-[#04361A]/10">
                <h4 className="font-bold text-sm text-[#04361A] mb-2">Housing & Cleanliness Rules:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedGuide.housingAndBiosecurity.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-[#419C09] shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Diseases */}
          {activeTab === 'diseases' && (
            <div className="space-y-4">
              {selectedGuide.criticalDiseases.map((d, dIdx) => (
                <div key={dIdx} className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#04361A]/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h4 className="font-black text-base text-[#04361A]">{d.disease}</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-neutral-200">
                      <span className="font-bold text-neutral-700 block mb-1">Symptoms:</span>
                      <p className="text-neutral-600">{d.symptoms}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-neutral-200">
                      <span className="font-bold text-[#419C09] block mb-1">Prevention:</span>
                      <p className="text-neutral-600">{d.prevention}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-xl border border-red-200">
                      <span className="font-bold text-red-700 block mb-1">Emergency Action:</span>
                      <p className="text-red-900 font-medium">{d.emergencyAction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Vaccination Schedule */}
          {activeTab === 'vaccines' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#04361A] text-white">
                    <th className="p-3.5 rounded-tl-xl font-bold">Age / Timing</th>
                    <th className="p-3.5 font-bold">Vaccine / Protection</th>
                    <th className="p-3.5 rounded-tr-xl font-bold">Administration Route</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#04361A]/10 bg-[#FAF8F2]">
                  {selectedGuide.vaccinationSchedule.map((v, vIdx) => (
                    <tr key={vIdx} className="hover:bg-white transition-colors">
                      <td className="p-3.5 font-bold text-[#04361A]">{v.ageOrPeriod}</td>
                      <td className="p-3.5 font-semibold text-neutral-800">{v.vaccine}</td>
                      <td className="p-3.5 text-neutral-600">
                        <span className="bg-white border border-[#04361A]/10 px-2.5 py-1 rounded-md text-xs font-medium inline-block">
                          {v.route}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
