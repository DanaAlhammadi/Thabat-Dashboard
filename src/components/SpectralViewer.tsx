import React, { useState } from 'react';
import { SpectralPoint } from '../types';
import { Activity, Info, Eye, Zap, Layers } from 'lucide-react';

interface SpectralViewerProps {
  spectralData: SpectralPoint[];
  segmentCode: string;
  defectName: string;
  severity: string;
}

export const SpectralViewer: React.FC<SpectralViewerProps> = ({
  spectralData,
  segmentCode,
  defectName,
  severity
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<SpectralPoint | null>(null);
  const [viewMode, setViewMode] = useState<'reflectance' | 'difference'>('reflectance');
  const [bandFilter, setBandFilter] = useState<'all' | 'vnir' | 'swir1' | 'swir2'>('all');

  // Filter wavelengths by band
  const filteredData = spectralData.filter(pt => {
    if (bandFilter === 'vnir') return pt.wavelength <= 1000;
    if (bandFilter === 'swir1') return pt.wavelength > 1000 && pt.wavelength <= 1800;
    if (bandFilter === 'swir2') return pt.wavelength > 1800;
    return true;
  });

  // Calculate SVG chart coordinates
  const svgWidth = 720;
  const svgHeight = 240;
  const padding = { top: 20, right: 30, bottom: 35, left: 45 };
  const chartW = svgWidth - padding.left - padding.right;
  const chartH = svgHeight - padding.top - padding.bottom;

  const minWl = Math.min(...filteredData.map(d => d.wavelength));
  const maxWl = Math.max(...filteredData.map(d => d.wavelength));

  // Determine Y domain
  const maxRef = Math.max(...filteredData.map(d => Math.max(d.baselineReflectance, d.currentReflectance))) * 1.15;
  const minRef = 0;

  const getX = (wl: number) => padding.left + ((wl - minWl) / (maxWl - minWl || 1)) * chartW;
  const getY = (ref: number) => padding.top + chartH - ((ref - minRef) / (maxRef - minRef || 1)) * chartH;

  // Build baseline path
  const baselinePath = filteredData
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.wavelength).toFixed(1)} ${getY(pt.baselineReflectance).toFixed(1)}`)
    .join(' ');

  // Build current path
  const currentPath = filteredData
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.wavelength).toFixed(1)} ${getY(pt.currentReflectance).toFixed(1)}`)
    .join(' ');

  // Area between curves for anomaly shading
  const areaPoints = filteredData.map(pt => `${getX(pt.wavelength).toFixed(1)},${getY(pt.currentReflectance).toFixed(1)}`);
  const baselineReversed = [...filteredData].reverse().map(pt => `${getX(pt.wavelength).toFixed(1)},${getY(pt.baselineReflectance).toFixed(1)}`);
  const anomalyAreaPath = `M ${areaPoints.join(' L ')} L ${baselineReversed.join(' L ')} Z`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
      {/* Spectral Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-white">Spectral Signature Diagnostic</h4>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-xs font-mono text-slate-400">{segmentCode} (400–2450nm)</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          {/* Band filters */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setBandFilter('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                bandFilter === 'all' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Full Spectrum
            </button>
            <button
              onClick={() => setBandFilter('vnir')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                bandFilter === 'vnir' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              VNIR (400-1000nm)
            </button>
            <button
              onClick={() => setBandFilter('swir1')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                bandFilter === 'swir1' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SWIR-1 (Moisture 1450)
            </button>
            <button
              onClick={() => setBandFilter('swir2')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                bandFilter === 'swir2' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SWIR-2 (Bitumen 1940-2310)
            </button>
          </div>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative bg-slate-950 rounded-lg p-2 border border-slate-800/80">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible select-none">
          <defs>
            {/* Grid pattern */}
            <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {[0, 0.1, 0.2, 0.3].map((val) => {
            const y = getY(val);
            if (y < padding.top || y > padding.top + chartH) return null;
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="rgba(51, 65, 85, 0.3)"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 6}
                  y={y + 3}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {(val * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}

          {/* Grid lines (vertical wavelengths) */}
          {filteredData
            .filter((_, idx) => idx % 4 === 0)
            .map((pt) => {
              const x = getX(pt.wavelength);
              return (
                <g key={pt.wavelength}>
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={padding.top + chartH}
                    stroke="rgba(51, 65, 85, 0.2)"
                    strokeDasharray="2 2"
                  />
                  <text
                    x={x}
                    y={svgHeight - 10}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {pt.wavelength}nm
                  </text>
                </g>
              );
            })}

          {/* Shaded difference anomaly region */}
          <path d={anomalyAreaPath} fill="url(#anomalyGradient)" />

          {/* Baseline curve (green/slate) */}
          <path
            d={baselinePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="4 2"
          />

          {/* Current curve (red/amber) */}
          <path
            d={currentPath}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2.5"
          />

          {/* Anomaly markers and labels */}
          {filteredData.map((pt) => {
            const cx = getX(pt.wavelength);
            const cy = getY(pt.currentReflectance);
            const isAnomaly = pt.flaggedAnomaly;

            return (
              <g 
                key={pt.wavelength}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Hit target */}
                <circle cx={cx} cy={cy} r="8" fill="transparent" />

                {isAnomaly && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="5"
                    fill="#f43f5e"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />
                )}

                <circle
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill={isAnomaly ? '#f43f5e' : '#cbd5e1'}
                />

                {isAnomaly && pt.featureLabel && (
                  <g transform={`translate(${cx}, ${cy - 12})`}>
                    <line x1="0" y1="0" x2="0" y2="-12" stroke="#f43f5e" strokeWidth="1" />
                    <rect
                      x="-55"
                      y="-26"
                      width="110"
                      height="15"
                      rx="3"
                      fill="#020617"
                      stroke="#f43f5e"
                      strokeWidth="0.75"
                    />
                    <text
                      x="0"
                      y="-16"
                      textAnchor="middle"
                      fill="#fda4af"
                      fontSize="7.5"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="600"
                    >
                      {pt.wavelength}nm Absorption
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip on Hover */}
        {hoveredPoint && (
          <div 
            className="absolute top-2 right-2 bg-slate-900/95 border border-slate-700 rounded-lg p-2.5 text-xs shadow-lg font-mono pointer-events-none z-10"
          >
            <div className="font-bold text-amber-400">λ = {hoveredPoint.wavelength} nm</div>
            <div className="flex items-center gap-3 text-slate-300 mt-1">
              <span>Baseline: {(hoveredPoint.baselineReflectance * 100).toFixed(2)}%</span>
              <span className="text-rose-400 font-bold">Current: {(hoveredPoint.currentReflectance * 100).toFixed(2)}%</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Delta: {((hoveredPoint.currentReflectance - hoveredPoint.baselineReflectance) * 100).toFixed(2)}%
              {hoveredPoint.featureLabel && (
                <span className="block text-rose-300 font-sans mt-0.5">{hoveredPoint.featureLabel}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Spectral Interpretation Legend & Key Diagnostic Findings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
        <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
          <div className="w-3 h-0.5 bg-emerald-500 mt-2 shrink-0" />
          <div>
            <div className="font-medium text-slate-200">Baseline Reference Spectrum</div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Control spectral envelope of unoxidized, dry pavement calibrated against national core samples.
            </p>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
          <div className="w-3 h-0.5 bg-rose-500 mt-2 shrink-0" />
          <div>
            <div className="font-medium text-slate-200">Current Scanned Profile</div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Measured from recent satellite/aerial pass. Deviations flag subsurface molecular distress.
            </p>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/60 border border-amber-500/20 bg-amber-500/5 flex items-start gap-2.5">
          <Zap className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <div className="font-medium text-amber-300">Diagnostic Root Cause</div>
            <p className="text-[11px] text-slate-300 mt-0.5 font-medium">
              {defectName} ({severity})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
