import React, { useState } from 'react';
import { FarmerProfile, FarmAnimal, VeterinaryReport } from '../types';
import { MOCK_FARM_ANIMALS, MOCK_VET_REPORTS } from '../data/mockData';
import { 
  User, 
  MapPin, 
  Calendar, 
  Stethoscope, 
  Plus, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ShoppingBag, 
  Egg, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface PortalPageProps {
  currentFarmer: FarmerProfile | null;
  onOpenVetBooking: () => void;
  onOpenAuth: () => void;
}

export const PortalPage: React.FC<PortalPageProps> = ({
  currentFarmer,
  onOpenVetBooking,
  onOpenAuth
}) => {
  const [animals, setAnimals] = useState<FarmAnimal[]>(MOCK_FARM_ANIMALS);
  const [reports, setReports] = useState<VeterinaryReport[]>(MOCK_VET_REPORTS);
  const [activeTab, setActiveTab] = useState<'overview' | 'animals' | 'reports'>('overview');

  // Fallback farmer profile if not logged in
  const profile: FarmerProfile = currentFarmer || {
    id: 'f-demo',
    name: 'Wanjiku Mwangi',
    phone: '0712 458 920',
    county: 'Kiambu',
    subCounty: 'Githunguri',
    farmName: 'Mugumo View Dairy & Poultry Farm',
    farmingScale: 'Smallholder',
    herdFlockSize: '12 Dairy Cows & 800 Layers'
  };

  const downloadReportPDF = (report: VeterinaryReport) => {
    alert(`Downloading Official KVB Report #${report.reportNumber} for ${report.animalsExamined} (${report.diagnosisAssessment}) with Dr. ${report.veterinarian.name}'s digital signature.`);
  };

  return (
    <div className="bg-[#FAF8F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Farmer Top Profile Card */}
        <div className="bg-white rounded-3xl border border-[#04361A]/10 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#04361A] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                {profile.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md bg-[#FFB70F] text-[#04361A]">
                    Verified Mkulima • {profile.farmingScale || 'Commercial Smallholder'}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-[#04361A]">
                  {profile.farmName || `${profile.name}'s Shamba`}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 mt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#419C09]" />
                    {profile.name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#419C09]" />
                    {profile.county} County ({profile.subCounty || 'Central'})
                  </span>
                  <span>•</span>
                  <span>{profile.herdFlockSize || 'Mixed Herd'}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={onOpenVetBooking}
                className="px-4 py-2.5 bg-[#FFB70F] hover:bg-[#04361A] hover:text-white text-[#04361A] font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Request Vet Visit</span>
              </button>

              <Link
                to="/shop"
                className="px-4 py-2.5 bg-[#04361A] hover:bg-[#419C09] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Feed / Meds</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#04361A]/10">
            <div className="bg-[#FAF8F2] p-4 rounded-2xl border border-[#04361A]/10">
              <span className="text-[11px] text-neutral-500 font-bold block">Total Animals / Birds</span>
              <span className="text-2xl font-black text-[#04361A]">812</span>
              <span className="text-[10px] text-[#419C09] font-bold block">12 Cows, 800 Layers</span>
            </div>

            <div className="bg-[#FAF8F2] p-4 rounded-2xl border border-[#04361A]/10">
              <span className="text-[11px] text-neutral-500 font-bold block">Daily Production</span>
              <span className="text-2xl font-black text-[#04361A]">218 L / 680 Eggs</span>
              <span className="text-[10px] text-[#419C09] font-bold block">88% Laying Rate</span>
            </div>

            <div className="bg-[#FAF8F2] p-4 rounded-2xl border border-[#04361A]/10">
              <span className="text-[11px] text-neutral-500 font-bold block">Vaccination Status</span>
              <span className="text-2xl font-black text-[#419C09]">Up to date</span>
              <span className="text-[10px] text-neutral-500 block">Next: FMD in 24 days</span>
            </div>

            <div className="bg-[#FAF8F2] p-4 rounded-2xl border border-[#04361A]/10">
              <span className="text-[11px] text-neutral-500 font-bold block">Official Vet Reports</span>
              <span className="text-2xl font-black text-[#04361A]">{reports.length}</span>
              <span className="text-[10px] text-[#419C09] font-bold block">All signed by KVB vets</span>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-[#04361A]/10 pb-3 mb-8">
          {[
            { id: 'overview', label: 'Shamba Activity & Reminders' },
            { id: 'animals', label: 'My Livestock & Flock Registry' },
            { id: 'reports', label: 'Official Veterinary Health Reports' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#04361A] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-[#04361A] hover:bg-neutral-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Upcoming Shamba Tasks */}
              <div className="bg-white rounded-3xl p-6 border border-[#04361A]/10 shadow-sm">
                <h3 className="font-extrabold text-base text-[#04361A] mb-4 flex items-center justify-between">
                  <span>Upcoming Care & Vaccine Schedule</span>
                  <span className="text-xs text-[#419C09] font-bold">Automatic SMS Alerts Active</span>
                </h3>

                <div className="space-y-3">
                  {[
                    { task: 'Newcastle Booster for 800 Layers', date: 'In 3 Days (14 Sept)', priority: 'High', animal: 'Poultry Flock #1' },
                    { task: 'California Mastitis Test (CMT) fortnight check for 12 cows', date: 'In 6 Days (17 Sept)', priority: 'Routine', animal: 'Dairy Cattle' },
                    { task: 'Deworming (Albendazole 10% Drench)', date: 'In 18 Days (29 Sept)', priority: 'Planned', animal: 'Heifers & Calves' }
                  ].map((t, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#04361A]/10 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-[#04361A]">{t.task}</span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#FFB70F] text-[#04361A]">
                            {t.priority}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500 font-medium">
                          Target: {t.animal} • Due: {t.date}
                        </div>
                      </div>

                      <button
                        onClick={onOpenVetBooking}
                        className="px-3 py-1.5 bg-white border border-[#04361A]/20 hover:border-[#419C09] rounded-lg text-xs font-bold text-[#04361A]"
                      >
                        Book Vet
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Feed Stock */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-[#04361A]/10 shadow-sm">
                <h4 className="font-extrabold text-sm text-[#04361A] mb-3">Feed Inventory on Shamba</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-[#FAF8F2]">
                    <div>
                      <strong className="block text-[#04361A]">Layers Mash 16%</strong>
                      <span className="text-neutral-500">8 Bags remaining (approx 5 days)</span>
                    </div>
                    <span className="text-xs font-bold text-amber-600">Re-order Soon</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl bg-[#FAF8F2]">
                    <div>
                      <strong className="block text-[#04361A]">Dairy Meal 18% Plus</strong>
                      <span className="text-neutral-500">14 Bags remaining (approx 12 days)</span>
                    </div>
                    <span className="text-xs font-bold text-[#419C09]">Good Stock</span>
                  </div>
                </div>

                <Link
                  to="/shop"
                  className="mt-4 w-full py-2.5 bg-[#419C09] hover:bg-[#04361A] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Re-Order Feed from Store</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Animals */}
        {activeTab === 'animals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animals.map((animal) => (
              <div key={animal.id} className="bg-white rounded-3xl p-6 border border-[#04361A]/10 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#419C09]">
                      {animal.type}
                    </span>
                    <h4 className="font-black text-lg text-[#04361A]">{animal.name}</h4>
                    <p className="text-xs text-neutral-500">{animal.breed} • {animal.age} • Tag: {animal.tagNumber}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                    animal.status === 'Healthy'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {animal.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-600 mb-4 bg-[#FAF8F2] p-3 rounded-xl">
                  {animal.dailyProduction && (
                    <div className="flex justify-between">
                      <span>Daily Yield:</span>
                      <strong className="text-[#04361A]">{animal.dailyProduction}</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shamba Notes:</span>
                    <span className="font-medium text-neutral-700 line-clamp-1">{animal.notes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Vet Exam:</span>
                    <span className="text-neutral-500">{animal.lastChecked}</span>
                  </div>
                </div>

                <button
                  onClick={onOpenVetBooking}
                  className="w-full py-2 bg-[#FAF8F2] hover:bg-[#04361A] hover:text-white border border-[#04361A]/20 rounded-xl text-xs font-bold text-[#04361A] transition-colors"
                >
                  Schedule Checkup
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-3xl p-6 border border-[#04361A]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-[#04361A]">
                      Report #{report.reportNumber}
                    </span>
                    <span className="text-xs text-neutral-400">•</span>
                    <span className="text-xs text-neutral-500">{report.visitDate}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#419C09]/20 text-[#04361A]">
                      {report.status}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-base text-[#04361A] mb-1">
                    {report.animalsExamined} — {report.diagnosisAssessment}
                  </h4>

                  <p className="text-xs text-neutral-600 max-w-xl">
                    <strong>Actions Taken:</strong> {report.actionsTaken.join('; ')}.
                  </p>

                  <div className="text-[11px] text-[#419C09] font-bold mt-1">
                    Attending Vet: Dr. {report.veterinarian.name} ({report.veterinarian.registrationNumber})
                  </div>
                </div>

                <button
                  onClick={() => downloadReportPDF(report)}
                  className="px-5 py-2.5 bg-[#04361A] hover:bg-[#419C09] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official PDF</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
