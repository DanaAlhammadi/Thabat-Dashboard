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
  HelpCircle,
  ArrowRight,
  ShieldAlert
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
          <Layers className="w-3.5 h-3.5 text-[#2E6F6E]" />
          <span>Multimodal Sensing Diagnostics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
          Environmental Evidence & Sensor Stack
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          THABAT synthesizes thermal, multispectral, and environmental remote sensing data layers to screen road behavior. We transparently disclose the operational state, mathematical derivation, and limitations of every data source.
        </p>
      </div>

      {/* Evidence Quality Grading System */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#0D3B45]">Evidence Quality Grading Framework</h2>
          <p className="text-xs text-slate-500">
            Represents empirical evidence quality & sample density — <em>not</em> model confidence probability
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-slate-800">Strong Support</span>
            </div>
            <p className="text-xs text-slate-600">
              High valid pixel counts (&gt;80 px), verified metadata, cloud-free, and validated radiometric coefficients.
            </p>
            <div className="text-[10px] font-mono text-emerald-700 font-semibold pt-1">
              Active: AOI-A (A-001–005)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span className="text-xs font-bold text-slate-800">Moderate Support</span>
            </div>
            <p className="text-xs text-slate-600">
              Adequate sampling (&gt;20 px) with acceptable atmospheric correction, but minor cloud or terrain proximity.
            </p>
            <div className="text-[10px] font-mono text-sky-700 font-semibold pt-1">
              Secondary AOI candidates
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-amber-200 bg-amber-50/50 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-xs font-bold text-amber-900">LOW SUPPORT</span>
            </div>
            <p className="text-xs text-amber-800">
              Sparse pixel counts (&lt;5 px) or mountain shadow contamination. Results are strictly preliminary.
            </p>
            <div className="text-[10px] font-mono text-amber-900 font-bold pt-1">
              Active: AOI-B (B-001–004, 2–3 px)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span className="text-xs font-bold text-slate-800">Not Yet Validated</span>
            </div>
            <p className="text-xs text-slate-600">
              Future sensor inputs or uncalibrated layers not yet ingested into operational workflow.
            </p>
            <div className="text-[10px] font-mono text-slate-500 font-semibold pt-1">
              Hyperspectral, VHR, Radar
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Cards for Active Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Landsat Thermal Processing & Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0D3B45]">Landsat 9 Thermal LST</h3>
                  <span className="text-xs text-slate-500">Band 10 TIRS-2 · AOI-A Only</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Active Layer
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Landsat 9 Collection 2 Level-2 Surface Temperature product acquired on <strong>31 August 2026</strong>. USGS scaling equations are applied to convert 16-bit digital numbers to physical units.
            </p>

            {/* Formula Block */}
            <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs space-y-2">
              <div className="text-amber-400 font-bold text-[11px]">// USGS Radiometric Scaling:</div>
              <div className="text-emerald-300">Kelvin = DN × 0.00341802 + 149.0</div>
              <div className="text-sky-300">°C = Kelvin − 273.15</div>
              <div className="text-slate-400 text-[10px] pt-1">
                * QA Guard: DN = 0 is strictly treated as fill / no-data.
              </div>
            </div>

            {/* Interactive Calculator for Judges */}
            <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-[#2E6F6E]" />
                  <span>Verify DN Conversion Formula</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Live Validator</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-[10px] font-mono text-slate-500 block mb-1">Input DN (0–65535)</label>
                  <input
                    type="number"
                    value={inputDN}
                    onChange={(e) => setInputDN(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-mono text-xs text-[#0D3B45] focus:outline-none focus:ring-1 focus:ring-[#0D3B45]"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block mb-1">Output Kelvin</span>
                  <div className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono font-bold text-slate-800">
                    {kelvin > 0 ? kelvin.toFixed(2) + ' K' : 'Fill (0)'}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block mb-1">Output Celsius</span>
                  <div className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono font-bold text-[#0D3B45]">
                    {kelvin > 0 ? celsius.toFixed(2) + ' °C' : 'No Data'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            Covers AOI-A (Saih Al Salam). Does not cover AOI-B.
          </div>
        </div>

        {/* Sentinel-2 Comparison Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-100 text-sky-800">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0D3B45]">Sentinel-2 Multispectral</h3>
                  <span className="text-xs text-slate-500">MSI Level-2A · 10m–20m Resolution</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Active Layer
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Multi-temporal comparison between two cloud-free Sentinel-2 L2A acquisition dates over target corridors:
            </p>

            <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Baseline Pass:</span>
                <span className="font-mono font-bold text-[#0D3B45]">19 September 2026</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Comparison Pass:</span>
                <span className="font-mono font-bold text-[#0D3B45]">04 October 2026</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <div className="text-xs font-bold text-[#0D3B45]">Observed Result:</div>
                <div className="text-xs text-slate-700 font-medium italic mt-0.5">
                  "No obvious visual road-surface change detected in the tested views."
                </div>
              </div>
            </div>

            {/* Critical Limitation Callout */}
            <div className="p-3.5 bg-[#F5F1E8] border border-[#D4B483] rounded-2xl text-xs space-y-1.5">
              <div className="font-bold text-[#0D3B45] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Crucial Interpretation Guard</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                We do <strong>not</strong> state <em>"No change occurred"</em>, and we do <strong>not</strong> claim that Sentinel-2 proved the road did not deteriorate.
              </p>
              <p className="text-slate-600">
                Sentinel-2 provides multispectral context, but its 10-meter pixel resolution is physically incapable of resolving fine pavement defects, hairline micro-cracks, or minor stripping.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            Provides broad radiometric baseline across VNIR/SWIR channels.
          </div>
        </div>
      </div>

      {/* Complete Evidence Stack Layer-by-Layer */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-5">
        <div>
          <h2 className="text-lg font-bold text-[#0D3B45]">Complete 5-Tier Evidence Stack</h2>
          <p className="text-xs text-slate-500">
            How remote sensing layers integrate into our road resilience screening architecture
          </p>
        </div>

        <div className="space-y-4">
          {EVIDENCE_STACK.map((item, idx) => (
            <div 
              key={item.id}
              className="p-5 rounded-2xl bg-[#F8F9FA] border border-slate-200/70 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#0D3B45] text-white flex items-center justify-center font-mono text-xs font-bold">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-[#0D3B45]">{item.sourceName}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500">{item.spatialResolution}</span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.category === 'Active' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : item.category === 'Future / Conditional'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {item.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {item.description}
              </p>

              <div className="space-y-1">
                {item.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-[11px] text-slate-600">
                    <span className="text-[#2E6F6E] mt-0.5">•</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
