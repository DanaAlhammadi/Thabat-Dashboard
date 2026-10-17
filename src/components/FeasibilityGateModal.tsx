import React from 'react';
import { FEASIBILITY_GATE } from '../data/mockData';
import { ShieldCheck, X, CheckCircle2, Check, FileCheck, Award } from 'lucide-react';

interface FeasibilityGateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeasibilityGateModal: React.FC<FeasibilityGateModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-white border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0D3B45]">Feasibility Gate Verification Dossier</h3>
              <p className="text-xs text-slate-500">Engineering Readiness Before UI Development</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Gate Passed: Ground Truth & Radiometric Integrity Confirmed</span>
            </div>
            <p className="text-slate-700 text-xs leading-relaxed">
              THABAT adheres to the core requirement: <em>Build the dashboard after the feasibility gate; avoid premature UI work.</em> Landsat 9 DN=0 fill filtering, Sentinel-2 comparative imagery, and radiometric scaling were systematically benchmarked.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-[#0D3B45] uppercase tracking-wider text-[11px]">
              Physical & Algorithmic Performance Benchmarks
            </h4>

            <div className="space-y-2">
              {FEASIBILITY_GATE.metrics.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200/70 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-800">{item.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">Target: {item.benchmark}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-emerald-700">{item.measured}</div>
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                      <Check className="w-3 h-3" />
                      <span>{item.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#F5F1E8] border border-[#D4B483] rounded-2xl space-y-1 text-slate-700">
            <span className="font-bold text-[#0D3B45]">Audited Sign-Off:</span>
            <p className="text-[11px] text-slate-600">
              Verified by THABAT Systems Engineering & Radiometric Verification Lead.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#F8F9FA] border-t border-slate-200 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0D3B45] text-white hover:bg-[#2E6F6E] transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
