import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FarmerProfile, County } from '../types';
import { FarmersHubLogo } from '../components/FarmersHubLogo';
import { ShieldCheck, Phone, User, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (farmer: FarmerProfile) => void;
  defaultMode?: 'login' | 'signup';
}

const COUNTIES: County[] = [
  'Kiambu',
  'Nakuru',
  'Eldoret / Uasin Gishu',
  'Kericho',
  'Kajiado',
  'Nyeri',
  'Murang\'a',
  'Bomet',
  'Machakos',
  'Nyandarua'
];

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, defaultMode }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode === 'signup' ? 'register' : 'login');
  const [phone, setPhone] = useState('0712 458 920');
  const [name, setName] = useState('John Kamau');
  const [county, setCounty] = useState<County>('Kiambu');
  const [subCounty, setSubCounty] = useState('Githunguri');
  const [farmName, setFarmName] = useState('Kamau Dairy & Poultry Farm');
  const [primaryAnimal, setPrimaryAnimal] = useState('Poultry');
  const [scale, setScale] = useState<'Smallholder' | 'Medium Commercial' | 'Large Scale'>('Smallholder');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profile: FarmerProfile = {
      id: `farmer-${Date.now()}`,
      name: mode === 'register' ? name : 'John Kamau',
      phone,
      county,
      subCounty,
      farmName: mode === 'register' ? farmName : 'Kamau Shamba Hub',
      farmingScale: scale,
      herdFlockSize: primaryAnimal === 'Poultry' ? '600 Layers' : '8 Dairy Cows',
      joinDate: 'September 2026'
    };

    onLoginSuccess(profile);
    navigate('/portal');
  };

  return (
    <div className="bg-[#FAF8F2] min-h-screen py-12 px-4 sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#04361A]/10 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <FarmersHubLogo variant="horizontal" size="md" />
          </div>
          <h2 className="text-2xl font-black text-[#04361A]">
            {mode === 'login' ? 'Mkulima Login' : 'Register Your Shamba'}
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Access your livestock health registry, digital vet visit certificates & discounted feeds.
          </p>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAF8F2] rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-[#04361A] text-white shadow-xs'
                : 'text-neutral-600 hover:text-[#04361A]'
            }`}
          >
            Quick Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-[#04361A] text-white shadow-xs'
                : 'text-neutral-600 hover:text-[#04361A]'
            }`}
          >
            New Mkulima
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <>
              <div>
                <label className="block font-bold text-[#04361A] mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mary Wanjiku"
                  className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl p-3 text-sm font-semibold text-[#04361A]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#04361A] mb-1">Farm / Shamba Name</label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="e.g. Mugumo View Poultry Farm"
                  className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl p-3 text-sm font-semibold text-[#04361A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#04361A] mb-1">County</label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value as County)}
                    className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl p-3 text-sm font-semibold text-[#04361A]"
                  >
                    {COUNTIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#04361A] mb-1">Sub-County / Area</label>
                  <input
                    type="text"
                    required
                    value={subCounty}
                    onChange={(e) => setSubCounty(e.target.value)}
                    placeholder="e.g. Githunguri"
                    className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl p-3 text-sm font-semibold text-[#04361A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#04361A] mb-1">Main Livestock Enterprise</label>
                <select
                  value={primaryAnimal}
                  onChange={(e) => setPrimaryAnimal(e.target.value)}
                  className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl p-3 text-sm font-semibold text-[#04361A]"
                >
                  <option value="Poultry">Poultry (Layers, Broilers, Kienyeji)</option>
                  <option value="Dairy Cattle">Dairy Cattle</option>
                  <option value="Pigs">Commercial Pigs</option>
                  <option value="Dairy Goats">Dairy Goats & Sheep</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block font-bold text-[#04361A] mb-1">M-Pesa Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712 345 678"
                className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl p-3 pl-10 text-sm font-bold text-[#04361A]"
              />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              We send your SMS vaccine reminders and order updates to this phone number.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#419C09] hover:bg-[#04361A] text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <span>{mode === 'login' ? 'Enter Mkulima Portal' : 'Create My Shamba Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#04361A]/10 text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#419C09]" />
          <span>Farmers Hub Kenya • Official KVB Partner</span>
        </div>
      </div>
    </div>
  );
};
