import React, { useState } from 'react';
import { 
  X, 
  LayoutDashboard, 
  FileText, 
  Activity, 
  Calendar, 
  ShieldCheck, 
  Plus, 
  Eye, 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  MapPin,
  Clock,
  Phone,
  HelpCircle,
  Leaf
} from 'lucide-react';
import { FarmerProfile, FarmAnimal, VeterinaryReport } from '../types';

interface FarmerPortalModalProps {
  farmer: FarmerProfile;
  animals: FarmAnimal[];
  reports: VeterinaryReport[];
  isOpen: boolean;
  onClose: () => void;
  onOpenReport: (report: VeterinaryReport) => void;
  onAddNewAnimal: (animal: Omit<FarmAnimal, 'id'>) => void;
  onBookVisitRequest: (details: { service: string; date: string; notes: string }) => void;
}

export const FarmerPortalModal: React.FC<FarmerPortalModalProps> = ({
  farmer,
  animals,
  reports,
  isOpen,
  onClose,
  onOpenReport,
  onAddNewAnimal,
  onBookVisitRequest
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'animals' | 'reports' | 'booking' | 'activity'>('overview');
  
  // Animal Form State
  const [showAddAnimal, setShowAddAnimal] = useState(false);
  const [newAnimalName, setNewAnimalName] = useState('');
  const [newAnimalTag, setNewAnimalTag] = useState('');
  const [newAnimalType, setNewAnimalType] = useState('Dairy Cattle');
  const [newAnimalBreed, setNewAnimalBreed] = useState('Holstein Friesian');
  const [newAnimalAge, setNewAnimalAge] = useState('3 Years');
  const [newAnimalStatus, setNewAnimalStatus] = useState<FarmAnimal['status']>('Healthy');
  const [newAnimalNotes, setNewAnimalNotes] = useState('');

  // Booking Form State
  const [bookService, setBookService] = useState('Routine Herd Health & Mastitis Screen');
  const [bookDate, setBookDate] = useState('2026-09-12');
  const [bookNotes, setBookNotes] = useState('');
  const [bookSubmitted, setBookSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleAddAnimalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnimalName.trim() || !newAnimalTag.trim()) return;

    onAddNewAnimal({
      name: newAnimalName.trim(),
      tagNumber: newAnimalTag.trim(),
      type: newAnimalType,
      breed: newAnimalBreed,
      age: newAnimalAge,
      status: newAnimalStatus,
      lastChecked: 'Just Now',
      dailyProduction: newAnimalType.includes('Dairy') ? '24.0 L/Day' : 'N/A',
      notes: newAnimalNotes || 'Registered via Farmer Portal'
    });

    setNewAnimalName('');
    setNewAnimalTag('');
    setShowAddAnimal(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookVisitRequest({
      service: bookService,
      date: bookDate,
      notes: bookNotes
    });
    setBookSubmitted(true);
    setTimeout(() => {
      setBookSubmitted(false);
      setActiveTab('overview');
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-[#DCE6D7] max-h-[92vh] flex flex-col overflow-hidden my-4">
        
        {/* Top Header of Portal */}
        <div className="bg-[#143525] text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] border border-[#52B788]/40 flex items-center justify-center font-bold text-xl text-white shadow-sm">
              {farmer.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {farmer.farmName}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#52B788]/20 border border-[#52B788]/40 text-[#95D5B2] text-[10px] font-bold">
                  Verified Shamba ✓
                </span>
              </div>
              <p className="text-xs text-[#A3B899] mt-0.5 flex items-center gap-2">
                <span>Farmer: <strong>{farmer.name}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-[#95D5B2]" /> {farmer.county} County
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              aria-label="Close Portal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-[#F6F9F4] border-b border-[#E3ECE0] px-4 sm:px-6 flex items-center space-x-1 sm:space-x-3 overflow-x-auto scrollbar-none py-2 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 flex items-center space-x-1.5 ${
              activeTab === 'overview'
                ? 'bg-white text-[#1B4332] shadow-xs border border-[#D5E1D0]'
                : 'text-[#52796F] hover:text-[#1B4332]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>My Shamba Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('animals')}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 flex items-center space-x-1.5 ${
              activeTab === 'animals'
                ? 'bg-white text-[#1B4332] shadow-xs border border-[#D5E1D0]'
                : 'text-[#52796F] hover:text-[#1B4332]'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>My Animals ({animals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 flex items-center space-x-1.5 ${
              activeTab === 'reports'
                ? 'bg-white text-[#1B4332] shadow-xs border border-[#D5E1D0]'
                : 'text-[#52796F] hover:text-[#1B4332]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Visit Reports ({reports.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('booking')}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 flex items-center space-x-1.5 ${
              activeTab === 'booking'
                ? 'bg-white text-[#1B4332] shadow-xs border border-[#D5E1D0]'
                : 'text-[#52796F] hover:text-[#1B4332]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Book Farm Visit</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 bg-[#FBFDFB]">
          
          {/* ================= OVERVIEW TAB ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Quick Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#DCE6D7] shadow-xs space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#52796F]">
                    Total Registered Stock
                  </div>
                  <div className="text-2xl font-black text-[#163A2B]">
                    {animals.length} Units
                  </div>
                  <div className="text-xs text-[#2D6A4F] font-semibold">
                    Cattle & Commercial Flock
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#DCE6D7] shadow-xs space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#52796F]">
                    Daily Milk Output
                  </div>
                  <div className="text-2xl font-black text-[#163A2B]">
                    56.2 Liters
                  </div>
                  <div className="text-xs text-[#2D6A4F] font-semibold">
                    +4.8L vs last week
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#DCE6D7] shadow-xs space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#52796F]">
                    Official Vet Reports
                  </div>
                  <div className="text-2xl font-black text-[#163A2B]">
                    {reports.length} Reports
                  </div>
                  <div className="text-xs text-[#52796F]">
                    Latest: 28 Aug 2026
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#DCE6D7] shadow-xs space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#52796F]">
                    Scheduled Follow-Up
                  </div>
                  <div className="text-2xl font-black text-[#2D6A4F]">
                    08 Sep 2026
                  </div>
                  <div className="text-xs text-[#52796F]">
                    Dr. Mwangi Kuria, BVM
                  </div>
                </div>
              </div>

              {/* Active Treatment / Attention Card */}
              <div className="bg-[#FFFDF5] border border-amber-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-amber-950">
                      Active Veterinary Watch: Cow #042 (Zawadi)
                    </h3>
                    <p className="text-xs text-amber-800 mt-0.5 max-w-xl">
                      Subclinical mastitis intramammary course active. Withhold milk from bulk cooler until 02 September. Keep stall floor dry with lime dust.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenReport(reports[0])}
                  className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow-xs"
                >
                  View Vet Instructions
                </button>
              </div>

              {/* Recent Animals & Quick Action */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-[#173523]">
                    Livestock in Shamba
                  </h3>
                  <button
                    onClick={() => setActiveTab('animals')}
                    className="text-xs font-bold text-[#2D6A4F] hover:underline flex items-center gap-1"
                  >
                    <span>View All Animals</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {animals.slice(0, 2).map((animal) => (
                    <div
                      key={animal.id}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DCE6D7] shadow-xs flex items-start justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-[#173523] text-base">{animal.name}</span>
                          <span className="text-xs px-2 py-0.5 bg-[#EFF5EC] text-[#2D6A4F] font-bold rounded-md">
                            {animal.tagNumber}
                          </span>
                        </div>
                        <div className="text-xs text-[#52796F]">{animal.breed} • {animal.age}</div>
                        <div className="text-xs text-[#304B3B] font-semibold pt-1">
                          Yield: {animal.dailyProduction}
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        animal.status === 'Healthy' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {animal.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= ANIMALS TAB ================= */}
          {activeTab === 'animals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-[#173523]">
                    Herd & Flock Register
                  </h3>
                  <p className="text-xs text-[#52796F]">
                    Keep accurate production logs and track individual animal health history.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddAnimal(!showAddAnimal)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#1B4332] text-white text-xs font-bold hover:bg-[#143525] shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Sajili Mnyama Mpya</span>
                </button>
              </div>

              {/* Add Animal Form */}
              {showAddAnimal && (
                <form onSubmit={handleAddAnimalSubmit} className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#2D6A4F]/30 shadow-md space-y-4 animate-in fade-in">
                  <h4 className="text-sm font-bold text-[#1B4332]">
                    Register New Animal or Flock
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#2D6A4F]">Animal Name / Batch</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Amani / Layers Batch #5"
                        value={newAnimalName}
                        onChange={(e) => setNewAnimalName(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#2D6A4F]">Ear Tag / ID Number</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. KE-KBU-055"
                        value={newAnimalTag}
                        onChange={(e) => setNewAnimalTag(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#2D6A4F]">Livestock Type</label>
                      <select
                        value={newAnimalType}
                        onChange={(e) => setNewAnimalType(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs font-semibold"
                      >
                        <option value="Dairy Cattle">Dairy Cattle</option>
                        <option value="Poultry">Poultry</option>
                        <option value="Goat">Goat</option>
                        <option value="Sheep">Sheep</option>
                        <option value="Pig">Pig</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#2D6A4F]">Breed</label>
                      <input
                        type="text"
                        placeholder="e.g. Friesian, Ayrshire, Kienyeji"
                        value={newAnimalBreed}
                        onChange={(e) => setNewAnimalBreed(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#2D6A4F]">Age</label>
                      <input
                        type="text"
                        placeholder="e.g. 2 Years / 18 Weeks"
                        value={newAnimalAge}
                        onChange={(e) => setNewAnimalAge(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#2D6A4F]">Status</label>
                      <select
                        value={newAnimalStatus}
                        onChange={(e) => setNewAnimalStatus(e.target.value as FarmAnimal['status'])}
                        className="w-full px-3 py-2 bg-[#F8FAF6] border border-[#D5E1D0] rounded-xl text-xs font-semibold"
                      >
                        <option value="Healthy">Healthy</option>
                        <option value="Lactating">Lactating</option>
                        <option value="Under Treatment">Under Treatment</option>
                        <option value="Dry">Dry</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAnimal(false)}
                      className="px-4 py-2 text-xs font-bold text-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#1B4332] text-white text-xs font-bold rounded-xl shadow-xs"
                    >
                      Save Animal Record
                    </button>
                  </div>
                </form>
              )}

              {/* Animals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {animals.map((animal) => (
                  <div
                    key={animal.id}
                    className="bg-white p-5 rounded-2xl border border-[#DCE6D7] shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-base font-extrabold text-[#173523]">{animal.name}</h4>
                          <span className="px-2 py-0.5 bg-[#EFF5EC] text-[#2D6A4F] text-xs font-bold rounded-md">
                            {animal.tagNumber}
                          </span>
                        </div>
                        <p className="text-xs text-[#52796F]">{animal.breed} • {animal.age}</p>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        animal.status === 'Healthy' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {animal.status}
                      </span>
                    </div>

                    <div className="bg-[#F8FAF6] p-3 rounded-xl border border-[#E3ECE0] text-xs text-[#2C4434] space-y-1">
                      <div className="font-semibold text-[#183624]">
                        Current Output: <strong>{animal.dailyProduction}</strong>
                      </div>
                      <p className="text-[#556F5E] italic">“{animal.notes}”</p>
                    </div>

                    <div className="text-[11px] text-[#718578] flex items-center justify-between pt-1">
                      <span>Last Examined: {animal.lastChecked}</span>
                      <span className="font-semibold text-[#2D6A4F]">Dr. Mwangi Kuria, BVM</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= REPORTS TAB ================= */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-[#173523]">
                  Accredited Farm Visit Reports
                </h3>
                <p className="text-xs text-[#52796F]">
                  Official medical notes, clinical assessments, and prescribed action plans from your veterinary inspections.
                </p>
              </div>

              <div className="space-y-4">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="bg-white p-5 sm:p-6 rounded-2xl border border-[#DCE6D7] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-[#173523] text-base">{rep.reportNumber}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {rep.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#4F6857] font-semibold">
                        Inspection Date: {rep.visitDate} • Dr: {rep.veterinarian.name} ({rep.veterinarian.registrationNumber})
                      </p>
                      <p className="text-xs text-[#6B8574] line-clamp-2 max-w-xl">
                        {rep.clinicalObservations}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => onOpenReport(rep)}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#1B4332] text-white text-xs font-bold hover:bg-[#143525] transition-colors shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#95D5B2]" />
                        <span>View Report</span>
                      </button>

                      <button
                        onClick={() => onOpenReport(rep)}
                        className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-[#D0DFCB] text-[#1B4332] text-xs font-bold hover:bg-[#F2F6EF] transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= BOOKING TAB ================= */}
          {activeTab === 'booking' && (
            <div className="max-w-xl mx-auto py-4 space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-extrabold text-[#173523]">
                  Request a Field Veterinary Visit
                </h3>
                <p className="text-xs text-[#52796F]">
                  An accredited KVB veterinary surgeon will inspect your animals and issue a digital visit report.
                </p>
              </div>

              {bookSubmitted ? (
                <div className="p-6 bg-[#EFF5EC] border border-[#CFDFCB] rounded-2xl text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#2D6A4F] text-white mx-auto flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <h4 className="text-base font-bold text-[#1B4332]">
                    Ombi Lako Limepokelewa!
                  </h4>
                  <p className="text-xs text-[#4F6857]">
                    Farmers Hub Vet Coordinator in {farmer.county} will call you at {farmer.phone} to confirm timing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="bg-white p-6 rounded-2xl border border-[#DCE6D7] shadow-sm space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1B4332]">Type of Service Required</label>
                    <select
                      value={bookService}
                      onChange={(e) => setBookService(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F9FAF7] border border-[#D5E1D0] rounded-xl text-xs font-semibold text-[#1B4332]"
                    >
                      <option value="Routine Herd Health & Mastitis Screen">Routine Herd Health & Mastitis Screen</option>
                      <option value="Artificial Insemination (AI) & Heat Service">Artificial Insemination (AI) & Heat Service</option>
                      <option value="Commercial Poultry Flock Health Audit">Commercial Poultry Flock Health Audit</option>
                      <option value="Silage & Nutritional Formulation Audit">Silage & Nutritional Formulation Audit</option>
                      <option value="Acute Sickness / Emergency Checkup">Acute Sickness / Emergency Checkup</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1B4332]">Preferred Visit Date</label>
                    <input
                      type="date"
                      required
                      value={bookDate}
                      onChange={(e) => setBookDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F9FAF7] border border-[#D5E1D0] rounded-xl text-xs font-semibold text-[#1B4332]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1B4332]">Specific Observations or Symptoms</label>
                    <textarea
                      rows={3}
                      placeholder="Eleza dalili: maziwa kupungua, kuku kukohoa, ng'ombe kukataa feed..."
                      value={bookNotes}
                      onChange={(e) => setBookNotes(e.target.value)}
                      className="w-full p-3 bg-[#F9FAF7] border border-[#D5E1D0] rounded-xl text-xs text-[#1B4332]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1B4332] hover:bg-[#143525] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-md"
                  >
                    Submit Booking Request (Tuma Ombi)
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
