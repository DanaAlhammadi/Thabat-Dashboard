import React, { useState } from 'react';
import { 
  Award, X, ArrowRight, ShieldCheck, 
  Sparkles, CheckCircle2, ChevronRight, Zap, Target, BookOpen
} from 'lucide-react';

interface JudgePitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (view: any) => void;
}

export const JudgePitchModal: React.FC<JudgePitchModalProps> = ({ isOpen, onClose, onNavigateTo }) => {
  if (!isOpen) return null;

  const [activeStep, setActiveStep] = useState<number>(0);

  const pitchSteps = [
    {
      title: '1. What THABAT Is & Who Uses It',
      kicker: 'The Core Mission',
      headline: 'A satellite-based road environmental-risk screening and prioritisation system for UAE roads.',
      content: 'THABAT helps national transport authorities, highway operators, and municipal engineers answer the critical operational question: "Where should we inspect first?" Instead of blind road patrols across desert networks, orbital remote sensing identifies anomalous surface thermal behaviour to guide physical inspections.',
      badge: 'Screening First',
      actionLabel: 'Explore Dashboard Home',
      actionView: 'dashboard'
    },
    {
      title: '2. The 4-Stage Operational Loop',
      kicker: 'SCREEN → UNDERSTAND → PRIORITISE → INSPECT',
      headline: 'Transforming orbital radiance into a prioritized field inspection queue.',
      content: 'Phase 1: Screen road corridors using Landsat 9 Collection 2 L2 thermal and Sentinel-2 L2A multispectral data. Phase 2: Understand pixel support and radiometric limits. Phase 3: Calculate relative anomaly priorities within each AOI. Phase 4: Dispatch physical inspection crews with clear work orders.',
      badge: 'Zero Lane Closures',
      actionLabel: 'View Prioritised Queue',
      actionView: 'results'
    },
    {
      title: '3. Empirical Evidence & Scientific Honesty',
      kicker: 'What We Can & Cannot Prove',
      headline: 'Transparent satellite evidence without inflated claims or unproven failure predictions.',
      content: 'We do not claim satellite data directly proves potholes or structural collapse. We show relative thermal anomalies (e.g. A-005 median LST 55.6°C, range 3.4°C across 91 valid pixels), disclose Sentinel-2 visual comparisons (19 Sep ↔ 4 Oct 2026), and openly tag low-support areas (AOI-B has 2–3 valid pixels).',
      badge: 'Scientific Integrity',
      actionLabel: 'Inspect Evidence Stack',
      actionView: 'evidence'
    },
    {
      title: '4. The Evolutionary Roadmap & Satellite 813',
      kicker: 'Future Horizons',
      headline: 'From working thermal PoC to multi-spectral and Satellite 813 integration.',
      content: 'Now: Working thermal screening PoC with Colab reproducible notebook (02_main_analysis.ipynb). Next: Rainfall history integration, enhanced multispectral indices, and high-resolution optical imagery. Future: Potential Satellite 813 imagery and hyperspectral feature fusion for comprehensive UAE road asset intelligence.',
      badge: 'Colab Reproducible',
      actionLabel: 'Review Method & Roadmap',
      actionView: 'about'
    }
  ];

  const current = pitchSteps[activeStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#F8F9FA] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 border border-slate-200/90 shadow-xs flex items-center justify-center shrink-0">
              <img 
                src="/assets/aistudio/image_724da27a.png" 
                alt="THABAT Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0D3B45]">THABAT Competition Pitch Dossier</h3>
              <p className="text-xs text-slate-500">10-Second Executive Walkthrough for Judges</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Step Progress Pills */}
        <div className="px-6 pt-4 pb-2 bg-white flex items-center gap-2 border-b border-slate-100">
          {pitchSteps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeStep === idx 
                  ? 'bg-[#0D3B45] text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              Step 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2E6F6E]">
              {current.kicker}
            </span>
            <h2 className="text-lg font-extrabold text-[#0D3B45]">
              {current.title}
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#D4B483] space-y-1">
            <div className="font-bold text-slate-900 text-xs sm:text-sm">
              "{current.headline}"
            </div>
          </div>

          <p className="text-slate-700 leading-relaxed text-xs">
            {current.content}
          </p>

          <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200 flex items-center justify-between">
            <span className="text-slate-500 font-medium">Core Principle:</span>
            <span className="font-bold text-[#0D3B45] font-mono">{current.badge}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F8F9FA] border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onNavigateTo(current.actionView);
              onClose();
            }}
            className="text-xs font-semibold text-[#0D3B45] hover:text-[#2E6F6E] flex items-center gap-1"
          >
            <span>{current.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {activeStep < pitchSteps.length - 1 ? (
              <button
                onClick={() => setActiveStep(prev => prev + 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0D3B45] text-white hover:bg-[#2E6F6E] transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>Next Point</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0D3B45] text-white hover:bg-[#2E6F6E] transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
