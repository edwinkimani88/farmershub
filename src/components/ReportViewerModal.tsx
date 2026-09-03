import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  User, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { VeterinaryReport } from '../types';

interface ReportViewerModalProps {
  report: VeterinaryReport | null;
  onClose: () => void;
}

export const ReportViewerModal: React.FC<ReportViewerModalProps> = ({
  report,
  onClose
}) => {
  if (!report) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-[#D8E3D2] overflow-hidden my-6 flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="p-4 sm:p-5 border-b border-[#EDF3EA] bg-[#F7FAF5] flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2 text-xs text-[#2D6A4F] font-bold">
            <FileText className="w-4 h-4" />
            <span>OFFICIAL VETERINARY VISIT REPORT • {report.reportNumber}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-white text-xs font-bold hover:bg-[#143525] shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Clinical Certificate Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 print:p-0 text-[#1A2E20]">
          
          {/* Certificate Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-[#1B4332] gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold">
                  🌱
                </div>
                <h1 className="text-2xl font-black tracking-tight text-[#163A2B]">
                  Farmers<span className="text-[#2D6A4F]">Hub</span>
                </h1>
              </div>
              <p className="text-xs text-[#52796F] mt-1 font-semibold">
                Veterinary & Agricultural Advisory Services • Kenya
              </p>
              <p className="text-[11px] text-[#718578]">
                Nairobi • Nakuru • Kiambu • Eldoret Regional Field Units
              </p>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1 bg-[#F5F8F3] p-3 rounded-xl border border-[#DCE6D7] print:border-none">
              <div className="font-bold text-[#1B4332]">REPORT REF: {report.reportNumber}</div>
              <div className="text-[#52796F]">Date of Inspection: <strong>{report.visitDate}</strong></div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <ShieldCheck className="w-3 h-3" /> Status: {report.status}
              </div>
            </div>
          </div>

          {/* Farmer & Shamba Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAFBF9] p-5 rounded-2xl border border-[#E3ECE0]">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#52796F]">Farmer & Holding</div>
              <div className="text-base font-extrabold text-[#173523] mt-0.5">{report.farmerName}</div>
              <div className="text-xs text-[#455E4E] font-medium">{report.farmName}</div>
              <div className="text-xs text-[#6A8271] mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#2D6A4F]" />
                {report.subCounty}, {report.county} County
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#52796F]">Attending Veterinary Officer</div>
              <div className="text-base font-extrabold text-[#173523] mt-0.5">{report.veterinarian.name}</div>
              <div className="text-xs text-[#455E4E]">{report.veterinarian.title}</div>
              <div className="text-xs text-[#2D6A4F] font-semibold mt-1">
                Reg: {report.veterinarian.registrationNumber} (KVB Accredited)
              </div>
            </div>
          </div>

          {/* Animals Examined */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4" />
              <span>Livestock Examined</span>
            </h3>
            <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#E0EBE0] text-xs sm:text-sm font-semibold text-[#1B3624]">
              {report.animalsExamined}
            </div>
          </div>

          {/* Observations & Assessment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                Clinical Observations
              </h3>
              <p className="text-xs sm:text-sm text-[#384F40] leading-relaxed bg-[#F9FBF8] p-4 rounded-xl border border-[#E5EDE3]">
                {report.clinicalObservations}
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                Diagnostic Assessment
              </h3>
              <p className="text-xs sm:text-sm text-[#384F40] leading-relaxed bg-[#F9FBF8] p-4 rounded-xl border border-[#E5EDE3]">
                {report.diagnosisAssessment}
              </p>
            </div>
          </div>

          {/* Actions Taken */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
              Actions Administered in Field
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#27402F]">
              {report.actionsTaken.map((action, i) => (
                <li key={i} className="flex items-start space-x-2 bg-[#FAFBF8] p-2.5 rounded-lg border border-[#E8EEE4]">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations & Nutrition Advice */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
              Veterinary Recommendations & Feeding Plan
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#27402F]">
              {report.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start space-x-2 bg-[#FAFBF8] p-2.5 rounded-lg border border-[#E8EEE4]">
                  <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-[#EFF5EC] border border-[#CFDFCB] space-y-1">
              <div className="text-xs font-bold text-[#1B4332]">Target Nutrition & TMR Formulation:</div>
              <p className="text-xs sm:text-sm text-[#35503F] leading-relaxed">
                {report.nutritionAdvice}
              </p>
            </div>
          </div>

          {/* Follow-up & Official Signoff */}
          <div className="pt-6 border-t border-[#D5E2D0] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="space-y-1">
              <div className="text-xs text-[#52796F] font-bold">Scheduled Follow-Up:</div>
              <div className="text-sm font-extrabold text-[#1B4332] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#2D6A4F]" />
                {report.followUpDate}
              </div>
              <p className="text-[11px] text-[#6E8877]">{report.additionalNotes}</p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="font-script text-2xl text-[#1B4332] font-bold">
                {report.veterinarian.name}
              </div>
              <div className="w-36 h-0.5 bg-[#2D6A4F] ml-auto" />
              <div className="text-[11px] text-[#52796F] font-semibold">
                Authorized Signature & Seal
              </div>
              <div className="text-[10px] text-[#718578]">
                Kenya Veterinary Board • Certified Digital Stamp
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
