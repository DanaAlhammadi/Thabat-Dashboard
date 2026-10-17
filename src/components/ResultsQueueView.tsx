import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  FileText, 
  ArrowRight, 
  AlertTriangle, 
  Layers, 
  MapPin, 
  ShieldCheck, 
  Thermometer,
  Clock,
  Filter
} from 'lucide-react';
import { AOI_A_SEGMENTS, AOI_B_SEGMENTS, ALL_SCREENING_SEGMENTS } from '../data/mockData';
import { ScreeningSegment, InspectionQueueItem } from '../types';

interface ResultsQueueViewProps {
  onSelectSegment: (segment: ScreeningSegment) => void;
  onDispatchCrew: (segment: ScreeningSegment) => void;
  onGenerateWorkOrder: (segment: ScreeningSegment) => void;
  queue: InspectionQueueItem[];
}

export const ResultsQueueView: React.FC<ResultsQueueViewProps> = ({
  onSelectSegment,
  onDispatchCrew,
  onGenerateWorkOrder,
  queue
}) => {
  const [selectedAOI, setSelectedAOI] = useState<'All' | 'AOI-A' | 'AOI-B'>('All');

  // Unified list ranked strictly according to project specifications
  // AOI-A ranked queue:
  // 01 - A-005 - Higher Priority
  // 02 - A-001 - Higher Priority
  // 03 - A-004 - Lower Priority
  // 04 - A-002 - Lower Priority
  // 05 - A-003 - Lower Priority
  // AOI-B ranked queue:
  // B-002 - Moderate / highest within AOI-B (LOW SUPPORT)
  // B-004 - Lower Priority (LOW SUPPORT)
  // B-001 - Lower Priority (LOW SUPPORT)
  // B-003 - Lower Priority (LOW SUPPORT)
  
  const aoiAList = [...AOI_A_SEGMENTS].sort((a, b) => a.rank - b.rank);
  const aoiBList = [...AOI_B_SEGMENTS].sort((a, b) => a.rank - b.rank);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Screening Results & Prioritised Inspection Queue</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
          Prioritised Road Segments
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Screening results ranked to answer: <strong>"Where should we inspect first?"</strong> Each ranking reflects relative thermal anomalies within its specific AOI, supplemented by verified valid pixel support.
        </p>

        {/* Segmented Filter */}
        <div className="pt-2 flex items-center gap-2">
          <div className="ios-segmented">
            <button
              onClick={() => setSelectedAOI('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedAOI === 'All' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Segments ({aoiAList.length + aoiBList.length})
            </button>
            <button
              onClick={() => setSelectedAOI('AOI-A')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedAOI === 'AOI-A' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-A: Saih Al Salam ({aoiAList.length})
            </button>
            <button
              onClick={() => setSelectedAOI('AOI-B')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedAOI === 'AOI-B' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-B: Fujairah Area ({aoiBList.length})
            </button>
          </div>
        </div>
      </div>

      {/* AOI-A Ranked Queue */}
      {(selectedAOI === 'All' || selectedAOI === 'AOI-A') && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#0D3B45] text-white">
                  AOI-A
                </span>
                <h2 className="text-lg font-bold text-[#0D3B45]">
                  Saih Al Salam Street / D42 — Prioritised Queue
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Landsat 9 L2 Surface Temperature · 88–91 valid pixels per segment (High Support)
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              5 Screened Segments
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200/60 rounded-2xl overflow-hidden">
            {aoiAList.map((item, index) => {
              const isHigher = item.screeningPriority === 'Higher Priority';
              const queueStatus = queue.find(q => q.segmentCode === item.code)?.workStatus || 'Ready for Dispatch';

              return (
                <div 
                  key={item.id}
                  className="p-4 sm:p-5 bg-white hover:bg-[#F8F9FA] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left rank and segment ID */}
                  <div className="flex items-start sm:items-center gap-3.5">
                    <span className="font-mono text-base font-extrabold text-[#0D3B45] w-7 text-center">
                      0{index + 1}
                    </span>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#0D3B45] bg-slate-100 px-2 py-0.5 rounded">
                          {item.code}
                        </span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isHigher 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {item.screeningPriority}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {item.validPixels} valid pixels
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 font-medium">
                        {item.explanation}
                      </div>

                      <div className="text-[11px] text-slate-500">
                        Median LST ≈ {item.medianLST}°C · Temp Range ≈ {item.tempRange}°C
                      </div>
                    </div>
                  </div>

                  {/* Right Action buttons */}
                  <div className="flex items-center gap-2 shrink-0 justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => onSelectSegment(item)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0D3B45] hover:bg-slate-100 transition-colors"
                    >
                      Evidence
                    </button>

                    <button
                      onClick={() => onGenerateWorkOrder(item)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Work Order</span>
                    </button>

                    <button
                      onClick={() => onDispatchCrew(item)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#0D3B45] text-white hover:bg-[#2E6F6E] transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Crew</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AOI-B Ranked Queue */}
      {(selectedAOI === 'All' || selectedAOI === 'AOI-B') && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#2E6F6E] text-white">
                  AOI-B
                </span>
                <h2 className="text-lg font-bold text-[#0D3B45]">
                  Fujairah Road Study Area — Preliminary Queue
                </h2>
              </div>
              <p className="text-xs text-amber-800 font-semibold mt-1">
                LOW SUPPORT WARNING: Current statistics derived from 2–3 valid pixels per segment only
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              LOW SUPPORT (Preliminary)
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200/60 rounded-2xl overflow-hidden">
            {aoiBList.map((item, index) => {
              const isModerate = item.screeningPriority === 'Moderate';

              return (
                <div 
                  key={item.id}
                  className="p-4 sm:p-5 bg-white hover:bg-[#F8F9FA] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left rank and segment ID */}
                  <div className="flex items-start sm:items-center gap-3.5">
                    <span className="font-mono text-base font-extrabold text-[#2E6F6E] w-7 text-center">
                      0{index + 1}
                    </span>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#0D3B45] bg-slate-100 px-2 py-0.5 rounded">
                          {item.code}
                        </span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isModerate
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {item.screeningPriority}
                        </span>
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                          {item.validPixels} pixels (LOW SUPPORT)
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 font-medium">
                        {item.explanation}
                      </div>

                      <div className="text-[11px] text-slate-500">
                        Median LST ≈ {item.medianLST}°C · Temp Range ≈ {item.tempRange}°C
                      </div>
                    </div>
                  </div>

                  {/* Right Action buttons */}
                  <div className="flex items-center gap-2 shrink-0 justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => onSelectSegment(item)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0D3B45] hover:bg-slate-100 transition-colors"
                    >
                      Evidence
                    </button>

                    <button
                      onClick={() => onGenerateWorkOrder(item)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Work Order</span>
                    </button>

                    <button
                      onClick={() => onDispatchCrew(item)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#2E6F6E] text-white hover:bg-[#0D3B45] transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Crew</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
