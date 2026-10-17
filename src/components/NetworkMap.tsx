import React, { useState } from 'react';
import { RoadSegment, SegmentStatus, ScreeningSegment } from '../types';
import { 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  MapPin, 
  Flame, 
  Droplets, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { AOI_A_SEGMENTS, AOI_B_SEGMENTS } from '../data/mockData';

interface NetworkMapProps {
  segments: RoadSegment[];
  selectedSegment: RoadSegment | null;
  onSelectSegment: (segment: RoadSegment) => void;
  statusFilter?: SegmentStatus | 'All';
  isV2?: boolean;
}

export const NetworkMap: React.FC<NetworkMapProps> = ({
  segments,
  selectedSegment,
  onSelectSegment,
  statusFilter = 'All',
  isV2 = false
}) => {
  const [activeAOI, setActiveAOI] = useState<'AOI-A' | 'AOI-B'>('AOI-A');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  // AOI-A segments (A-001 - A-005) & AOI-B segments (B-001 - B-004)
  const currentAOISegments = activeAOI === 'AOI-A' ? AOI_A_SEGMENTS : AOI_B_SEGMENTS;

  // Matching road segment from the main state
  const findFullSegment = (code: string): RoadSegment | undefined => {
    return segments.find(s => s.code === code);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] overflow-hidden flex flex-col">
      {/* Top Map Toolbar — iOS Style */}
      <div className="px-5 py-3.5 bg-white border-b border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-[#0D3B45]">
            <MapPin className="w-4 h-4 text-[#2E6F6E]" />
            <span>GIS Screening Grid</span>
          </div>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500 font-mono text-[11px]">
            {activeAOI === 'AOI-A' 
              ? 'Landsat 9 Thermal L2 Overlay (31 Aug 2026)' 
              : 'ArcGIS Pro Zonal Thermal (LOW SUPPORT: 2–3 px)'}
          </span>
        </div>

        {/* AOI Switcher & Map Controls */}
        <div className="flex items-center gap-2">
          <div className="ios-segmented">
            <button
              onClick={() => setActiveAOI('AOI-A')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeAOI === 'AOI-A'
                  ? 'bg-white text-[#0D3B45] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-A: Saih Al Salam (Dubai)
            </button>
            <button
              onClick={() => setActiveAOI('AOI-B')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeAOI === 'AOI-B'
                  ? 'bg-white text-[#0D3B45] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AOI-B: Fujairah Study Area
            </button>
          </div>

          <div className="flex items-center gap-1 text-slate-500 pl-2 border-l border-slate-200">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.85))}
              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="relative bg-[#F8F9FA] h-[460px] overflow-hidden select-none">
        {/* Subtle Map Grid Background */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="light-gis-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
              <circle cx="40" cy="40" r="1.2" fill="#CBD5E1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#light-gis-grid)" />
        </svg>

        {/* AOI Boundary & Road Segments SVG */}
        <div 
          className="w-full h-full transition-transform duration-300 origin-center flex items-center justify-center p-6"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg viewBox="0 0 800 420" className="w-full h-full max-h-[420px]">
            {activeAOI === 'AOI-A' ? (
              /* AOI-A: Saih Al Salam Street / D42 */
              <g>
                {/* AOI Boundary Polygon */}
                <polygon
                  points="120,60 680,60 740,360 80,360"
                  fill="#0D3B45"
                  fillOpacity="0.03"
                  stroke="#0D3B45"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  strokeOpacity="0.4"
                />
                <text x="140" y="90" fill="#0D3B45" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  AOI-A BOUNDARY · SAIH AL SALAM CORRIDOR (D42) · LANDSAT 9 COVERAGE
                </text>

                {/* Surrounding Context Roads */}
                <path d="M 60 220 Q 220 180 420 190 T 740 240" fill="none" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="3 3" />
                <path d="M 280 80 L 340 340" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="2 2" />
                <path d="M 520 80 L 560 340" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="2 2" />

                {/* Primary D42 Corridor Line */}
                <path 
                  d="M 160 280 L 260 240 L 380 200 L 510 160 L 640 120" 
                  fill="none" 
                  stroke="#94A3B8" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  strokeOpacity="0.4"
                />

                {/* Segments: A-005, A-001, A-004, A-002, A-003 */}
                {[
                  { code: 'A-005', x1: 160, y1: 280, x2: 260, y2: 240, mx: 210, my: 260, priority: 'Higher Priority', lst: '55.6°C', px: 91 },
                  { code: 'A-001', x1: 260, y1: 240, x2: 380, y2: 200, mx: 320, my: 220, priority: 'Higher Priority', lst: '54.6°C', px: 88 },
                  { code: 'A-004', x1: 380, y1: 200, x2: 510, y2: 160, mx: 445, my: 180, priority: 'Lower Priority', lst: '54.2°C', px: 91 },
                  { code: 'A-002', x1: 510, y1: 160, x2: 600, y2: 135, mx: 555, my: 148, priority: 'Lower Priority', lst: '54.2°C', px: 90 },
                  { code: 'A-003', x1: 600, y1: 135, x2: 670, y2: 115, mx: 635, my: 125, priority: 'Lower Priority', lst: '54.0°C', px: 90 },
                ].map((s) => {
                  const isHovered = hoveredCode === s.code;
                  const isSelected = selectedSegment?.code === s.code;
                  const isHigh = s.priority === 'Higher Priority';
                  const strokeColor = isHigh ? '#B45309' : '#0D3B45';

                  return (
                    <g 
                      key={s.code}
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredCode(s.code)}
                      onMouseLeave={() => setHoveredCode(null)}
                      onClick={() => {
                        const full = findFullSegment(s.code);
                        if (full) onSelectSegment(full);
                      }}
                    >
                      {/* Segment Stroke */}
                      <line
                        x1={s.x1}
                        y1={s.y1}
                        x2={s.x2}
                        y2={s.y2}
                        stroke={strokeColor}
                        strokeWidth={isSelected ? 10 : isHovered ? 8 : 6}
                        strokeLinecap="round"
                        strokeOpacity={isSelected ? 1 : 0.85}
                      />

                      {/* Anchor Node */}
                      <circle
                        cx={s.mx}
                        cy={s.my}
                        r={isSelected ? 8 : isHovered ? 7 : 5.5}
                        fill={isHigh ? '#F59E0B' : '#0D3B45'}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />

                      {/* Segment Code Tag */}
                      <rect
                        x={s.mx - 24}
                        y={s.my - 28}
                        width="48"
                        height="18"
                        rx="9"
                        fill={isSelected ? '#0D3B45' : '#FFFFFF'}
                        stroke={strokeColor}
                        strokeWidth="1.2"
                        className="shadow-xs"
                      />
                      <text
                        x={s.mx}
                        y={s.my - 16}
                        fill={isSelected ? '#FFFFFF' : '#0D3B45'}
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {s.code}
                      </text>
                    </g>
                  );
                })}
              </g>
            ) : (
              /* AOI-B: Fujairah Road Study Area */
              <g>
                {/* AOI-B Boundary Polygon */}
                <polygon
                  points="140,80 660,80 720,340 100,340"
                  fill="#2E6F6E"
                  fillOpacity="0.04"
                  stroke="#2E6F6E"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  strokeOpacity="0.5"
                />
                <text x="160" y="110" fill="#2E6F6E" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  AOI-B BOUNDARY · FUJAIRAH STUDY AREA · 2–3 PIXELS PER SEGMENT (LOW SUPPORT)
                </text>

                {/* Mountainous Topography Curves */}
                <path d="M 80 180 Q 240 120 400 240 T 720 160" fill="none" stroke="#E2E8F0" strokeWidth="2" />
                <path d="M 120 300 Q 320 220 520 310 T 740 280" fill="none" stroke="#E2E8F0" strokeWidth="2" />

                {/* Fujairah Roadway Path */}
                <path 
                  d="M 180 160 Q 300 240 440 200 T 640 280" 
                  fill="none" 
                  stroke="#94A3B8" 
                  strokeWidth="7" 
                  strokeLinecap="round" 
                  strokeOpacity="0.4"
                />

                {/* Segments: B-001, B-002, B-003, B-004 */}
                {[
                  { code: 'B-001', mx: 220, my: 185, priority: 'Lower Priority', lst: '24.3°C', px: 2 },
                  { code: 'B-002', mx: 340, my: 230, priority: 'Moderate', lst: '25.0°C', px: 3 },
                  { code: 'B-003', mx: 480, my: 215, priority: 'Lower Priority', lst: '24.3°C', px: 3 },
                  { code: 'B-004', mx: 600, my: 265, priority: 'Lower Priority', lst: '24.7°C', px: 3 }
                ].map((s) => {
                  const isHovered = hoveredCode === s.code;
                  const isSelected = selectedSegment?.code === s.code;
                  const isModerate = s.priority === 'Moderate';
                  const strokeColor = isModerate ? '#D97706' : '#2E6F6E';

                  return (
                    <g 
                      key={s.code}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredCode(s.code)}
                      onMouseLeave={() => setHoveredCode(null)}
                      onClick={() => {
                        const full = findFullSegment(s.code);
                        if (full) onSelectSegment(full);
                      }}
                    >
                      <circle
                        cx={s.mx}
                        cy={s.my}
                        r={isSelected ? 9 : isHovered ? 8 : 6}
                        fill={isModerate ? '#F59E0B' : '#2E6F6E'}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />

                      {/* Tag */}
                      <rect
                        x={s.mx - 24}
                        y={s.my - 28}
                        width="48"
                        height="18"
                        rx="9"
                        fill={isSelected ? '#2E6F6E' : '#FFFFFF'}
                        stroke={strokeColor}
                        strokeWidth="1.2"
                      />
                      <text
                        x={s.mx}
                        y={s.my - 16}
                        fill={isSelected ? '#FFFFFF' : '#2E6F6E'}
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {s.code}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}
          </svg>
        </div>

        {/* Legend Overlay at Bottom-Left */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 shadow-md text-xs space-y-1.5 max-w-xs">
          <div className="font-bold text-[#0D3B45] text-[11px] uppercase tracking-wide">
            Screening Priority Legend
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span className="text-slate-700">Higher Priority (Stronger Relative Anomaly)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D3B45]"></span>
            <span className="text-slate-700">Lower Priority (Baseline Corridor Behavior)</span>
          </div>
          <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
            Click any segment pin to review empirical evidence & dispatch actions.
          </div>
        </div>

        {/* Floating Quick Inspector Card at Top-Right if segment is hovered */}
        {hoveredCode && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3.5 shadow-xl text-xs max-w-xs animate-in fade-in duration-150">
            {(() => {
              const seg = currentAOISegments.find(s => s.code === hoveredCode);
              if (!seg) return null;
              return (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#0D3B45]">{seg.code}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      seg.screeningPriority === 'Higher Priority' 
                        ? 'bg-amber-100 text-amber-900' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {seg.screeningPriority}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">{seg.roadName}</div>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="text-slate-400">Median LST:</span>
                    <span className="font-mono font-bold text-[#0D3B45]">{seg.medianLST}°C</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Valid Pixels:</span>
                    <span className="font-mono text-slate-700">{seg.validPixels} px ({seg.supportQuality})</span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
