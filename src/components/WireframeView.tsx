import React, { useState } from 'react';
import { FEASIBILITY_GATE } from '../data/mockData';
import { 
  Compass, CheckCircle2, Cpu, Database, Satellite, Layers, 
  ArrowRight, ShieldCheck, FileCode, CheckSquare, Sparkles 
} from 'lucide-react';

interface WireframeViewProps {
  onSwitchToV1: () => void;
  onSwitchToV2: () => void;
}

export const WireframeView: React.FC<WireframeViewProps> = ({ onSwitchToV1, onSwitchToV2 }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'schematics' | 'gates'>('schematics');

  return (
    <div className="space-y-8">
      {/* Wireframe Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase font-mono">
              <Compass className="w-4 h-4" />
              <span>Deliverable: Dashboard Wireframes & Feasibility Gate Blueprint</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Architectural Wireframes & Engineering Grounding
            </h2>
            <p className="text-slate-300 text-sm max-w-3xl mt-2 leading-relaxed">
              In accordance with engineering rigor: we avoided premature UI decoration by first validating physical sensor feasibility, mathematical data contracts, and spatial wireframes before releasing Dashboard V1 and V2.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToV1}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-sm"
            >
              Launch Dashboard V1 →
            </button>
            <button
              onClick={onSwitchToV2}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              Launch Dashboard V2 →
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 border-b border-slate-800 pt-3 text-xs">
          <button
            onClick={() => setActiveTab('schematics')}
            className={`px-3 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'schematics'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            UI Wireframe Schematics & Layout Hierarchy
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'architecture'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            End-to-End Spectral Data Pipeline
          </button>
          <button
            onClick={() => setActiveTab('gates')}
            className={`px-3 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'gates'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Feasibility Gate Metrics (Sensor SNR & Core Truth)
          </button>
        </div>
      </div>

      {/* Tab 1: Wireframe Schematics (Blueprint view) */}
      {activeTab === 'schematics' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>
              <strong>Wireframe Design Principle:</strong> Zero AI Slop, single-elevation surfaces, tabular numerals, unboxed metadata, and high-density operational telemetry.
            </span>
            <span className="font-mono text-amber-400">1440px Baseline Grid</span>
          </div>

          {/* Interactive Wireframe Layout Diagram */}
          <div className="border-2 border-dashed border-slate-700 bg-slate-950 rounded-2xl p-6 space-y-4">
            <div className="text-center font-mono text-xs text-slate-500 uppercase tracking-widest pb-2 border-b border-dashed border-slate-800">
              [ WIREFRAME BLUEPRINT: DASHBOARD SYSTEM LAYOUT ]
            </div>

            {/* Top Bar Wireframe */}
            <div className="border border-slate-700 bg-slate-900/60 p-3 rounded-lg flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-white font-bold">[ BRAND ZONE: THABAT Wordmark ]</span>
              <span className="font-mono">[ ZONE 2: 4-5 Navigation Links (V1 / V2 / Queue / Wireframe / Market) ]</span>
              <span className="font-mono text-emerald-400">[ ZONE 3: Feasibility Tag & Pitch Action ]</span>
            </div>

            {/* KPI Stat Cards Wireframe */}
            <div className="grid grid-cols-4 gap-3">
              <div className="border border-slate-800 bg-slate-900/40 p-3 rounded-lg text-xs space-y-1">
                <span className="font-mono text-slate-500 block">[ METRIC 1 ]</span>
                <span className="font-mono text-white text-base font-bold">1,420 km Scanned</span>
                <span className="text-[10px] text-slate-500 block">Total network footprint</span>
              </div>
              <div className="border border-rose-900/40 bg-rose-950/20 p-3 rounded-lg text-xs space-y-1">
                <span className="font-mono text-rose-500 block">[ ALERT 1 ]</span>
                <span className="font-mono text-rose-400 text-base font-bold">High Priority (&lt;50)</span>
                <span className="text-[10px] text-slate-500 block">Urgent crew dispatch</span>
              </div>
              <div className="border border-orange-900/40 bg-orange-950/20 p-3 rounded-lg text-xs space-y-1">
                <span className="font-mono text-orange-500 block">[ ALERT 2 ]</span>
                <span className="font-mono text-orange-400 text-base font-bold">Inspect (50-69)</span>
                <span className="text-[10px] text-slate-500 block">Field validation target</span>
              </div>
              <div className="border border-emerald-900/40 bg-emerald-950/20 p-3 rounded-lg text-xs space-y-1">
                <span className="font-mono text-emerald-500 block">[ STATUS ]</span>
                <span className="font-mono text-emerald-400 text-base font-bold">Normal (85-100)</span>
                <span className="text-[10px] text-slate-500 block">Nominal baseline</span>
              </div>
            </div>

            {/* Center: GIS Map and Spectral Inspector Wireframe */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 border border-slate-700 bg-slate-900/30 rounded-xl p-6 min-h-[220px] flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>[ GIS CANVAS: SVG Highway Coordinates & Spectral Layer ]</span>
                  <span>[ Layer Controls: Composite / SWIR / Bitumen ]</span>
                </div>
                <div className="text-center font-mono text-xs text-slate-600">
                  Interactive multi-lane corridor polylines with status coloring & pulse pins
                </div>
                <div className="text-xs text-slate-500 font-mono flex justify-between">
                  <span>Lat: 24.95 to 25.32</span>
                  <span>Lng: 55.05 to 55.55</span>
                </div>
              </div>

              <div className="border border-slate-700 bg-slate-900/30 rounded-xl p-4 flex flex-col justify-between text-xs">
                <div className="font-mono text-slate-400">[ SPECTRAL PREVIEW MODULE ]</div>
                <div className="space-y-2 py-4">
                  <div className="h-12 border-b border-dashed border-slate-800 flex items-center justify-center font-mono text-[11px] text-slate-500">
                    λ 400nm - 2450nm Reflectance Curve
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    1450nm & 1940nm: H2O Liquid Pore Water
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    1720nm: Bitumen Carbonyl Oxidation
                  </div>
                </div>
                <div className="font-mono text-amber-400 text-[11px]">[ 14-Mo Early Warning Engine ]</div>
              </div>
            </div>

            {/* Bottom: High Density Table Wireframe */}
            <div className="border border-slate-800 bg-slate-900/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-2 border-b border-slate-800">
                <span>[ HIGH DENSITY SEGMENT HEALTH INVENTORY TABLE ]</span>
                <span>[ Search / Filter / Export GeoJSON ]</span>
              </div>
              <div className="font-mono text-[11px] text-slate-500 space-y-1">
                <div>Row #1: Code · Corridor · THABAT Score · Defect · Depth · Action Window · ROI · Action</div>
                <div>Row #2: Code · Corridor · THABAT Score · Defect · Depth · Action Window · ROI · Action</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: End-to-End Pipeline Architecture */}
      {activeTab === 'architecture' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white">Autonomous Spectral Pipeline Architecture</h3>
          <p className="text-xs text-slate-400">
            How raw satellite and aerial hyperspectral radiance cubes are converted into actionable highway work orders.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                <Satellite className="w-4 h-4" />
                <span>Stage 1: Remote Capture</span>
              </div>
              <p className="text-slate-300">
                Orbital and drone VNIR/SWIR spectrometers capture radiance cubes across 400–2450nm over national highway corridors.
              </p>
              <div className="font-mono text-[10px] text-slate-500 pt-1">48-hr Revisit Cadence</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                <Cpu className="w-4 h-4" />
                <span>Stage 2: Radiometry</span>
              </div>
              <p className="text-slate-300">
                MODTRAN6 atmospheric correction removes aerosol scattering, surface dust, and solar angle variance to extract pure surface reflectance.
              </p>
              <div className="font-mono text-[10px] text-slate-500 pt-1">RMS Error &lt; 1.8%</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                <Database className="w-4 h-4" />
                <span>Stage 3: Spectral AI</span>
              </div>
              <p className="text-slate-300">
                Absorption continuum removal isolates specific molecular features (1450nm water, 1720nm carbonyl, 2200nm clay subbase leaching).
              </p>
              <div className="font-mono text-[10px] text-slate-500 pt-1">THABAT Index 0–100</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Stage 4: Crew Dispatch</span>
              </div>
              <p className="text-slate-300">
                Automated inspection queue generates geofenced work orders with exact chemical treatment recipes for preventive action.
              </p>
              <div className="font-mono text-[10px] text-slate-500 pt-1">88% Cost Reduction</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Feasibility Gate Metrics */}
      {activeTab === 'gates' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Feasibility Gate Verification Report</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Completed February 2026 · Core lab correlation and atmospheric validation criteria.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
              ALL GATES PASSED
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
                  <th className="py-3 px-4">Verification Gate</th>
                  <th className="py-3 px-4">Required Engineering Benchmark</th>
                  <th className="py-3 px-4">Measured Field & Lab Result</th>
                  <th className="py-3 px-4 text-right">Gate Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {FEASIBILITY_GATE.metrics.map((metric) => (
                  <tr key={metric.name} className="hover:bg-slate-850/50">
                    <td className="py-3 px-4 font-semibold text-white">{metric.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{metric.benchmark}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-300">{metric.measured}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold border border-emerald-500/20 text-[11px]">
                        ✓ {metric.status}
                      </span>
                    </td>
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
