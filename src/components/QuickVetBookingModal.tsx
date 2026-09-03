import React, { useState } from 'react';
import { County, VetBookingRequest } from '../types';
import { X, Stethoscope, AlertTriangle, Calendar, Phone, CheckCircle2, MapPin, ShieldCheck, Clock } from 'lucide-react';

interface QuickVetBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated?: (booking: VetBookingRequest) => void;
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

export const QuickVetBookingModal: React.FC<QuickVetBookingModalProps> = ({
  isOpen,
  onClose,
  onBookingCreated
}) => {
  const [farmerName, setFarmerName] = useState('John Kamau');
  const [phone, setPhone] = useState('0712 458 920');
  const [county, setCounty] = useState<County>('Kiambu');
  const [subCounty, setSubCounty] = useState('Githunguri');
  const [livestockCategory, setLivestockCategory] = useState('Dairy Cattle');
  const [animalCount, setAnimalCount] = useState(8);
  const [urgency, setUrgency] = useState<'Emergency (Immediate)' | 'Standard (Within 24 Hours)' | 'Scheduled Routine Visit'>('Emergency (Immediate)');
  const [primaryReason, setPrimaryReason] = useState('Sudden fever & drop in milk production');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'High fever (>39.5°C)',
    'Loss of appetite / dullness'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<VetBookingRequest | null>(null);

  if (!isOpen) return null;

  const symptomOptions = [
    'High fever (>39.5°C)',
    'Loss of appetite / dullness',
    'Swollen lymph nodes (suspected ECF)',
    'Mastitis / clots in milk',
    'Bloody / watery diarrhea',
    'Sudden flock mortality in poultry',
    'Respiratory wheezing / coughing',
    'Difficulty calving / dystocia',
    'Lameness / hoof rot',
    'Scheduled routine vaccination'
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const booking: VetBookingRequest = {
      id: `vet-req-${Date.now()}`,
      farmerName,
      phone,
      county,
      subCounty,
      livestockCategory,
      animalCount,
      urgency,
      primaryReason,
      symptomsObserved: selectedSymptoms,
      status: 'Pending Dispatch'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setSubmittedBooking(booking);
      if (onBookingCreated) {
        onBookingCreated(booking);
      }
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF8F2] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#04361A]/15 overflow-hidden my-8">
        {/* Modal Top Header */}
        <div className="bg-[#04361A] text-white p-6 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#419C09]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFB70F] text-[#04361A] flex items-center justify-center font-bold shadow-lg">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-[#FFB70F]">
                  Daktari wa Shamba • KVB Registered
                </span>
                <h3 className="text-2xl font-black tracking-tight text-white leading-tight">
                  Get Veterinary Help
                </h3>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs font-medium text-white/90">
            <span className="flex items-center gap-1.5 bg-[#419C09]/30 px-3 py-1 rounded-full border border-[#419C09]/40">
              <span className="w-2 h-2 rounded-full bg-[#419C09] animate-ping" />
              14 Field Vets Active
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#FFB70F]" />
              Emergency Response: Under 2 Hours
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Urgency Selector */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#04361A] mb-2">
                  Urgency Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { level: 'Emergency (Immediate)', badge: 'Urgent', desc: 'Dispatch in <2 hrs', color: 'border-red-500 bg-red-50' },
                    { level: 'Standard (Within 24 Hours)', badge: 'Standard', desc: 'Same-day visit', color: 'border-[#419C09] bg-green-50' },
                    { level: 'Scheduled Routine Visit', badge: 'Routine', desc: 'Planned calendar', color: 'border-neutral-300 bg-white' }
                  ].map(item => (
                    <button
                      key={item.level}
                      type="button"
                      onClick={() => setUrgency(item.level as any)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${
                        urgency === item.level
                          ? 'border-[#04361A] bg-[#04361A]/5 shadow-sm'
                          : 'border-neutral-200 bg-white hover:border-[#04361A]/30'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-[#04361A]">{item.badge}</span>
                        {urgency === item.level && (
                          <div className="w-2 h-2 rounded-full bg-[#419C09]" />
                        )}
                      </div>
                      <div className="font-semibold text-xs text-neutral-800">{item.level.split(' ')[0]}</div>
                      <div className="text-[11px] text-neutral-500">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Farmer and Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#04361A] mb-1">
                    Your Name / Farm Owner
                  </label>
                  <input
                    type="text"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    required
                    className="w-full bg-white border border-[#04361A]/20 rounded-xl p-3 text-sm font-semibold text-[#04361A] focus:outline-hidden focus:ring-2 focus:ring-[#419C09]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#04361A] mb-1">
                    M-Pesa / Contact Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="0712 345 678"
                      className="w-full bg-white border border-[#04361A]/20 rounded-xl p-3 pl-10 text-sm font-bold text-[#04361A] focus:outline-hidden focus:ring-2 focus:ring-[#419C09]"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#04361A] mb-1">
                    County
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value as County)}
                    className="w-full bg-white border border-[#04361A]/20 rounded-xl p-3 text-sm font-semibold text-[#04361A]"
                  >
                    {COUNTIES.map(c => (
                      <option key={c} value={c}>{c} County</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#04361A] mb-1">
                    Sub-County / Nearest Landmark
                  </label>
                  <input
                    type="text"
                    value={subCounty}
                    onChange={(e) => setSubCounty(e.target.value)}
                    placeholder="e.g. Githunguri, near Primary School"
                    required
                    className="w-full bg-white border border-[#04361A]/20 rounded-xl p-3 text-sm font-semibold text-[#04361A]"
                  />
                </div>
              </div>

              {/* Livestock Category & Herd Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#04361A] mb-1">
                    Affected Livestock / Flock
                  </label>
                  <select
                    value={livestockCategory}
                    onChange={(e) => setLivestockCategory(e.target.value)}
                    className="w-full bg-white border border-[#04361A]/20 rounded-xl p-3 text-sm font-semibold text-[#04361A]"
                  >
                    <option value="Dairy Cattle">Dairy Cattle (Cows / Heifers / Calves)</option>
                    <option value="Poultry (Layers / Broilers / Kienyeji)">Poultry (Layers, Broilers, Kienyeji, Turkeys)</option>
                    <option value="Pigs / Swine">Pigs & Swine (Porkers, Sows, Piglets)</option>
                    <option value="Dairy Goats & Sheep">Dairy Goats & Sheep</option>
                    <option value="Horses & Equine">Horses & Equine</option>
                    <option value="Mixed Livestock">Mixed Shamba Herd</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#04361A] mb-1">
                    Number of Animals Affected
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={animalCount}
                    onChange={(e) => setAnimalCount(Number(e.target.value))}
                    className="w-full bg-white border border-[#04361A]/20 rounded-xl p-3 text-sm font-bold text-[#04361A]"
                  />
                </div>
              </div>

              {/* Symptoms Checklist */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#04361A] mb-2">
                  Symptoms Observed (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {symptomOptions.map((symptom) => {
                    const isSelected = selectedSymptoms.includes(symptom);
                    return (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => toggleSymptom(symptom)}
                        className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#04361A] text-white border-[#04361A]'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#04361A]/40'
                        }`}
                      >
                        <span>{symptom}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FFB70F] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary Complaint Text */}
              <div>
                <label className="block text-xs font-bold text-[#04361A] mb-1">
                  Brief description for the attending veterinarian
                </label>
                <textarea
                  rows={3}
                  value={primaryReason}
                  onChange={(e) => setPrimaryReason(e.target.value)}
                  placeholder="Tell us what you noticed and how long the animal has been sick..."
                  className="w-full bg-white border border-[#04361A]/20 rounded-xl p-3 text-sm font-medium text-[#04361A] focus:outline-hidden focus:ring-2 focus:ring-[#419C09]"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-[#04361A]/10">
                <div className="flex items-center gap-2 text-xs text-[#04361A]/70">
                  <ShieldCheck className="w-4 h-4 text-[#419C09]" />
                  <span>Licensed by Kenya Veterinary Board (KVB)</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-neutral-300 font-bold text-xs text-neutral-700 hover:bg-neutral-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-8 py-3 bg-[#FFB70F] hover:bg-[#04361A] hover:text-white text-[#04361A] font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Connecting Field Vet...</>
                    ) : (
                      <>Dispatch Field Veterinarian</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-[#419C09]/20 flex items-center justify-center text-[#419C09] mx-auto mb-4 animate-pulse">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h4 className="text-2xl font-black text-[#04361A] mb-1">
                Daktari Amekabidhiwa!
              </h4>
              <p className="text-xs uppercase font-extrabold tracking-wider text-[#419C09] mb-4">
                Emergency Dispatch Ticket #{submittedBooking?.id.toUpperCase()}
              </p>
              
              <div className="bg-white border border-[#04361A]/15 rounded-2xl p-5 max-w-md mx-auto text-left text-xs space-y-2 mb-6 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Attending Vet:</span>
                  <span className="font-bold text-[#04361A]">Dr. Beatrice Mwangi, BVM (KVB Reg. #2948)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Dispatch Location:</span>
                  <span className="font-bold text-[#04361A]">{county} ({subCounty})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Contact Number:</span>
                  <span className="font-bold text-[#04361A]">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Estimated Arrival:</span>
                  <span className="font-bold text-[#419C09]">Within 90 Minutes</span>
                </div>
              </div>

              <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
                Dr. Mwangi has received your symptoms list and location coordinates. She will call you directly at <strong>{phone}</strong> to confirm the exact shamba turnoff before arriving.
              </p>

              <button
                onClick={handleClose}
                className="px-8 py-3 bg-[#04361A] hover:bg-[#419C09] text-white font-bold text-sm rounded-xl shadow-md transition-colors"
              >
                Done (Kurudi kwa Shamba)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
