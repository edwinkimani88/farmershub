import React, { useState } from 'react';
import { 
  X, 
  Sprout, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { County, FarmerProfile, LivestockType } from '../types';
import { MOCK_FARMER_PROFILE } from '../data/mockData';

interface FarmerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (farmer: FarmerProfile) => void;
}

const KENYAN_COUNTIES: County[] = [
  'Kiambu',
  'Kericho',
  'Nakuru',
  'Kajiado',
  'Nyeri',
  'Eldoret',
  'Bomet',
  'Machakos',
  'Nyandarua',
  'Murang\'a'
];

export const FarmerAuthModal: React.FC<FarmerAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'register' | 'login'>('register');

  // Register form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+254 7');
  const [county, setCounty] = useState<County>('Kiambu');
  const [subCounty, setSubCounty] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmType, setFarmType] = useState('Dairy');
  const [mainLivestock, setMainLivestock] = useState('Dairy Cattle');
  const [herdSize, setHerdSize] = useState('8 Cows');
  const [experience, setExperience] = useState('5 Years');
  const [currentChallenge, setCurrentChallenge] = useState('');

  // Login form fields
  const [loginPhone, setLoginPhone] = useState('+254 712 458 920');

  if (!isOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newFarmer: FarmerProfile = {
      id: `farmer-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: `${name.toLowerCase().replace(/\s+/g, '')}@shamba.co.ke`,
      county: county,
      subCounty: subCounty || `${county} Central`,
      farmName: farmName || `${name.split(' ')[0]}'s Farm`,
      farmType: farmType,
      mainLivestock: [mainLivestock as LivestockType],
      herdFlockSize: herdSize || '5 Units',
      experienceYears: experience || '3 Years',
      currentChallenge: currentChallenge || 'Improving milk yields and optimizing feed costs'
    };

    onSuccess(newFarmer);
    onClose();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log in as sample or existing profile
    onSuccess(MOCK_FARMER_PROFILE);
    onClose();
  };

  const handleQuickDemoLogin = (profile: FarmerProfile) => {
    onSuccess(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-[#DCE6D7] overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#143525] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2D6A4F] flex items-center justify-center text-white">
              <Sprout className="w-6 h-6 text-[#95D5B2]" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                {mode === 'register' ? 'Sajili Shamba Yako' : 'Ingia kwa Farmer Portal'}
              </h3>
              <p className="text-xs text-[#A3B899]">
                {mode === 'register' 
                  ? 'Join our verified farmer community & access vet visit records'
                  : 'Welcome back to your farm records & veterinary reports'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Pre-fill Pill Bar */}
        <div className="px-5 sm:px-6 py-2.5 bg-[#EFF5EC] border-b border-[#DDE7DA] flex items-center justify-between text-xs">
          <span className="font-bold text-[#2D6A4F]">Demo Quick Access:</span>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin(MOCK_FARMER_PROFILE)}
            className="px-3 py-1 bg-[#1B4332] text-white font-bold rounded-lg text-[11px] hover:bg-[#143525] transition-colors"
          >
            Log in as John Kamau (Kiambu Dairy)
          </button>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex border-b border-[#E7EFE4] text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-3 transition-colors ${
              mode === 'register'
                ? 'border-b-2 border-[#2D6A4F] text-[#1B4332] bg-[#FAFBF9]'
                : 'text-[#6C8775] hover:text-[#1B4332]'
            }`}
          >
            New Farmer Registration (Sajili)
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-3 transition-colors ${
              mode === 'login'
                ? 'border-b-2 border-[#2D6A4F] text-[#1B4332] bg-[#FAFBF9]'
                : 'text-[#6C8775] hover:text-[#1B4332]'
            }`}
          >
            Existing Farmer Login (Ingia)
          </button>
        </div>

        {/* Form Body */}
        {mode === 'register' ? (
          <form onSubmit={handleRegisterSubmit} className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1B4332]">Jina Kamili (Full Name)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Njoroge"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs text-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1B4332]">Phone Number (M-Pesa / SMS)</label>
                <input
                  type="text"
                  required
                  placeholder="+254 7..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs text-[#1B4332] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1B4332]">County</label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value as County)}
                  className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs font-semibold text-[#1B4332] focus:outline-none"
                >
                  {KENYAN_COUNTIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1B4332]">Sub-County / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Githunguri / Rongai"
                  value={subCounty}
                  onChange={(e) => setSubCounty(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs text-[#1B4332] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1B4332]">Farm Name</label>
                <input
                  type="text"
                  placeholder="e.g. Baraka Dairy & Poultry"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs text-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1B4332]">Main Livestock Enterprise</label>
                <select
                  value={mainLivestock}
                  onChange={(e) => setMainLivestock(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs font-semibold text-[#1B4332]"
                >
                  <option value="Dairy Cattle">Dairy Cattle (Zero-Grazing / Semi)</option>
                  <option value="Poultry">Commercial Poultry (Layers / Broilers)</option>
                  <option value="Beef Cattle">Beef Cattle</option>
                  <option value="Goats & Sheep">Dairy Goats / Dorper Sheep</option>
                  <option value="Pigs">Pigs & Commercial Breeding</option>
                  <option value="Mixed Livestock">Mixed Livestock & Fodder</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1B4332]">Flock / Herd Size</label>
                <input
                  type="text"
                  placeholder="e.g. 6 Milking Cows / 500 Layers"
                  value={herdSize}
                  onChange={(e) => setHerdSize(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs text-[#1B4332]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1B4332]">Years Farming</label>
                <input
                  type="text"
                  placeholder="e.g. 3 Years"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs text-[#1B4332]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1B4332]">
                What brings you to Farmers Hub? (Biggest farming challenge today)
              </label>
              <input
                type="text"
                placeholder="e.g. Feed prices, drop in egg production, finding a reliable vet..."
                value={currentChallenge}
                onChange={(e) => setCurrentChallenge(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs text-[#1B4332]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1B4332] hover:bg-[#143525] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md mt-2 flex items-center justify-center space-x-2"
            >
              <span>Kamilisha Usajili (Join Farmers Hub)</span>
              <ArrowRight className="w-4 h-4 text-[#95D5B2]" />
            </button>

          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1B4332]">Registered Phone or Email</label>
              <input
                type="text"
                required
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                className="w-full px-4 py-3 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-sm font-medium text-[#1B4332]"
              />
            </div>

            <p className="text-xs text-[#52796F]">
              Enter your registered mobile number to access your livestock records, official clinical reports, and community circle.
            </p>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1B4332] hover:bg-[#143525] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md"
            >
              Ingia kwa Shamba Yako (Login)
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
