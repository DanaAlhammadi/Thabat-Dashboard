import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Calendar, 
  Satellite, 
  FileCode, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Activity,
  AlertCircle,
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { 
  VALIDATION_DATA, 
  ROADMAP_DATA, 
  METHOD_STEPS, 
  REPRODUCIBLE_POC, 
  CUSTOMER_PERSONAS 
} from '../data/mockData';

export const ValidationRoadmapView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'all' | 'method' | 'validation' | 'roadmap' | 'business'>('all');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
          <BookOpen className="w-3.5 h-3.5 text-[#2E6F6E]" />
          <span>Scientific Methodology & Technology Roadmap</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
          How THABAT Works: Method, Validation & Roadmap
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Full scientific transparency: what our operational pipeline computes, what we have verified, boundaries of current satellite evidence, and the planned evolutionary path.
        </p>

        {/* Section Navigation */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <div className="ios-segmented">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'all' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSection('method')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'method' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              8-Step Method
            </button>
            <button
              onClick={() => setActiveSection('validation')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'validation' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Validation Matrix
            </button>
            <button
              onClick={() => setActiveSection('roadmap')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'roadmap' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Now · Next · Future
            </button>
            <button
              onClick={() => setActiveSection('business')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'business' 
                  ? 'bg-white text-[#0D3B45] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Decision Loop & Value
            </button>
          </div>
        </div>
      </div>

      {/* Reproducible PoC Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Reproducible PoC Dossier</h2>
              <span className="text-xs text-slate-400">Judges can execute this notebook in Google Colab</span>
            </div>
          </div>
          <span className="font-mono text-xs px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
            Open Source Validation
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          {REPRODUCIBLE_POC.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="text-slate-500 text-[10px]">ANALYSIS NOTEBOOK</div>
            <div className="text-amber-400 font-bold mt-0.5">{REPRODUCIBLE_POC.notebook}</div>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="text-slate-500 text-[10px]">INPUT DIRECTORY</div>
            <div className="text-slate-200 font-bold mt-0.5">{REPRODUCIBLE_POC.inputsDir}</div>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="text-slate-500 text-[10px]">OUTPUT RESULTS</div>
            <div className="text-slate-200 font-bold mt-0.5">{REPRODUCIBLE_POC.outputsDir}</div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
          {REPRODUCIBLE_POC.commands.map((cmd, idx) => (
            <div key={idx} className={cmd.startsWith('#') ? 'text-slate-500' : 'text-emerald-400'}>
              {cmd}
            </div>
          ))}
        </div>
      </div>

      {/* 8-Step Pipeline Method */}
      {(activeSection === 'all' || activeSection === 'method') && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#0D3B45]">How It Works: 8-Step Pipeline</h2>
            <p className="text-xs text-slate-500">
              The deterministic screening progression from raw satellite raster to physical inspection recommendation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {METHOD_STEPS.map((step) => (
              <div 
                key={step.step}
                className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200/70 flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#0D3B45] bg-white px-2 py-0.5 rounded border border-slate-200">
                      Step {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">0{step.step}/08</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 mt-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation Matrix: Checked vs Not Proven vs Next */}
      {(activeSection === 'all' || activeSection === 'validation') && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#0D3B45]">Scientific Validation Matrix</h2>
            <p className="text-xs text-slate-500">
              Clear distinction between empirical findings, non-proven claims, and future validation milestones
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* What we have checked */}
            <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-emerald-200 bg-emerald-50/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>WHAT WE HAVE CHECKED</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {VALIDATION_DATA.whatWeHaveChecked.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What we have not proven */}
            <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-rose-200 bg-rose-50/20 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>WHAT WE HAVE NOT PROVEN</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {VALIDATION_DATA.whatWeHaveNotProven.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Validation */}
            <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-sky-200 bg-sky-50/20 space-y-3">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
                <ArrowRight className="w-4 h-4 text-sky-600 shrink-0" />
                <span>NEXT VALIDATION</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {VALIDATION_DATA.nextValidation.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Technology Roadmap: Now · Next · Future */}
      {(activeSection === 'all' || activeSection === 'roadmap') && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#0D3B45]">Evolutionary Technology Roadmap</h2>
            <p className="text-xs text-slate-500">
              Phased transition from current screening proof-of-concept to national asset intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* NOW */}
            <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#0D3B45] text-white">
                  NOW
                </span>
                <span className="text-[10px] font-mono text-slate-400">Current Phase</span>
              </div>
              <div className="text-sm font-bold text-[#0D3B45]">
                {ROADMAP_DATA.now.phase}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {ROADMAP_DATA.now.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#2E6F6E] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* NEXT */}
            <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#2E6F6E] text-white">
                  NEXT
                </span>
                <span className="text-[10px] font-mono text-slate-400">Short-Term</span>
              </div>
              <div className="text-sm font-bold text-[#0D3B45]">
                {ROADMAP_DATA.next.phase}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {ROADMAP_DATA.next.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#2E6F6E] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FUTURE */}
            <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-800 text-white">
                  FUTURE
                </span>
                <span className="text-[10px] font-mono text-slate-400">Long-Term</span>
              </div>
              <div className="text-sm font-bold text-[#0D3B45]">
                {ROADMAP_DATA.future.phase}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {ROADMAP_DATA.future.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#2E6F6E] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dedicated Satellite 813 & Hyperspectral Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Satellite 813 Card */}
            <div className="p-5 rounded-2xl bg-[#F5F1E8] border border-[#D4B483] space-y-2.5">
              <div className="flex items-center gap-2 text-[#0D3B45]">
                <Satellite className="w-5 h-5 text-[#2E6F6E]" />
                <h3 className="text-sm font-bold">{ROADMAP_DATA.satellite813.title}</h3>
              </div>
              <p className="text-xs text-slate-800 font-medium">
                "{ROADMAP_DATA.satellite813.statement}"
              </p>
              <p className="text-[11px] text-slate-600">
                {ROADMAP_DATA.satellite813.note}
              </p>
            </div>

            {/* Hyperspectral Status Card */}
            <div className="p-5 rounded-2xl bg-[#F5F1E8] border border-[#D4B483] space-y-2.5">
              <div className="flex items-center gap-2 text-[#0D3B45]">
                <Sparkles className="w-5 h-5 text-[#2E6F6E]" />
                <h3 className="text-sm font-bold">{ROADMAP_DATA.hyperspectralNote.title}</h3>
              </div>
              <p className="text-xs text-slate-800 font-medium">
                "{ROADMAP_DATA.hyperspectralNote.statement}"
              </p>
              <p className="text-[11px] text-slate-600">
                {ROADMAP_DATA.hyperspectralNote.limitation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Business Value & Operational Decision Loop (Qualitative Only) */}
      {(activeSection === 'all' || activeSection === 'business') && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#0D3B45]">Operational Impact & Decision Loop</h2>
            <p className="text-xs text-slate-500">
              Transforming remote sensing observations into targeted infrastructure maintenance
            </p>
          </div>

          {/* Qualitative Loop */}
          <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 space-y-4">
            <div className="text-xs font-bold text-[#0D3B45] uppercase tracking-wider">
              The 5-Stage Asset Management Loop
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
              {[
                { title: 'Satellite Evidence', sub: 'Radiometric LST & Multispectral' },
                { title: 'Environmental Screening', sub: 'DN Correction & QC Filtering' },
                { title: 'Segment Prioritisation', sub: 'Relative Zonal Ranking' },
                { title: 'Physical Inspection', sub: 'Field Crew Verification' },
                { title: 'Informed Planning', sub: 'Optimized Rehabilitation' }
              ].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex-1 text-center shadow-xs">
                    <div className="font-bold text-[#0D3B45]">{step.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{step.sub}</div>
                  </div>
                  {idx < 4 && (
                    <div className="hidden sm:block text-slate-300 font-bold">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Stakeholder Personas — Qualitative Value */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CUSTOMER_PERSONAS.map((persona, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200/60 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="text-xs font-bold text-[#0D3B45]">{persona.role}</div>
                  <div className="text-[11px] text-slate-500">{persona.organizationType}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed italic">
                    {persona.quote}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200/50 text-[11px] text-slate-700">
                  <span className="font-semibold text-[#0D3B45]">Value: </span>
                  <span>{persona.thabatValueProp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
