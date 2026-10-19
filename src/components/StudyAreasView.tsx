import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { AOI_A_SEGMENTS, AOI_B_SEGMENTS, ROAD_SEGMENTS } from '../data/mockData';
import { ScreeningSegment, RoadSegment } from '../types';
import { NetworkMap } from './NetworkMap';

interface StudyAreasViewProps {
  onSelectSegment: (segment: ScreeningSegment) => void;
  onNavigateToThermal: () => void;
  onDispatchInspection?: (segment: RoadSegment) => void;
  onAddToQueue?: (segment: RoadSegment | ScreeningSegment) => void;
}

export const StudyAreasView: React.FC<StudyAreasViewProps> = ({
  onSelectSegment,
  onNavigateToThermal,
  onDispatchInspection,
  onAddToQueue
}) => {
  const [activeAOI, setActiveAOI] = useState<'AOI-A' | 'AOI-B'>('AOI-A');
  const currentSegments = activeAOI === 'AOI-A' ? AOI_A_SEGMENTS : AOI_B_SEGMENTS;

  const handleSelectFromMap = (roadSeg: RoadSegment) => {
    const screening = currentSegments.find(s => s.code === roadSeg.code) ||
      (activeAOI === 'AOI-A' ? AOI_B_SEGMENTS : AOI_A_SEGMENTS).find(s => s.code === roadSeg.code);
    if (screening) {
      onSelectSegment(screening);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
          <MapPin className="w-3.5 h-3.5 text-[#2E6F6E]" />
          <span>Geographic Screening Corridors (Authoritative GeoJSON Geometry)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
          Study Areas: AOI-A & AOI-B
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Explore the two active study areas defined in ArcGIS Pro: <strong>AOI-A (Saih Al Salam Street / D42)</strong> in Dubai and <strong>AOI-B (Fujairah study area)</strong>. Powered by clean neutral light geographic basemaps, verified GeoJSON geometries, and thermal screening priority visualization.
        </p>
      </div>

      {/* Critical Landsat Raster Boundary Guard */}
      <div className="bg-[#F5F1E8] border border-[#D4B483] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-800 space-y-1">
          <div className="font-bold text-[#0D3B45]">
            CRITICAL DATA BOUNDARY: Landsat Raster Belongs to AOI-A ONLY
          </div>
          <p>
            The Landsat 9 Collection 2 Level-2 Surface Temperature raster (31 August 2026) covers <strong>AOI-A (Saih Al Salam Street / D42) only</strong>. Never imply the AOI-A Landsat raster covers AOI-B. Thermal figures for AOI-B are sourced exclusively from ArcGIS Pro segment statistics, which contain only 2–3 valid pixels per segment and are strictly classified as <strong>LOW SUPPORT / PRELIMINARY</strong>.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Real Professional Geospatial Leaflet Map with CartoDB Basemap */}
      {/* ------------------------------------------------------------- */}
      <NetworkMap
        segments={ROAD_SEGMENTS}
        onSelectSegment={handleSelectFromMap}
        initialAOI={activeAOI}
        onDispatchInspection={onDispatchInspection}
        onAddToQueue={onAddToQueue}
      />

      {/* Segment Cards List for Current AOI */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#0D3B45]">
                {activeAOI === 'AOI-A' ? 'AOI-A Segments Table' : 'AOI-B Segments Table (Low Support)'}
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {currentSegments.length} Segments
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Direct telemetry from {activeAOI === 'AOI-A' ? 'AOI_A_thermal_screening.csv' : 'AOI_B_thermal_screening.csv'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="ios-segmented">
              <button
                onClick={() => setActiveAOI('AOI-A')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeAOI === 'AOI-A'
                    ? 'bg-white text-[#0D3B45] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                AOI-A (Dubai)
              </button>
              <button
                onClick={() => setActiveAOI('AOI-B')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeAOI === 'AOI-B'
                    ? 'bg-white text-[#0D3B45] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                AOI-B (Fujairah)
              </button>
            </div>

            <button
              onClick={onNavigateToThermal}
              className="text-xs font-bold text-[#0D3B45] hover:text-[#2E6F6E] flex items-center gap-1 cursor-pointer"
            >
              <span>Thermal Charts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200/70 rounded-2xl overflow-hidden">
          {currentSegments.map((seg) => (
            <div
              key={seg.id}
              onClick={() => onSelectSegment(seg)}
              className="p-4 bg-white hover:bg-[#F8F9FA] transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start sm:items-center gap-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-[#0D3B45]">
                  {seg.code}
                </span>
                <div>
                  <div className="font-bold text-slate-900">{seg.roadName}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{seg.whyFlagged}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end">
                <div className="text-right font-mono">
                  <div className="font-bold text-[#0D3B45]">{seg.tMedian.toFixed(2)} °C</div>
                  <div className="text-[10px] text-slate-400">Δ {seg.tRange.toFixed(2)} °C</div>
                </div>

                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  seg.supportFlag === 'LOW SUPPORT'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {seg.validPixelCount} px ({seg.supportFlag})
                </span>

                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  seg.screeningFlag === 'HIGHER PRIORITY'
                    ? 'bg-amber-100 text-amber-900'
                    : seg.screeningFlag === 'MODERATE'
                      ? 'bg-[#F5F1E8] text-[#92400E]'
                      : 'bg-slate-100 text-slate-700'
                }`}>
                  {seg.screeningFlag}
                </span>

                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
