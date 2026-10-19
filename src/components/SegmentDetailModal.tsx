import React, { useState } from 'react';
import { RoadSegment, ScreeningSegment } from '../types';
import { SpectralViewer } from './SpectralViewer';
import { 
  X, 
  Send, 
  FileText, 
  Flame, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  ShieldCheck, 
  Info,
  Calendar,
  Thermometer
} from 'lucide-react';
import { AOI_A_SEGMENTS, AOI_B_SEGMENTS } from '../data/mockData';

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

  const [activeTab, setActiveTab] = useState<'evidence' | 'spectral'>('evidence');

  // Find exact CSV matching record
  const matchingScreening = [...AOI_A_SEGMENTS, ...AOI_B_SEGMENTS].find(s => s.code === segment.code);

  const code = segment.code;
  const isAOIA = code.startsWith('A-');
  const medianLST = matchingScreening ? matchingScreening.tMedian.toFixed(2) : segment.medianLST?.toFixed(2) || '54.60';
  const tempRange = matchingScreening ? matchingScreening.tRange.toFixed(2) : segment.tempRange?.toFixed(2) || '3.40';
  const validPixels = matchingScreening ? matchingScreening.validPixelCount : segment.validPixels || 91;
  const supportFlag = matchingScreening ? matchingScreening.supportFlag : (isAOIA ? 'HIGH SUPPORT' : 'LOW SUPPORT');
  const screeningFlag = matchingScreening ? matchingScreening.screeningFlag : (segment.screeningPriority || 'LOWER PRIORITY');
  const priorityScore = matchingScreening ? matchingScreening.priorityScore.toFixed(3) : '0.000';

  const whyFlagged = matchingScreening?.whyFlagged || 
    (code === 'A-005' ? 'Highest relative median temperature with elevated internal thermal spread.' :
     code === 'A-001' ? 'Elevated median temperature and high internal thermal spread.' :
     code === 'B-002' ? 'Highest relative thermal-screening result within AOI-B, but only 3 valid thermal pixels are represented.' :
     'Thermal values remain within standard corridor baseline envelope.');

  const recommendedAction = matchingScreening?.recommendedAction || 
    (code.startsWith('A-') ? 'Prioritise for physical inspection.' : 'Preliminary screening signal — physical validation required.');

  const scientificNote = matchingScreening?.scientificNote || 'Thermal screening evidence is not proof of pavement damage.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS-Style Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-black px-2.5 py-1 rounded-xl bg-[#0D3B45] text-white">
              {code}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-[#1E1E1E]">
                  {matchingScreening?.roadName || segment.name}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isAOIA ? 'AOI-A: Saih Al Salam Street / D42' : 'AOI-B: Fujairah study area'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onGenerateWorkOrder(segment)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Work Order</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 bg-white border-b border-slate-100 flex items-center gap-3">
          <div className="ios-segmented">
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'evidence' ? 'bg-white text-[#0D3B45] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Screening Telemetry & Directive
            </button>
            {segment.spectralData && segment.spectralData.length > 0 && (
              <button
                onClick={() => setActiveTab('spectral')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'spectral' ? 'bg-white text-[#0D3B45] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Spectral Diagnostic Profile
              </button>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {activeTab === 'evidence' ? (
            <>
              {/* Primary 4-Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Median LST</span>
                  <span className="text-xl font-bold font-mono text-[#0D3B45] mt-0.5 block">
                    {medianLST} °C
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                    {isAOIA ? 'Landsat 9 L2' : 'ArcGIS Pro'}
                  </span>
                </div>

                <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Temperature Range</span>
                  <span className="text-xl font-bold font-mono text-slate-800 mt-0.5 block">
                    {tempRange} °C
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">Internal Spread (Δ)</span>
                </div>

                <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Valid Thermal Pixels</span>
                  <span className="text-xl font-bold font-mono text-[#0D3B45] mt-0.5 block">
                    {validPixels}
                  </span>
                  <span className={`text-[10px] font-bold mt-0.5 block ${
                    supportFlag === 'LOW SUPPORT' ? 'text-amber-800' : 'text-emerald-700'
                  }`}>
                    {supportFlag}
                  </span>
                </div>

                <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Screening Priority</span>
                  <span className="text-xs font-bold block mt-1.5 text-[#0D3B45]">
                    {screeningFlag}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
                    Score: {priorityScore}
                  </span>
                </div>
              </div>

              {/* WHY WAS THIS SEGMENT FLAGGED? */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  WHY WAS THIS SEGMENT FLAGGED?
                </span>
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  "{whyFlagged}"
                </p>
                <div className="text-[11px] text-slate-500 pt-1">
                  Derived from relative z-median and spread anomaly within {isAOIA ? 'AOI-A baseline' : 'AOI-B baseline'}.
                </div>
              </div>

              {/* RECOMMENDED ACTION */}
              <div className="p-4 rounded-2xl bg-white border-2 border-[#0D3B45]/20 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0D3B45]" />
                    <span className="font-bold text-[#0D3B45] text-xs uppercase tracking-wider">
                      RECOMMENDED ACTION
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Targeted Dispatch
                  </span>
                </div>
                <div className="text-sm font-extrabold text-[#0D3B45]">
                  "{recommendedAction}"
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dispatch mobile inspection crew to verify road surface conditions, execute visual distress survey, and record calibrated shoulder thermography.
                </p>
              </div>

              {/* SCIENTIFIC NOTE */}
              <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#D4B483] space-y-1 text-slate-800">
                <div className="flex items-center gap-2 font-bold text-[#0D3B45]">
                  <AlertCircle className="w-4 h-4 text-[#2E6F6E]" />
                  <span>SCIENTIFIC NOTE</span>
                </div>
                <p className="text-xs leading-relaxed">
                  "{scientificNote}"
                </p>
                {!isAOIA && (
                  <p className="text-[11px] text-amber-900 font-bold pt-1">
                    • AOI-B WARNING: Only {validPixels} valid thermal pixels available. Results are strictly PRELIMINARY.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-end gap-2.5">
                <button
                  onClick={() => onGenerateWorkOrder(segment)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Work Order</span>
                </button>

                <button
                  onClick={() => {
                    onDispatchCrew(segment);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0D3B45] text-white hover:bg-[#2E6F6E] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Inspection Crew</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-slate-200 space-y-1">
                <div className="font-bold text-[#0D3B45] text-xs">
                  27-Band Spectral Reflectance Profile (400–2450nm)
                </div>
                <p className="text-slate-600 text-xs">
                  Narrow-band spectral reflectance profile indicating baseline vs measured response across VNIR/SWIR bands.
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
