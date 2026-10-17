import React, { useState } from 'react';
import { 
  Flame, 
  Thermometer, 
  AlertCircle, 
  ArrowRight, 
  Filter, 
  HelpCircle,
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { AOI_A_SEGMENTS, AOI_B_SEGMENTS, ALL_SCREENING_SEGMENTS } from '../data/mockData';
import { ScreeningSegment, ScreeningPriority, SupportQuality } from '../types';

interface ThermalScreeningViewProps {
  onSelectSegment: (segment: ScreeningSegment) => void;
  onDispatchInspection: (segment: ScreeningSegment) => void;
}

export const ThermalScreeningView: React.FC<ThermalScreeningViewProps> = ({
  onSelectSegment,
  onDispatchInspection
}) => {
  const [activeAOIFilter, setActiveAOIFilter] = useState<'All' | 'AOI-A' | 'AOI-B'>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'Higher Priority' | 'Moderate' | 'Lower Priority'>('All');

  const filteredSegments = ALL_SCREENING_SEGMENTS.filter(seg => {
    if (activeAOIFilter !== 'All' && seg.aoiId !== activeAOIFilter) return false;
    if (priorityFilter !== 'All' && seg.screeningPriority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          <span>Thermal Screening & Relative Anomaly Matrix</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
          Thermal Screening Diagnostics
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Relative surface thermal screening based on Landsat 9 Collection 2 Level-2 Surface Temperature (AOI-A) and ArcGIS Pro zonal statistics (AOI-B). Identifies road sections exhibiting anomalous thermal inertia or temperature dispersion.
        </p>

        {/* Filter Controls */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {/* AOI Filter */}
          <div className="ios-segmented">
            <button
              onClick={() => setActiveAOIFilter('All')}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                activeAOIFilter === 'All' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All AOIs ({ALL_SCREENING_SEGMENTS.length})
            </button>
            <button
              onClick={() => setActiveAOIFilter('AOI-A')}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                activeAOIFilter === 'AOI-A' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-A: Saih Al Salam ({AOI_A_SEGMENTS.length})
            </button>
            <button
              onClick={() => setActiveAOIFilter('AOI-B')}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                activeAOIFilter === 'AOI-B' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-B: Fujairah ({AOI_B_SEGMENTS.length})
            </button>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="bg-white border border-slate-200 text-slate-700 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0D3B45]"
            >
              <option value="All">All Priorities</option>
              <option value="Higher Priority">Higher Priority</option>
              <option value="Moderate">Moderate Priority</option>
              <option value="Lower Priority">Lower Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scientific Meaning & Guard Banner */}
      <div className="bg-[#F5F1E8] border border-[#D4B483] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <AlertCircle className="w-5 h-5 text-[#0D3B45] shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 space-y-1">
          <div className="font-bold text-[#0D3B45]">
            Important Interpretation Guard
          </div>
          <p>
            The priority score is a <strong>relative thermal screening score within each AOI</strong>. It is <strong>NOT</strong>:
            a probability of damage, damage severity score, pavement health index, or structural failure prediction.
          </p>
          <p className="text-slate-600 pt-0.5">
            Terminology used: <em>"Thermal screening priority"</em>, <em>"Unusual thermal behaviour"</em>, <em>"Inspection priority"</em>, and <em>"Evidence for further inspection"</em>. We never claim "Damaged road" or "Detected pothole" from satellite remote sensing alone.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSegments.map((segment) => {
          const isHigher = segment.screeningPriority === 'Higher Priority';
          const isModerate = segment.screeningPriority === 'Moderate';
          const isLowSupport = segment.supportQuality === 'LOW SUPPORT';

          return (
            <div
              key={segment.id}
              className="ios-card ios-card-hover p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold px-2.5 py-0.5 rounded-lg bg-[#0D3B45] text-white">
                      {segment.code}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {segment.aoiId}
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    isHigher 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : isModerate
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {segment.screeningPriority}
                  </span>
                </div>

                {/* Corridor & Name */}
                <div>
                  <h3 className="text-base font-bold text-[#1E1E1E]">
                    {segment.roadName}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {segment.aoiName}
                  </div>
                </div>

                {/* Key Thermal Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Median LST</span>
                    <span className="text-xl font-bold font-mono text-[#0D3B45]">
                      {segment.medianLST.toFixed(1)}°C
                    </span>
                  </div>

                  <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Temp Range (Δ)</span>
                    <span className="text-xl font-bold font-mono text-slate-700">
                      {segment.tempRange.toFixed(1)}°C
                    </span>
                  </div>
                </div>

                {/* Support Quality & Pixel Count */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-500">Valid Pixels:</span>
                    <span className="font-mono font-bold text-[#0D3B45]">{segment.validPixels}</span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isLowSupport 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {segment.supportQuality}
                  </span>
                </div>

                {/* Short Explanation */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {segment.explanation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectSegment(segment)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0D3B45] hover:bg-slate-100 transition-colors flex items-center gap-1"
                >
                  <span>Evidence Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDispatchInspection(segment)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#0D3B45] text-white hover:bg-[#2E6F6E] transition-colors shadow-xs"
                >
                  Prioritise Inspection
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
