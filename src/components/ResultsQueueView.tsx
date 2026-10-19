import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  FileText, 
  ArrowRight, 
  AlertTriangle, 
  Layers, 
  MapPin, 
  Thermometer,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { AOI_A_SEGMENTS, AOI_B_SEGMENTS } from '../data/mockData';
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

  // Sorted strictly according to official priority ranking from the uploaded CSVs
  const aoiAList = [...AOI_A_SEGMENTS].sort((a, b) => b.priorityScore - a.priorityScore);
  const aoiBList = [...AOI_B_SEGMENTS].sort((a, b) => b.priorityScore - a.priorityScore);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Operational Ranking & Inspection Dispatch</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
          INSPECTION QUEUE
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Ranked order answering: <strong>"WHERE SHOULD WE INSPECT FIRST?"</strong> Every segment explains the exact empirical rationale behind its priority ranking without claiming pavement damage.
        </p>

        {/* Filter Toggle */}
        <div className="pt-2 flex items-center gap-2">
          <div className="ios-segmented">
            <button
              onClick={() => setSelectedAOI('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedAOI === 'All' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Segments ({aoiAList.length + aoiBList.length})
            </button>
            <button
              onClick={() => setSelectedAOI('AOI-A')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedAOI === 'AOI-A' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-A: Saih Al Salam ({aoiAList.length})
            </button>
            <button
              onClick={() => setSelectedAOI('AOI-B')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedAOI === 'AOI-B' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-B: Fujairah study area ({aoiBList.length})
            </button>
          </div>
        </div>
      </div>

      {/* Reminder Banner */}
      <div className="bg-[#F5F1E8] border border-[#D4B483] rounded-2xl p-4 flex items-center gap-3 text-xs text-slate-700">
        <AlertCircle className="w-5 h-5 text-[#0D3B45] shrink-0" />
        <span>
          <strong>Priority Labels Are Relative Screening Ranks:</strong> Badges like <em>HIGHER PRIORITY</em>, <em>MODERATE</em>, and <em>LOWER PRIORITY</em> are relative thermal screening indicators — they are <strong>NOT damage levels</strong>.
        </span>
      </div>

      {/* AOI-A Ranked Queue */}
      {(selectedAOI === 'All' || selectedAOI === 'AOI-A') && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#0D3B45] text-white">
                  AOI-A
                </span>
                <h2 className="text-lg font-bold text-[#0D3B45]">
                  Saih Al Salam Street / D42 — Ranked Inspection Order
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Landsat 9 L2 Surface Temperature · 88–91 valid pixels (HIGH SUPPORT)
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              5 Screened Segments
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200/70 rounded-2xl overflow-hidden">
            {aoiAList.map((item, index) => {
              const isHigher = item.screeningFlag === 'HIGHER PRIORITY';

              return (
                <div 
                  key={item.id}
                  className="p-5 bg-white hover:bg-[#F8F9FA] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Left: Rank, Code, and Why Flagged */}
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-lg font-black text-[#0D3B45] w-8 text-center pt-0.5">
                      0{index + 1}
                    </span>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#0D3B45] bg-slate-100 px-2 py-0.5 rounded">
                          {item.code}
                        </span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isHigher 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {item.screeningFlag}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {item.supportFlag} ({item.validPixelCount} px)
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Priority Score: {item.priorityScore.toFixed(2)}
                        </span>
                      </div>

                      {/* Explicit Answer: WHY WAS THIS SEGMENT FLAGGED? */}
                      <div className="text-xs text-slate-800 font-medium">
                        <span className="font-bold text-[#0D3B45]">Why flagged: </span>
                        <span>"{item.whyFlagged}"</span>
                      </div>

                      <div className="text-[11px] text-slate-500 font-mono">
                        Median LST: {item.tMedian.toFixed(2)} °C · Temp Range: {item.tRange.toFixed(2)} °C (Min {item.tMin.toFixed(1)}° / Max {item.tMax.toFixed(1)}°)
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0 justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <button
                      onClick={() => onSelectSegment(item)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#0D3B45] hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Inspect Evidence
                    </button>

                    <button
                      onClick={() => onGenerateWorkOrder(item)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      <span>Work Order</span>
                    </button>

                    <button
                      onClick={() => onDispatchCrew(item)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0D3B45] text-white hover:bg-[#2E6F6E] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#2E6F6E] text-white">
                  AOI-B
                </span>
                <h2 className="text-lg font-bold text-[#0D3B45]">
                  Fujairah study area — Ranked Inspection Order
                </h2>
              </div>
              <p className="text-xs text-amber-900 font-bold mt-1">
                LOW SUPPORT / PRELIMINARY: Only 2–3 valid pixels per segment available in current extraction
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              LOW SUPPORT (Preliminary)
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200/70 rounded-2xl overflow-hidden">
            {aoiBList.map((item, index) => {
              const isModerate = item.screeningFlag === 'MODERATE';

              return (
                <div 
                  key={item.id}
                  className="p-5 bg-white hover:bg-[#F8F9FA] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Left: Rank, Code, and Why Flagged */}
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-lg font-black text-[#2E6F6E] w-8 text-center pt-0.5">
                      0{index + 1}
                    </span>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#0D3B45] bg-slate-100 px-2 py-0.5 rounded">
                          {item.code}
                        </span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isModerate
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {item.screeningFlag}
                        </span>
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                          LOW SUPPORT ({item.validPixelCount} px)
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Priority Score: {item.priorityScore.toFixed(3)}
                        </span>
                      </div>

                      {/* Explicit Answer: WHY WAS THIS SEGMENT FLAGGED? */}
                      <div className="text-xs text-slate-800 font-medium">
                        <span className="font-bold text-[#0D3B45]">Why flagged: </span>
                        <span>"{item.whyFlagged}"</span>
                      </div>

                      <div className="text-[11px] text-slate-500 font-mono">
                        Median LST: {item.tMedian.toFixed(2)} °C · Temp Range: {item.tRange.toFixed(2)} °C (Min {item.tMin.toFixed(2)}° / Max {item.tMax.toFixed(2)}°)
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0 justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <button
                      onClick={() => onSelectSegment(item)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#0D3B45] hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Inspect Evidence
                    </button>

                    <button
                      onClick={() => onGenerateWorkOrder(item)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      <span>Work Order</span>
                    </button>

                    <button
                      onClick={() => onDispatchCrew(item)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#2E6F6E] text-white hover:bg-[#0D3B45] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
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
