import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Layers, 
  Flame, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  FileCode,
  ShieldAlert,
  Send,
  ExternalLink
} from 'lucide-react';
import { 
  AOI_A_SEGMENTS, 
  AOI_B_SEGMENTS, 
  EVIDENCE_STACK, 
  REPRODUCIBLE_POC 
} from '../data/mockData';
import { ScreeningSegment, NavTab } from '../types';

interface DashboardHomeProps {
  onNavigate: (tab: NavTab) => void;
  onSelectSegment: (segment: ScreeningSegment) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onNavigate,
  onSelectSegment
}) => {
  const topPriorities = [
    AOI_A_SEGMENTS.find(s => s.code === 'A-005')!,
    AOI_A_SEGMENTS.find(s => s.code === 'A-001')!,
    AOI_B_SEGMENTS.find(s => s.code === 'B-002')!
  ].filter(Boolean);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Card — iOS Clean & Modern Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
            <span className="w-2 h-2 rounded-full bg-[#0D3B45]"></span>
            <span>Earth-Observation Road Intelligence · UAE Demonstration</span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0D3B45]">
              THABAT
            </h1>
            <p className="text-lg sm:text-xl font-bold text-[#2E6F6E] uppercase tracking-wide">
              Satellite-based road resilience screening
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Turn Earth-observation evidence into an explainable starting point for road inspection.
          </p>

          {/* Prominent Action Button: VIEW INSPECTION PRIORITIES */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('queue')}
              className="px-6 py-3.5 rounded-2xl bg-[#0D3B45] text-white text-sm font-bold hover:bg-[#2E6F6E] transition-all flex items-center gap-2.5 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <span>VIEW INSPECTION PRIORITIES</span>
              <ArrowRight className="w-4 h-4 text-[#D4B483]" />
            </button>

            <button
              onClick={() => onNavigate('study-areas')}
              className="px-5 py-3.5 rounded-2xl bg-[#F8F9FA] text-[#0D3B45] text-sm font-semibold hover:bg-slate-200/70 border border-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#2E6F6E]" />
              <span>Explore Study Areas</span>
            </button>
          </div>

          {/* Core Decision Loop: SCREEN → UNDERSTAND → PRIORITISE → INSPECT */}
          <div className="pt-6 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Operational Decision Flow
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { step: 'SCREEN', desc: 'Satellite thermal & multispectral scans', num: '01' },
                { step: 'UNDERSTAND', desc: 'Zonal stats & valid pixel support verification', num: '02' },
                { step: 'PRIORITISE', desc: 'Relative anomaly score within AOI baseline', num: '03' },
                { step: 'INSPECT', desc: 'Explainable physical crew dispatch', num: '04' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-slate-200/70 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#0D3B45]">{item.step}</span>
                    <span className="text-[10px] font-mono text-slate-400">{item.num}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subtle Sand Accent Graphic */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D4B483]/15 to-transparent rounded-bl-full pointer-events-none -z-0"></div>
      </section>

      {/* Real Headline Metrics Section — STRICTLY REAL DATA ONLY */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Active AOIs */}
        <div 
          onClick={() => onNavigate('study-areas')}
          className="ios-card ios-card-hover p-6 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>ACTIVE AOIs</span>
            <MapPin className="w-4 h-4 text-[#2E6F6E]" />
          </div>
          <div className="mt-3">
            <div className="text-4xl font-extrabold text-[#0D3B45] tracking-tight">2</div>
            <div className="text-xs text-slate-600 mt-1 font-medium">
              AOI-A (Saih Al Salam / D42) & AOI-B (Fujairah)
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs text-[#2E6F6E] font-semibold">
            <span>Inspect study areas</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Road Segments Analysed */}
        <div 
          onClick={() => onNavigate('study-areas')}
          className="ios-card ios-card-hover p-6 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>ROAD SEGMENTS</span>
            <Layers className="w-4 h-4 text-[#2E6F6E]" />
          </div>
          <div className="mt-3">
            <div className="text-4xl font-extrabold text-[#0D3B45] tracking-tight">9</div>
            <div className="text-xs text-slate-600 mt-1 font-medium">
              5 in AOI-A (A-001–005) · 4 in AOI-B (B-001–004)
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs text-[#2E6F6E] font-semibold">
            <span>View segment geometry</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Current Evidence */}
        <div 
          onClick={() => onNavigate('evidence')}
          className="ios-card ios-card-hover p-6 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>CURRENT EVIDENCE</span>
            <Flame className="w-4 h-4 text-[#2E6F6E]" />
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-[#0D3B45] tracking-tight">Thermal + Multispectral</div>
            <div className="text-xs text-slate-600 mt-1 font-medium">
              Landsat 9 L2 LST (31 Aug) & Sentinel-2 MSI (19 Sep ↔ 4 Oct)
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs text-[#2E6F6E] font-semibold">
            <span>Explore evidence stack</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </section>

      {/* Core Purpose & Negative Boundaries Guard Card */}
      <div className="bg-[#F5F1E8] border border-[#D4B483] rounded-3xl p-6 sm:p-7 space-y-3">
        <div className="flex items-center gap-2.5 text-[#0D3B45]">
          <AlertCircle className="w-5 h-5 text-[#2E6F6E] shrink-0" />
          <h2 className="text-base font-bold">
            Core Scientific Purpose: "WHERE SHOULD WE INSPECT FIRST?"
          </h2>
        </div>
        
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
          THABAT converts Earth-observation evidence into an explainable starting point for physical road inspection.
        </p>

        <div className="pt-2 border-t border-[#D4B483]/60 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="space-y-1">
            <span className="font-bold text-[#0D3B45] block">What THABAT does:</span>
            <p>• Identifies unusual environmental and thermal surface behavior.</p>
            <p>• Scores relative anomalies within corridor baselines.</p>
            <p>• Prioritises where road maintenance teams should drive first.</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-rose-800 block">What THABAT is NOT:</span>
            <p>• NOT a pavement damage diagnosis system.</p>
            <p>• NOT an engineering certification system.</p>
            <p>• NOT proof of structural failure or potholes.</p>
            <p>• NOT proof that rainfall caused deterioration.</p>
          </div>
        </div>
      </div>

      {/* Current Top Priorities Spotlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0D3B45]">Highest Inspection Priorities</h2>
            <p className="text-xs text-slate-500">Relative thermal anomalies ranked by screening priority score</p>
          </div>
          <button
            onClick={() => onNavigate('queue')}
            className="text-xs font-bold text-[#0D3B45] hover:text-[#2E6F6E] flex items-center gap-1 cursor-pointer"
          >
            <span>Full ranked queue (9 segments)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPriorities.map((seg) => (
            <div
              key={seg.id}
              onClick={() => onSelectSegment(seg)}
              className="ios-card ios-card-hover p-5 cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[#0D3B45] text-white">
                    {seg.code}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    seg.screeningFlag === 'HIGHER PRIORITY'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}>
                    {seg.screeningFlag}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-sm font-bold text-[#1E1E1E]">{seg.roadName}</div>
                  <div className="text-xs text-slate-500">{seg.aoiName}</div>
                </div>

                <div className="mt-3 p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/60 space-y-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">WHY FLAGGED:</span>
                  <p className="text-xs text-slate-700 leading-snug">{seg.whyFlagged}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Median LST:</span>
                  <span className="font-mono font-bold text-[#0D3B45]">{seg.tMedian.toFixed(2)} °C</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Pixel Support:</span>
                  <span className={`font-mono text-[11px] font-bold ${
                    seg.supportFlag === 'LOW SUPPORT' ? 'text-amber-800' : 'text-emerald-700'
                  }`}>
                    {seg.validPixelCount} valid pixels ({seg.supportFlag})
                  </span>
                </div>
                <div className="pt-1 flex items-center text-xs text-[#2E6F6E] font-semibold justify-end">
                  <span>Open segment detail</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reproducible PoC Card & Quick Links */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-[#0D3B45]">
            <FileCode className="w-5 h-5 text-[#2E6F6E]" />
            <h3 className="text-base font-bold">Reproducible PoC & Open Evaluation</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Judges can open the Jupyter notebook in Google Colab and run the provided sample data to independently verify all zonal statistics, DN conversion formulas, and segment rankings.
          </p>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 pt-1">
            <span>Notebook: <strong className="text-slate-800">{REPRODUCIBLE_POC.notebook}</strong></span>
            <span>·</span>
            <span>Input: <strong className="text-slate-800">{REPRODUCIBLE_POC.inputsDir}</strong></span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <a
            href={REPRODUCIBLE_POC.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>

          <button
            onClick={() => onNavigate('method')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 text-[#0D3B45] text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Review Method</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
