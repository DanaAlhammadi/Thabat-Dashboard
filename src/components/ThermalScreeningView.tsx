import React, { useState } from 'react';
import { 
  Flame, 
  Layers, 
  AlertCircle, 
  ArrowRight, 
  Info, 
  HelpCircle,
  Table,
  BarChart3,
  ShieldAlert,
  Thermometer,
  Maximize2
} from 'lucide-react';
import { AOI_A_SEGMENTS, AOI_B_SEGMENTS, ALL_SCREENING_SEGMENTS } from '../data/mockData';
import { ScreeningSegment } from '../types';

interface ThermalScreeningViewProps {
  onSelectSegment: (segment: ScreeningSegment) => void;
  onDispatchInspection: (segment: ScreeningSegment) => void;
}

export const ThermalScreeningView: React.FC<ThermalScreeningViewProps> = ({
  onSelectSegment,
  onDispatchInspection
}) => {
  const [activeAOI, setActiveAOI] = useState<'AOI-A' | 'AOI-B'>('AOI-A');
  const [showRawCSV, setShowRawCSV] = useState<boolean>(false);

  const currentSegments = activeAOI === 'AOI-A' ? AOI_A_SEGMENTS : AOI_B_SEGMENTS;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          <span>Thermal Remote Sensing Diagnostics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
          Thermal Screening Diagnostics & Evidence
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Zonal land surface temperature (LST) statistics derived from <strong>Landsat 9 Collection 2 Level-2 Surface Temperature</strong> (AOI-A, 31 August 2026) and <strong>ArcGIS Pro zonal extractions</strong> (AOI-B). Identifies anomalous thermal behavior and internal temperature dispersion.
        </p>

        {/* AOI Toggle */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="ios-segmented">
            <button
              onClick={() => setActiveAOI('AOI-A')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeAOI === 'AOI-A' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-A: Saih Al Salam Street / D42 (High Support)
            </button>
            <button
              onClick={() => setActiveAOI('AOI-B')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeAOI === 'AOI-B' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-B: Fujairah study area (LOW SUPPORT)
            </button>
          </div>

          <button
            onClick={() => setShowRawCSV(!showRawCSV)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Table className="w-3.5 h-3.5 text-slate-500" />
            <span>{showRawCSV ? 'Hide Raw CSV' : 'View Raw CSV Data'}</span>
          </button>
        </div>
      </div>

      {/* Primary Statement: "Thermal screening ≠ pavement diagnosis" */}
      <div className="bg-[#0D3B45] text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4B483] uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>SCIENTIFIC PRINCIPLE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Thermal screening ≠ pavement diagnosis
          </h2>
          <p className="text-xs text-slate-200 max-w-2xl leading-relaxed">
            Thermal anomalies indicate radiative energy signatures and differential heat retention. They do <strong>not</strong> prove structural failure, rutting, or potholes. They serve exclusively as an empirical starting point to prioritize physical inspection.
          </p>
        </div>

        <div className="p-3 bg-white/10 rounded-2xl border border-white/20 text-right shrink-0">
          <span className="text-[10px] font-mono uppercase text-slate-300 block">AOI-A Landsat Raster Only</span>
          <span className="text-xs font-mono font-bold text-[#D4B483]">Never Applied to AOI-B</span>
        </div>
      </div>

      {/* 3-Panel Visual Summary Charts — Exactly Reproducing Uploaded PNGs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#0D3B45]">
              THABAT — {activeAOI} Thermal Screening Summary
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Screening evidence only; not proof of pavement damage · Source: {activeAOI === 'AOI-A' ? 'AOI_A_thermal_screening_summary.png' : 'AOI_B_thermal_screening_summary.png'}
            </p>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-[#0D3B45]">
            {activeAOI === 'AOI-A' ? '5 Segments · 88–91 Valid Pixels' : '4 Segments · 2–3 Valid Pixels (LOW SUPPORT)'}
          </span>
        </div>

        {/* 3 Panels Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel 1: Segment Median LST (Bar Chart) */}
          <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-xs font-bold text-[#0D3B45]">
                {activeAOI}: Segment Median LST
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Median surface temperature (°C)
              </span>
            </div>

            {/* SVG Bar Chart */}
            <div className="h-52 flex items-end justify-around gap-2 pt-4 px-2 border-b border-l border-slate-300">
              {currentSegments.map((seg) => {
                // scale heights
                const maxTemp = activeAOI === 'AOI-A' ? 60 : 30;
                const minTemp = activeAOI === 'AOI-A' ? 50 : 20;
                const heightPercent = Math.max(15, ((seg.tMedian - minTemp) / (maxTemp - minTemp)) * 90);
                const isHighest = seg.code === (activeAOI === 'AOI-A' ? 'A-005' : 'B-002');

                return (
                  <div key={seg.code} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[10px] font-mono font-bold text-[#0D3B45]">
                      {seg.tMedian.toFixed(1)}°
                    </span>
                    <div 
                      className={`w-full rounded-t-lg transition-all ${
                        isHighest ? 'bg-[#0D3B45]' : 'bg-[#2E6F6E]/80'
                      } group-hover:bg-[#D4B483]`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[10px] font-mono text-slate-600 font-bold -mb-4">
                      {seg.code}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="pt-4 text-center text-[10px] text-slate-500 font-mono">
              Road Segments
            </div>
          </div>

          {/* Panel 2: Thermal Profile by Segment (Scatter Plot) */}
          <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-xs font-bold text-[#0D3B45]">
                Thermal profile by segment
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Internal spread (max − min, °C) vs Median LST (°C)
              </span>
            </div>

            {/* Scatter SVG Plot */}
            <div className="h-52 relative border-b border-l border-slate-300 p-2 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 240 180">
                {/* Axes gridlines */}
                <line x1="20" y1="160" x2="220" y2="160" stroke="#E2E8F0" strokeWidth="1" />
                <line x1="20" y1="20" x2="20" y2="160" stroke="#E2E8F0" strokeWidth="1" />
                <line x1="20" y1="90" x2="220" y2="90" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="120" y1="20" x2="120" y2="160" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2 2" />

                {activeAOI === 'AOI-A' ? (
                  /* Scatter Points for A-001 to A-005 */
                  <>
                    {/* A-001 (54.60, 4.01) */}
                    <circle cx="110" cy="30" r="5" fill="#0D3B45" />
                    <text x="118" y="28" fontSize="8" fontWeight="bold" fill="#0D3B45">A-001</text>

                    {/* A-005 (55.61, 3.39) */}
                    <circle cx="200" cy="55" r="5" fill="#B45309" />
                    <text x="206" y="55" fontSize="8" fontWeight="bold" fill="#B45309">A-005</text>

                    {/* A-004 (54.23, 2.04) */}
                    <circle cx="70" cy="110" r="4.5" fill="#2E6F6E" />
                    <text x="78" y="110" fontSize="8" fill="#2E6F6E">A-004</text>

                    {/* A-003 (54.03, 1.24) */}
                    <circle cx="45" cy="140" r="4.5" fill="#2E6F6E" />
                    <text x="50" y="136" fontSize="8" fill="#2E6F6E">A-003</text>

                    {/* A-002 (54.20, 1.03) */}
                    <circle cx="68" cy="150" r="4.5" fill="#2E6F6E" />
                    <text x="74" y="152" fontSize="8" fill="#2E6F6E">A-002</text>
                  </>
                ) : (
                  /* Scatter Points for B-001 to B-004 */
                  <>
                    {/* B-002 (24.95, 0.46) */}
                    <circle cx="200" cy="30" r="5" fill="#B45309" />
                    <text x="180" y="24" fontSize="8" fontWeight="bold" fill="#B45309">B-002</text>

                    {/* B-001 (24.31, 0.44) */}
                    <circle cx="65" cy="40" r="4.5" fill="#2E6F6E" />
                    <text x="72" y="38" fontSize="8" fill="#2E6F6E">B-001</text>

                    {/* B-004 (24.69, 0.40) */}
                    <circle cx="140" cy="65" r="4.5" fill="#2E6F6E" />
                    <text x="146" y="65" fontSize="8" fill="#2E6F6E">B-004</text>

                    {/* B-003 (24.25, 0.32) */}
                    <circle cx="45" cy="140" r="4.5" fill="#2E6F6E" />
                    <text x="50" y="138" fontSize="8" fill="#2E6F6E">B-003</text>
                  </>
                )}
              </svg>
            </div>
            <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>{activeAOI === 'AOI-A' ? '54.0 °C' : '24.2 °C'}</span>
              <span>Median LST (°C)</span>
              <span>{activeAOI === 'AOI-A' ? '55.6 °C' : '25.0 °C'}</span>
            </div>
          </div>

          {/* Panel 3: Thermal Screening Priority (Horizontal Bar Chart) */}
          <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-xs font-bold text-[#0D3B45]">
                Thermal screening priority
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Relative screening priority score
              </span>
            </div>

            {/* Horizontal Bar Chart */}
            <div className="h-52 flex flex-col justify-around py-1 space-y-2 border-b border-l border-slate-300 px-2">
              {currentSegments.map((seg) => {
                const maxScore = activeAOI === 'AOI-A' ? 6.0 : 2.5;
                const widthPercent = Math.max(seg.priorityScore > 0 ? 10 : 2, (seg.priorityScore / maxScore) * 100);
                const isHigh = seg.priorityScore > 2.0;

                return (
                  <div key={seg.code} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="font-bold text-slate-700">{seg.code}</span>
                      <span className="text-[#0D3B45] font-semibold">{seg.priorityScore.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-slate-200/80 h-3.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          isHigh ? 'bg-[#0D3B45]' : 'bg-[#2E6F6E]/80'
                        }`}
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center text-[10px] text-slate-500 font-mono">
              Thermal screening priority score
            </div>
          </div>
        </div>
      </div>

      {/* Landsat Surface Temperature Context Raster Display (AOI-A Only) */}
      {activeAOI === 'AOI-A' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-[#0D3B45]">
                THABAT — Landsat Surface Temperature Context (31 August 2026)
              </h3>
              <p className="text-xs text-slate-500">
                Band 10 TIRS-2 radiometric raster · Saih Al Salam Street / D42 Corridor Context
              </p>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-slate-100 text-[#0D3B45] font-bold">
              0% Cloud Cover · Scene LC09_L2SP_160043_20260831_02_T1
            </span>
          </div>

          {/* Thermal Raster Canvas Simulation with Exact Colormap Bar */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 h-72 sm:h-96 flex items-center justify-center">
            {/* Background Satellite Thermal Map */}
            <div 
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage: `url(/src/assets/images/thabat_satellite_road_scan_1790338371795.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'sepia(0.3) saturate(1.8) hue-rotate(-20deg)'
              }}
            />

            {/* D42 Road Overlay Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400">
              <path 
                d="M 120 310 L 260 250 L 410 190 L 560 140 L 720 90" 
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="4" 
                strokeDasharray="6 4"
                strokeOpacity="0.8"
              />
              <text x="280" y="270" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                Saih Al Salam Street / D42
              </text>
            </svg>

            {/* Colorbar on Right (46°C to 57°C) matching landsat_thermal_context.png */}
            <div className="absolute right-4 top-6 bottom-6 w-14 bg-black/60 backdrop-blur-md rounded-xl p-2 flex items-center gap-1.5 border border-white/20 text-[10px] font-mono text-white">
              <div 
                className="w-3.5 h-full rounded-sm"
                style={{
                  background: 'linear-gradient(to bottom, #FFFF80, #FFA500, #CC0000, #4A0080, #000000)'
                }}
              />
              <div className="flex flex-col justify-between h-full py-0.5 text-[9px] text-slate-200">
                <span>57°</span>
                <span>54°</span>
                <span>51°</span>
                <span>48°</span>
                <span>46°</span>
              </div>
            </div>

            {/* Badge in Bottom Left */}
            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-xl border border-slate-700">
              Thermal Colormap: 46°C – 57°C (Kelvin = DN × 0.00341802 + 149.0, °C = Kelvin − 273.15)
            </div>
          </div>
        </div>
      )}

      {/* Raw CSV Data Table (Revealed when clicked) */}
      {showRawCSV && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0D3B45]">
              Raw Source Data: {activeAOI === 'AOI-A' ? 'AOI_A_thermal_screening.csv' : 'AOI_B_thermal_screening.csv'}
            </h3>
            <span className="text-xs text-slate-500 font-mono">Unmodified File Output</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F8F9FA] text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="p-2.5">segment_id</th>
                  <th className="p-2.5">t_min</th>
                  <th className="p-2.5">t_median</th>
                  <th className="p-2.5">t_max</th>
                  <th className="p-2.5">t_range</th>
                  <th className="p-2.5">valid_pixel_count</th>
                  <th className="p-2.5">priority_score</th>
                  <th className="p-2.5">support_flag</th>
                  <th className="p-2.5">screening_flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentSegments.map((row) => (
                  <tr key={row.code} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-[#0D3B45]">{row.code}</td>
                    <td className="p-2.5">{row.tMin.toFixed(2)}</td>
                    <td className="p-2.5 font-bold text-[#0D3B45]">{row.tMedian.toFixed(2)}</td>
                    <td className="p-2.5">{row.tMax.toFixed(2)}</td>
                    <td className="p-2.5">{row.tRange.toFixed(2)}</td>
                    <td className="p-2.5">{row.validPixelCount}</td>
                    <td className="p-2.5 font-bold">{row.priorityScore.toFixed(3)}</td>
                    <td className="p-2.5">{row.supportFlag}</td>
                    <td className="p-2.5 font-bold">{row.screeningFlag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
