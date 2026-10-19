import React, { useState } from 'react';
import { 
  Layers, 
  Flame, 
  Eye, 
  Sparkles, 
  CloudRain, 
  Camera, 
  Calculator, 
  CheckCircle2, 
  AlertCircle,
  ShieldAlert,
  Satellite,
  Info
} from 'lucide-react';
import { EVIDENCE_STACK } from '../data/mockData';

export const EnvironmentalEvidenceView: React.FC = () => {
  // Interactive Landsat DN calculator state for judges/evaluators
  const [inputDN, setInputDN] = useState<number>(51240); // realistic Landsat 9 L2 DN

  // Kelvin = DN * 0.00341802 + 149.0
  // Celsius = Kelvin - 273.15
  const kelvin = inputDN > 0 ? inputDN * 0.00341802 + 149.0 : 0;
  const celsius = inputDN > 0 ? kelvin - 273.15 : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
          <Layers className="w-3.5 h-3.5 text-[#2E6F6E]" />
          <span>Multimodal Remote Sensing Evidence Stack</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
          Evidence Stack & Sensor Science
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          THABAT synthesizes thermal, multispectral, and environmental remote sensing data layers to screen road behavior. We transparently disclose the operational state, mathematical derivation, and limitations of every data source.
        </p>
      </div>

      {/* Evidence Quality Grading System — Strictly Qualitative (No Fake Percentages) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#0D3B45]">Evidence Quality Grading Framework</h2>
          <p className="text-xs text-slate-500 font-medium">
            Qualitative evidence-quality indicator — represents empirical sample density and data confidence, <strong>NOT model confidence probability</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-slate-900">HIGH SUPPORT</span>
            </div>
            <p className="text-xs text-slate-600">
              High valid pixel count (&gt;80 px), verified metadata, cloud-free, and validated radiometric scale.
            </p>
            <div className="text-[10px] font-mono text-emerald-800 font-bold pt-1">
              Active: AOI-A (A-001–005)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-sky-200 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span className="text-xs font-bold text-slate-900">MEDIUM SUPPORT</span>
            </div>
            <p className="text-xs text-slate-600">
              Moderate sampling (&gt;20 px) with acceptable atmospheric correction and corridor width coverage.
            </p>
            <div className="text-[10px] font-mono text-sky-800 font-bold pt-1">
              Secondary candidate corridors
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-xs font-bold text-amber-900">LOW SUPPORT</span>
            </div>
            <p className="text-xs text-amber-900">
              Sparse pixel counts (&lt;5 px) or terrain shadow interference. Results are strictly preliminary.
            </p>
            <div className="text-[10px] font-mono text-amber-900 font-black pt-1">
              Active: AOI-B (B-001–004, 2–3 px)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span className="text-xs font-bold text-slate-900">NOT YET VALIDATED</span>
            </div>
            <p className="text-xs text-slate-600">
              Planned future sensor inputs not yet ingested into operational screening pipeline.
            </p>
            <div className="text-[10px] font-mono text-slate-500 font-bold pt-1">
              Hyperspectral, VHR, Radar
            </div>
          </div>
        </div>
      </div>

      {/* Active Layer 1: Landsat 9 Surface Temperature */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-900">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0D3B45]">
                Landsat 9 Collection 2 Level-2 Surface Temperature
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                AOI-A (Saih Al Salam Street / D42) Only
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Active Layer
          </span>
        </div>

        {/* Scene Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">SCENE IDENTIFIER</span>
            <span className="font-mono font-bold text-[#0D3B45] text-xs block mt-1">
              LC09_L2SP_160043_20260831_02_T1
            </span>
          </div>

          <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">ACQUISITION DATE</span>
            <span className="font-bold text-[#0D3B45] text-xs block mt-1">
              31 August 2026
            </span>
          </div>

          <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">CLOUD COVER</span>
            <span className="font-bold text-emerald-700 text-xs block mt-1">
              0% (Pristine Clear Pass)
            </span>
          </div>
        </div>

        {/* Conversion Formula Card */}
        <div className="p-5 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs space-y-2.5">
          <div className="text-amber-400 font-bold text-xs">// Radiometric Conversion Equations Applied:</div>
          <div className="text-emerald-300 text-sm">Kelvin = DN × 0.00341802 + 149.0</div>
          <div className="text-sky-300 text-sm">°C = Kelvin − 273.15</div>
          <div className="text-slate-400 text-[11px] pt-1">
            • QA Guard: DN = 0 is strictly treated as fill / no-data.
          </div>
          <div className="text-amber-300 text-[11px] font-semibold">
            • CRITICAL: Do not apply the Landsat formula to ECOSTRESS.
          </div>
        </div>

        {/* Interactive Calculator for Judges */}
        <div className="p-5 bg-[#F8F9FA] rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#2E6F6E]" />
              <span>Interactive Formula Validator</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">Live Mathematical Verification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-[10px] font-mono text-slate-500 block mb-1">Input DN (0–65535)</label>
              <input
                type="number"
                value={inputDN}
                onChange={(e) => setInputDN(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-mono text-xs text-[#0D3B45] font-bold focus:outline-none focus:ring-2 focus:ring-[#0D3B45]"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block mb-1">Output Kelvin</span>
              <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-800">
                {kelvin > 0 ? kelvin.toFixed(2) + ' K' : 'Fill (0)'}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block mb-1">Output Celsius</span>
              <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-[#0D3B45]">
                {kelvin > 0 ? celsius.toFixed(2) + ' °C' : 'No Data'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Future & Next Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hyperspectral (Future / Conditional) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">FUTURE CAPABILITY</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                FUTURE / CONDITIONAL
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#0D3B45]">
              <Sparkles className="w-5 h-5 text-[#2E6F6E]" />
              <h3 className="text-base font-bold">HYPERSPECTRAL</h3>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              "Hyperspectral data could provide richer spectral information for unusual surface/material behaviour when suitable UAE coverage and access are available."
            </p>

            <div className="p-3 bg-[#F8F9FA] rounded-xl text-xs space-y-1">
              <span className="font-bold text-[#0D3B45] text-[11px] block">Mentioned Missions:</span>
              <div className="flex items-center gap-2 font-mono text-slate-700">
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded">EnMAP</span>
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded">Tanager</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-100">
            We do not fabricate hyperspectral results before actual verified coverage is acquired.
          </div>
        </div>

        {/* Rainfall / Environmental History (Next Integration) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">NEXT PIPELINE UPDATE</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-900 border border-sky-300">
                NEXT INTEGRATION
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#0D3B45]">
              <CloudRain className="w-5 h-5 text-[#2E6F6E]" />
              <h3 className="text-base font-bold">RAINFALL / ENVIRONMENTAL HISTORY</h3>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              "Future temporal analysis will test how environmental exposure relates to changes in road-segment evidence."
            </p>

            <div className="p-3 bg-[#F8F9FA] rounded-xl text-xs space-y-1">
              <span className="font-bold text-[#0D3B45] text-[11px] block">Planned Inputs:</span>
              <ul className="text-slate-600 text-[11px] space-y-0.5 list-disc pl-4">
                <li>Rainfall and extreme weather event dates</li>
                <li>Multi-date satellite thermal time-series</li>
                <li>Environmental exposure history (wadi washouts, surface ponding)</li>
              </ul>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-100">
            Crucial scientific rule: We do not claim causation without ground-truth validation.
          </div>
        </div>

        {/* Very-High-Resolution (VHR) Imagery (Conditional) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">OPTICAL ENHANCEMENT</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                CONDITIONAL
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#0D3B45]">
              <Camera className="w-5 h-5 text-[#2E6F6E]" />
              <h3 className="text-base font-bold">VERY-HIGH-RESOLUTION IMAGERY</h3>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              Sub-meter optical imagery to provide finer spatial validation and improved road/pavement context.
            </p>

            <div className="p-3 bg-[#F8F9FA] rounded-xl text-xs space-y-1">
              <span className="font-bold text-[#0D3B45] text-[11px] block">Purpose:</span>
              <p className="text-slate-600 text-[11px]">
                • Finer spatial validation of road shoulders and distress patterns.
              </p>
              <p className="text-slate-600 text-[11px]">
                • Improved road/pavement context.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-100">
            Only mentioned as future capability until legally usable imagery is confirmed.
          </div>
        </div>

        {/* Satellite 813 (Future Opportunity) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">SPACE COOPERATION</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0D3B45]/10 text-[#0D3B45] border border-[#0D3B45]/20">
                FUTURE OPPORTUNITY
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#0D3B45]">
              <Satellite className="w-5 h-5 text-[#2E6F6E]" />
              <h3 className="text-base font-bold">SATELLITE 813</h3>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              "Satellite 813 could strengthen THABAT if suitable UAE road data are provided with appropriate access and redistribution rights."
            </p>

            <div className="p-3 bg-[#F8F9FA] rounded-xl text-xs space-y-1">
              <span className="font-bold text-[#0D3B45] text-[11px] block">Compliance Guard:</span>
              <p className="text-slate-600 text-[11px]">
                We do not claim current use of Satellite 813. We do not fabricate its results or specifications.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-100">
            Awaits formal regional space data governance and redistribution agreements.
          </div>
        </div>
      </div>
    </div>
  );
};
