import React, { useState } from 'react';
import { 
  CloudRain, 
  Sun, 
  Wind, 
  MapPin, 
  AlertCircle, 
  Egg, 
  Milk, 
  Sprout, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { COUNTY_WEATHER_DATA } from '../data/mockData';
import { CountyWeatherContext } from '../types';

interface WeatherFarmContextProps {
  defaultCounty?: string;
  onAskCompanionAboutWeather: (county: string) => void;
}

export const WeatherFarmContext: React.FC<WeatherFarmContextProps> = ({
  defaultCounty = 'Kiambu',
  onAskCompanionAboutWeather
}) => {
  const [selectedCounty, setSelectedCounty] = useState<string>(defaultCounty);

  const currentWeather: CountyWeatherContext = 
    COUNTY_WEATHER_DATA.find((w) => w.county.toLowerCase().includes(selectedCounty.toLowerCase())) || 
    COUNTY_WEATHER_DATA[0];

  return (
    <section id="weather" className="py-16 bg-[#F3F6F0] border-t border-[#E1E8DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E0EBDC] text-[#1B4332] text-xs font-bold">
              <CloudRain className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>PRACTICAL SHAMBA WEATHER • SI DIGITS PEKEE YAKE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#153120] tracking-tight">
              Actionable Weather for Your Livestock
            </h2>
            <p className="text-sm text-[#4E6656]">
              We don't just tell you the temperature. We tell you what to do with your poultry curtains, 
              morning dairy water, and wet zero-grazing bedding this week.
            </p>
          </div>

          {/* County Selector Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {COUNTY_WEATHER_DATA.map((w) => (
              <button
                key={w.county}
                onClick={() => setSelectedCounty(w.county)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  currentWeather.county === w.county
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-white text-[#385240] hover:bg-[#EAF0E6] border border-[#D5E1D0]'
                }`}
              >
                <span>{w.icon}</span>
                <span>{w.county}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Weather & Farm Advisory Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#DCE6D7] shadow-sm space-y-6">
          
          {/* Top Banner with Alert Headline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EDF3EA]">
            <div className="flex items-center space-x-4">
              <div className="text-5xl">{currentWeather.icon}</div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-[#173523]">
                    {currentWeather.temperature}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#EFF5EC] text-[#2D6A4F] font-bold">
                    {currentWeather.condition}
                  </span>
                </div>
                <div className="text-sm font-extrabold text-[#2D6A4F] mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{currentWeather.county} County • Rain Probability: {currentWeather.rainfallProbability}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAFBF8] p-3.5 rounded-2xl border border-[#E3ECE0] max-w-md">
              <div className="text-xs font-bold text-[#183624]">Swahili Shamba Context:</div>
              <p className="text-xs text-[#526F5D] mt-0.5 italic">
                “{currentWeather.swahiliContext}”
              </p>
            </div>
          </div>

          {/* 3 Actionable Agricultural Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Poultry Pillar */}
            <div className="bg-[#FAFBF9] p-5 rounded-2xl border border-[#E5EFE2] space-y-2">
              <div className="flex items-center space-x-2 text-[#1B4332]">
                <div className="w-8 h-8 rounded-xl bg-[#E5EFE2] flex items-center justify-center font-bold">
                  🐔
                </div>
                <h3 className="text-sm font-extrabold">Poultry Action Checklist</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#3E5747] leading-relaxed">
                {currentWeather.poultryAdvice}
              </p>
            </div>

            {/* Dairy Pillar */}
            <div className="bg-[#FAFBF9] p-5 rounded-2xl border border-[#E5EFE2] space-y-2">
              <div className="flex items-center space-x-2 text-[#1B4332]">
                <div className="w-8 h-8 rounded-xl bg-[#E5EFE2] flex items-center justify-center font-bold">
                  🐄
                </div>
                <h3 className="text-sm font-extrabold">Dairy & Cattle Action</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#3E5747] leading-relaxed">
                {currentWeather.dairyAdvice}
              </p>
            </div>

            {/* Pasture Pillar */}
            <div className="bg-[#FAFBF9] p-5 rounded-2xl border border-[#E5EFE2] space-y-2">
              <div className="flex items-center space-x-2 text-[#1B4332]">
                <div className="w-8 h-8 rounded-xl bg-[#E5EFE2] flex items-center justify-center font-bold">
                  🌱
                </div>
                <h3 className="text-sm font-extrabold">Pasture & Fodder Strategy</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#3E5747] leading-relaxed">
                {currentWeather.pastureAdvice}
              </p>
            </div>

          </div>

          {/* Bottom Prompt to Shamba Companion */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#52796F]">
            <span>Weather patterns synced with Kenya Meteorological Department & regional livestock field units.</span>
            <button
              onClick={() => onAskCompanionAboutWeather(currentWeather.county)}
              className="inline-flex items-center space-x-1.5 font-bold text-[#2D6A4F] hover:text-[#183B29] transition-colors"
            >
              <span>Ask Shamba Companion about {currentWeather.county} weather impact</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
