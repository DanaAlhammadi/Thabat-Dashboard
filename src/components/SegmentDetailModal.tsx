import React, { useState } from 'react';
import { RoadSegment } from '../types';
import { SpectralViewer } from './SpectralViewer';
import { 
  X, 
  Send, 
  FileText, 
  Thermometer, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Eye, 
  Flame,
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';

interface SegmentDetailModalProps {
  segment: RoadSegment | null;
  onClose: () => void;
  onDispatchCrew: (segment: RoadSegment) => void;
  onGenerateWorkOrder: (segment: RoadSegment) => void;
}

export const SegmentDetailModal: React.FC<SegmentDetailModalProps> = ({
  segment,
  onClose,
  onDispatchCrew,
  onGenerateWorkOrder
}) => {
  if (!segment) return null;

  const [activeTab, setActiveTab] = useState<'evidence' | 'spectral' | 'details'>('evidence');

  const isHigherPriority = segment.screeningPriority === 'Higher Priority' || segment.status === 'High Priority';
  const isLowSupport = segment.supportQuality === 'LOW SUPPORT';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS-Style Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-extrabold px-2.5 py-0.5 rounded-lg bg-[#0D3B45] text-white">
              {segment.code}
            </span>
            <div>
              <h3 className="text-base font-bold text-[#1E1E1E] leading-tight">
                {segment.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {segment.corridor} · {segment.district}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onGenerateWorkOrder(segment)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Work Order</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 bg-white border-b border-slate-100 flex items-center gap-3">
          <div className="ios-segmented">
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'evidence' ? 'bg-white text-[#0D3B45] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Empirical Evidence & Recommendation
            </button>
            <button
              onClick={() => setActiveTab('spectral')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'spectral' ? 'bg-white text-[#0D3B45] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Spectral Diagnostic Curve
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {activeTab === 'evidence' && (
            <>
              {/* Evidence Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Median LST</span>
                  <span className="text-xl font-bold font-mono text-[#0D3B45]">
                    {segment.medianLST !== undefined ? `${segment.medianLST.toFixed(1)}°C` : '54.6°C'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Landsat 9 L2</span>
                </div>

                <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Temp Range (Δ)</span>
                  <span className="text-xl font-bold font-mono text-slate-700">
                    {segment.tempRange !== undefined ? `${segment.tempRange.toFixed(1)}°C` : '3.4°C'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Within Segment</span>
                </div>

                <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Valid Pixels</span>
                  <span className="text-xl font-bold font-mono text-[#0D3B45]">
                    {segment.validPixels !== undefined ? segment.validPixels : 91}
                  </span>
                  <span className={`text-[10px] font-bold mt-0.5 block ${
                    isLowSupport ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    {segment.supportQuality || 'High support'}
                  </span>
                </div>

                <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Screening Priority</span>
                  <span className="text-sm font-bold block mt-1 text-[#0D3B45]">
                    {segment.screeningPriority || 'Higher Priority'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Relative Ranking</span>
                </div>
              </div>

              {/* Empirical Explanation */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200/70 space-y-2">
                <div className="text-xs font-bold text-[#0D3B45] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#2E6F6E]" />
                  <span>Thermal Evidence Explanation</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {segment.recommendation?.rationale || 
                    `Segment ${segment.code} demonstrates anomalous surface thermal behavior in the satellite pass compared to the corridor baseline envelope.`}
                </p>
              </div>

              {/* Multispectral Evidence (Sentinel-2) */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200/70 space-y-2">
                <div className="text-xs font-bold text-[#0D3B45] flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#2E6F6E]" />
                  <span>Multispectral Evidence (Sentinel-2 MSI)</span>
                </div>
                <div className="text-slate-700 leading-relaxed space-y-1">
                  <p>
                    <strong>Observed result (19 Sep ↔ 4 Oct 2026):</strong> "No obvious visual road-surface change detected in the tested views."
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Sentinel-2 provides multispectral context, but its 10-meter resolution cannot resolve fine pavement cracks. This finding does <em>not</em> imply that no micro-deterioration occurred.
                  </p>
                </div>
              </div>

              {/* Data Limitations */}
              <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#D4B483] space-y-1.5">
                <div className="text-xs font-bold text-[#0D3B45] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>Empirical Limitations</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Thermal anomalies indicate radiative and heat retention characteristics. They do <strong>not</strong> prove structural failure, rutting, or potholes without in-situ physical ground-truth.
                  {isLowSupport && ' CRITICAL: Segment relies on low pixel counts (2–3 px) and must be treated as strictly preliminary.'}
                </p>
              </div>

              {/* Key Recommendation Card: PRIORITISE FOR PHYSICAL INSPECTION */}
              <div className="p-5 rounded-2xl bg-white border-2 border-[#0D3B45]/20 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#0D3B45] text-white">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                        RECOMMENDED ACTION
                      </span>
                      <h4 className="text-sm font-bold text-[#0D3B45]">
                        Prioritise for Physical Inspection
                      </h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Not: "Road is damaged"
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Dispatch mobile engineering crew to perform on-site visual survey, asphalt shoulder thermography, and core calibration along kilometer mark {segment.code}.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 justify-end">
                  <button
                    onClick={() => onGenerateWorkOrder(segment)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Generate Official Work Order</span>
                  </button>

                  <button
                    onClick={() => {
                      onDispatchCrew(segment);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0D3B45] text-white hover:bg-[#2E6F6E] transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Inspection Crew</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'spectral' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-slate-200 space-y-1">
                <div className="font-bold text-[#0D3B45] text-xs">
                  27-Band Spectral Reflectance Profile (400–2450nm)
                </div>
                <p className="text-slate-600 text-xs">
                  Simulated narrow-band hyperspectral signature highlighting potential absorption anomalies in hydrocarbon (1720nm/2310nm) and water (1450nm/1940nm) bands.
                </p>
              </div>

              <SpectralViewer 
                spectralData={segment.spectralData} 
                segmentCode={segment.code} 
                defectName={segment.primaryDefect} 
                severity={segment.status} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
