import React, { useState } from 'react';
import { 
  MapPin, 
  AlertTriangle, 
  Calendar, 
  Satellite, 
  Layers, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { AOI_A_SEGMENTS, AOI_B_SEGMENTS } from '../data/mockData';
import { ScreeningSegment } from '../types';

interface StudyAreasViewProps {
  onSelectSegment: (segment: ScreeningSegment) => void;
  onNavigateToThermal: () => void;
}

export const StudyAreasView: React.FC<StudyAreasViewProps> = ({
  onSelectSegment,
  onNavigateToThermal
}) => {
  const [selectedAOI, setSelectedAOI] = useState<'all' | 'AOI-A' | 'AOI-B'>('all');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
          <MapPin className="w-3.5 h-3.5 text-[#2E6F6E]" />
          <span>Active UAE Geographic Study Areas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
          Study Areas & Geographic Screening
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          THABAT monitors designated highway corridors across two distinct environmental regimes in the UAE: an arid desert arterial in Dubai (AOI-A) and an arterial study area in the mountainous terrain of Fujairah (AOI-B).
        </p>

        {/* Filter Segmented Control */}
        <div className="pt-2 flex items-center gap-2">
          <div className="ios-segmented">
            <button
              onClick={() => setSelectedAOI('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedAOI === 'all' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Study Areas (2)
            </button>
            <button
              onClick={() => setSelectedAOI('AOI-A')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedAOI === 'AOI-A' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-A: Saih Al Salam (Dubai)
            </button>
            <button
              onClick={() => setSelectedAOI('AOI-B')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedAOI === 'AOI-B' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-B: Fujairah Area
            </button>
          </div>
        </div>
      </div>

      {/* Critical Non-Overlap Warning Notice */}
      <div className="bg-[#F5F1E8] border border-[#D4B483] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 space-y-1">
          <div className="font-bold text-[#0D3B45]">
            Strict Data Boundary Disclosure: Landsat Raster Coverage
          </div>
          <p>
            The Landsat 9 surface temperature raster acquired on 31 August 2026 covers <strong>AOI-A only</strong>. It does <strong>not</strong> cover AOI-B. Thermal figures for AOI-B are sourced exclusively from the supplied ArcGIS Pro segment statistics, which contain only 2–3 valid pixels per segment and are strictly classified as <strong>LOW SUPPORT</strong>.
          </p>
        </div>
      </div>

      {/* Study Areas Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AOI-A Card */}
        {(selectedAOI === 'all' || selectedAOI === 'AOI-A') && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#0D3B45] text-white">
                  AOI-A
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  High Support (88–91 px)
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0D3B45]">Saih Al Salam Street / D42</h2>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <span>Dubai Desert Arterial Corridor</span>
                  <span>·</span>
                  <span>5 Screened Segments (A-001 to A-005)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <div className="text-slate-400 font-mono text-[10px]">SENSOR / PRODUCT</div>
                  <div className="font-semibold text-[#0D3B45] mt-0.5">Landsat 9 L2 Surface Temp</div>
                </div>
                <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <div className="text-slate-400 font-mono text-[10px]">ACQUISITION DATE</div>
                  <div className="font-semibold text-[#0D3B45] mt-0.5">31 August 2026</div>
                </div>
                <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <div className="text-slate-400 font-mono text-[10px]">RASTER RESOLUTION</div>
                  <div className="font-semibold text-[#0D3B45] mt-0.5">30m Resampled (TIRS-2)</div>
                </div>
                <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <div className="text-slate-400 font-mono text-[10px]">PIXEL SAMPLE DENSITY</div>
                  <div className="font-semibold text-emerald-700 mt-0.5">88 – 91 Valid Pixels/seg</div>
                </div>
              </div>

              {/* Segment List in AOI-A */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Segments in AOI-A
                </div>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                  {AOI_A_SEGMENTS.map((seg) => (
                    <div
                      key={seg.id}
                      onClick={() => onSelectSegment(seg)}
                      className="p-3 bg-white hover:bg-[#F8F9FA] cursor-pointer flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#0D3B45]">{seg.code}</span>
                        <span className="text-slate-600">{seg.roadName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#0D3B45]">{seg.medianLST}°C</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          seg.screeningPriority === 'Higher Priority'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {seg.screeningPriority}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] text-slate-500">
                Full USGS Collection 2 Level-2 surface temperature raster processing with DN=0 fill filtering.
              </p>
            </div>
          </div>
        )}

        {/* AOI-B Card */}
        {(selectedAOI === 'all' || selectedAOI === 'AOI-B') && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#2E6F6E] text-white">
                  AOI-B
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                  LOW SUPPORT (2–3 px)
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0D3B45]">Fujairah Road Study Area</h2>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <span>Eastern Mountainous Transit Corridor</span>
                  <span>·</span>
                  <span>4 Screened Segments (B-001 to B-004)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <div className="text-slate-400 font-mono text-[10px]">DATA SOURCE</div>
                  <div className="font-semibold text-[#0D3B45] mt-0.5">ArcGIS Pro Segment Stats</div>
                </div>
                <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <div className="text-slate-400 font-mono text-[10px]">COVERAGE STATUS</div>
                  <div className="font-semibold text-amber-700 mt-0.5">No Landsat Raster Here</div>
                </div>
                <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <div className="text-slate-400 font-mono text-[10px]">VALID PIXEL COUNT</div>
                  <div className="font-semibold text-amber-800 mt-0.5">2 to 3 Pixels Only</div>
                </div>
                <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/60">
                  <div className="text-slate-400 font-mono text-[10px]">CONFIDENCE TIER</div>
                  <div className="font-semibold text-amber-800 mt-0.5">Strictly Preliminary</div>
                </div>
              </div>

              {/* Segment List in AOI-B */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Segments in AOI-B (Low Support)
                </div>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                  {AOI_B_SEGMENTS.map((seg) => (
                    <div
                      key={seg.id}
                      onClick={() => onSelectSegment(seg)}
                      className="p-3 bg-white hover:bg-[#F8F9FA] cursor-pointer flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#0D3B45]">{seg.code}</span>
                        <span className="text-slate-600">{seg.roadName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#0D3B45]">{seg.medianLST}°C</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                          {seg.validPixels} px (Low)
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] text-slate-500">
                Segment stats derived from ArcGIS Pro zonal overlay. Mountain shadow and low valid pixel count require high-resolution follow-up.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
