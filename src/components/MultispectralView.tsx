import React, { useState } from 'react';
import { 
  Eye, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Layers, 
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const MultispectralView: React.FC = () => {
  const [selectedBandMode, setSelectedBandMode] = useState<'rgb' | 'nir' | 'swir'>('rgb');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
          <Eye className="w-3.5 h-3.5 text-[#2E6F6E]" />
          <span>Multi-Temporal Satellite Observations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
          MULTISPECTRAL CONTEXT
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Sentinel-2 Multi-Spectral Instrument (MSI) Level-2A surface reflectance comparison across target road corridors in the United Arab Emirates.
        </p>

        {/* Timeline Pill */}
        <div className="pt-2 flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-xs font-mono font-bold text-[#0D3B45]">
            <Calendar className="w-4 h-4 text-[#2E6F6E]" />
            <span>Timeline: 19 Sep 2026 → 4 Oct 2026</span>
          </div>
        </div>
      </div>

      {/* Observed Result Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            OBSERVED RESULT
          </span>
          <span className="text-xs font-mono px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
            Validated Pass
          </span>
        </div>

        <blockquote className="p-5 rounded-2xl bg-[#F8F9FA] border-l-4 border-[#0D3B45] text-sm sm:text-base font-semibold text-[#0D3B45] italic">
          "No obvious visual road-surface change detected in the tested views."
        </blockquote>

        <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Contextual evidence only — not proof of unchanged pavement condition
        </div>

        {/* Critical Scientific Guardrails */}
        <div className="p-5 rounded-2xl bg-[#F5F1E8] border border-[#D4B483] space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#0D3B45]">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Interpretation Guard: Scale & Resolution Limitations</span>
          </div>
          <p className="text-slate-800 leading-relaxed">
            Sentinel-2 provides multispectral context, but its 10-meter pixel resolution does <strong>not</strong> provide fine pavement-defect detection at this scale.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-slate-700 border-t border-[#D4B483]/60">
            <p>
              • <strong>Do NOT say:</strong> "The road did not change."
            </p>
            <p>
              • <strong>Do NOT claim:</strong> Sentinel-2 proved that no deterioration occurred.
            </p>
          </div>
        </div>
      </div>

      {/* Multi-Date Comparison Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pass 1: 19 September 2026 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">BASELINE PASS</span>
              <h3 className="text-base font-bold text-[#0D3B45]">19 September 2026</h3>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
              Sentinel-2A MSI
            </span>
          </div>

          {/* Visual simulation card */}
          <div className="h-56 rounded-2xl bg-slate-900 border border-slate-200 overflow-hidden relative flex items-center justify-center">
            <div 
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage: `url(/src/assets/images/thabat_satellite_road_scan_1790338371795.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: selectedBandMode === 'nir' ? 'sepia(0.8) hue-rotate(90deg)' : selectedBandMode === 'swir' ? 'contrast(1.4) hue-rotate(180deg)' : 'none'
              }}
            />
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-white">
              S2A · Level-2A BOA Reflectance
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald-400">
              Clear Pass · 0% Cloud
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Spectral Bands:</span>
              <span className="text-slate-800">B2, B3, B4, B8 (10m)</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Atmospheric Correction:</span>
              <span className="text-emerald-700">Sen2Cor Applied</span>
            </div>
          </div>
        </div>

        {/* Pass 2: 04 October 2026 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">COMPARISON PASS</span>
              <h3 className="text-base font-bold text-[#0D3B45]">04 October 2026</h3>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
              Sentinel-2B MSI
            </span>
          </div>

          {/* Visual simulation card */}
          <div className="h-56 rounded-2xl bg-slate-900 border border-slate-200 overflow-hidden relative flex items-center justify-center">
            <div 
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage: `url(/src/assets/images/thabat_satellite_road_scan_1790338371795.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: selectedBandMode === 'nir' ? 'sepia(0.8) hue-rotate(90deg)' : selectedBandMode === 'swir' ? 'contrast(1.4) hue-rotate(180deg)' : 'none'
              }}
            />
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-white">
              S2B · Level-2A BOA Reflectance
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald-400">
              Clear Pass · 0% Cloud
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Delta vs 19 Sep:</span>
              <span className="text-slate-800">No gross surface shift</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Pavement Detection Limit:</span>
              <span className="text-amber-800 font-semibold">&gt; 10m spatial resolution</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
