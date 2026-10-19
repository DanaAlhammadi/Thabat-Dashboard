import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Calendar, 
  Satellite, 
  FileCode, 
  ShieldAlert, 
  Layers, 
  Activity,
  AlertCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { 
  METHOD_STEPS, 
  SCIENTIFIC_LIMITATIONS, 
  ROADMAP_DATA, 
  REPRODUCIBLE_POC 
} from '../data/mockData';

export const ValidationRoadmapView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
          <BookOpen className="w-3.5 h-3.5 text-[#2E6F6E]" />
          <span>Scientific Pipeline & Technology Evolution</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
          METHODOLOGY & SCIENTIFIC BOUNDARIES
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          The deterministic Earth-observation pipeline converting spaceborne radiance into an explainable starting point for physical road inspection.
        </p>
      </div>

      {/* Visual Workflow: 8-Step Method */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#0D3B45]">Pipeline Workflow</h2>
          <p className="text-xs text-slate-500 font-medium">
            From raw satellite scenes to targeted physical field inspection
          </p>
        </div>

        {/* 8-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {METHOD_STEPS.map((step, idx) => (
            <div 
              key={step.step}
              className="p-4 bg-[#F8F9FA] rounded-2xl border border-slate-200/70 flex flex-col justify-between space-y-2 relative"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#0D3B45] bg-white px-2 py-0.5 rounded border border-slate-200">
                    Step 0{step.step}
                  </span>
                  {idx < 7 && (
                    <span className="text-slate-300 font-bold hidden lg:inline">→</span>
                  )}
                </div>
                <h3 className="text-xs font-black text-slate-900 mt-2 uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700">
          <strong>ArcGIS Pro Integration Note:</strong> Current PoC uses pre-segmented road corridors from ArcGIS Pro.
        </div>
      </div>

      {/* Strong Scientific Statement & Dedicated Limitations Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-6">
        {/* Strong Statement */}
        <div className="p-6 rounded-2xl bg-[#0D3B45] text-white space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4B483] font-bold block">
            CORE OPERATIONAL PRINCIPLE
          </span>
          <div className="text-lg sm:text-2xl font-black tracking-tight leading-snug">
            "Satellite evidence tells us <span className="text-[#D4B483] underline decoration-[#D4B483]/40">WHERE TO LOOK</span>. Engineering inspection determines <span className="text-[#D4B483] underline decoration-[#D4B483]/40">WHAT FAILED</span>."
          </div>
        </div>

        {/* Dedicated Limitations */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-rose-800">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-[#0D3B45]">Scientific Limitations</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {SCIENTIFIC_LIMITATIONS.map((lim, idx) => (
              <div 
                key={idx}
                className="p-3.5 bg-rose-50/40 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-slate-800 leading-relaxed"
              >
                <span className="text-rose-600 font-bold mt-0.5">•</span>
                <span>{lim}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Roadmap: NOW → NEXT → THEN → SCALE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#0D3B45]">Future Technology Roadmap</h2>
          <p className="text-xs text-slate-500 font-medium">
            Phased maturation from current thermal screening PoC to operational national deployment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* NOW */}
          <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full bg-[#0D3B45] text-white">
                NOW
              </span>
              <div className="text-xs font-bold text-[#0D3B45]">
                {ROADMAP_DATA.now.phase}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4">
                {ROADMAP_DATA.now.items.map((it, idx) => (
                  <li key={idx} className="leading-snug">{it}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* NEXT */}
          <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full bg-[#2E6F6E] text-white">
                NEXT
              </span>
              <div className="text-xs font-bold text-[#0D3B45]">
                {ROADMAP_DATA.next.phase}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4">
                {ROADMAP_DATA.next.items.map((it, idx) => (
                  <li key={idx} className="leading-snug">{it}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* THEN */}
          <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-800 text-white">
                THEN
              </span>
              <div className="text-xs font-bold text-[#0D3B45]">
                {ROADMAP_DATA.then.phase}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4">
                {ROADMAP_DATA.then.items.map((it, idx) => (
                  <li key={idx} className="leading-snug">{it}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* SCALE */}
          <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-900 text-[#D4B483]">
                SCALE
              </span>
              <div className="text-xs font-bold text-[#0D3B45]">
                {ROADMAP_DATA.scale.phase}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4">
                {ROADMAP_DATA.scale.items.map((it, idx) => (
                  <li key={idx} className="leading-snug">{it}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
