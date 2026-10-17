import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Flame, 
  Layers, 
  MapPin, 
  FileCode, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  Thermometer,
  Eye,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { 
  AOI_A_SEGMENTS, 
  AOI_B_SEGMENTS, 
  EVIDENCE_STACK, 
  METHOD_STEPS, 
  REPRODUCIBLE_POC 
} from '../data/mockData';
import { ScreeningSegment, NavTab } from '../types';

interface DashboardHomeProps {
  onNavigate: (tab: NavTab) => void;
  onSelectSegment: (segment: ScreeningSegment) => void;
  onOpenNotebookModal?: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onNavigate,
  onSelectSegment,
  onOpenNotebookModal
}) => {
  // Top 3 prioritised segments across the study areas
  const topPriorities = [
    AOI_A_SEGMENTS.find(s => s.code === 'A-005')!,
    AOI_A_SEGMENTS.find(s => s.code === 'A-001')!,
    AOI_B_SEGMENTS.find(s => s.code === 'B-002')!
  ].filter(Boolean);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Card — iOS Clean Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
            <span className="w-2 h-2 rounded-full bg-[#0D3B45]"></span>
            <span>UAE Road Resilience · Space-Borne Environmental Screening</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0D3B45]">
              THABAT
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#2E6F6E]">
              Satellite-based road resilience screening
            </p>
          </div>

          <p className="text-base text-slate-700 leading-relaxed max-w-2xl">
            Identify unusual environmental and thermal behaviour and prioritise road segments for inspection.
          </p>

          {/* Core Decision Loop: SCREEN → UNDERSTAND → PRIORITISE → INSPECT */}
          <div className="pt-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Decision Loop
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { step: 'SCREEN', desc: 'Satellite thermal & multispectral scans', num: '01' },
                { step: 'UNDERSTAND', desc: 'Zonal stats & pixel support verification', num: '02' },
                { step: 'PRIORITISE', desc: 'Relative anomaly score within AOI', num: '03' },
                { step: 'INSPECT', desc: 'Targeted physical crew dispatch', num: '04' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-[#F8F9FA] rounded-2xl p-3 border border-slate-200/60 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#0D3B45]">{item.step}</span>
                    <span className="text-[10px] font-mono text-slate-400">{item.num}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subtle accent border */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#D4B483]/20 to-transparent rounded-bl-full pointer-events-none -z-0"></div>
      </section>

      {/* Clean Overview Section — No Fake KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active AOIs */}
        <div 
          onClick={() => onNavigate('study-areas')}
          className="ios-card ios-card-hover p-5 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active AOIs</span>
            <MapPin className="w-4 h-4 text-[#2E6F6E]" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-[#0D3B45] tracking-tight">2</div>
            <div className="text-xs text-slate-500 mt-1">
              AOI-A (Saih Al Salam) & AOI-B (Fujairah)
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs text-[#2E6F6E] font-medium">
            <span>Explore study areas</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Road Segments Analysed */}
        <div 
          onClick={() => onNavigate('segments')}
          className="ios-card ios-card-hover p-5 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Road Segments</span>
            <Layers className="w-4 h-4 text-[#2E6F6E]" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-[#0D3B45] tracking-tight">9</div>
            <div className="text-xs text-slate-500 mt-1">
              5 in AOI-A (A-001–005) · 4 in AOI-B (B-001–004)
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs text-[#2E6F6E] font-medium">
            <span>View segment map</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Data Sources */}
        <div 
          onClick={() => onNavigate('evidence')}
          className="ios-card ios-card-hover p-5 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Data Sources</span>
            <Flame className="w-4 h-4 text-[#2E6F6E]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#0D3B45] tracking-tight">Landsat 9 + S2</div>
            <div className="text-xs text-slate-500 mt-1">
              Level-2 LST (31 Aug) & MSI (19 Sep ↔ 4 Oct)
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs text-[#2E6F6E] font-medium">
            <span>Inspect evidence stack</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Current Screening Status */}
        <div 
          onClick={() => onNavigate('results')}
          className="ios-card ios-card-hover p-5 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Screening Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Screened & Ranked</span>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Ready for physical crew prioritisation
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs text-[#2E6F6E] font-medium">
            <span>View ranked queue</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </section>

      {/* Critical Scientific Interpretation Guard */}
      <div className="bg-[#F5F1E8] border border-[#D4B483]/60 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-white shadow-xs text-[#0D3B45] shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5 text-[#2E6F6E]" />
        </div>
        <div className="space-y-1 text-xs text-slate-700 leading-relaxed">
          <div className="font-bold text-[#0D3B45] text-sm">
            Interpretation Principle: Relative Screening, Not Damage Diagnosis
          </div>
          <p>
            The priority score is a <strong>relative thermal screening score within each AOI</strong>. It does <em>not</em> represent probability of damage, damage severity, structural failure, or potholes. It answers one operational question: <strong>"Where should we inspect first?"</strong>
          </p>
        </div>
      </div>

      {/* Top Prioritised Segments Spotlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0D3B45]">Current Inspection Priorities</h2>
            <p className="text-xs text-slate-500">Highest relative thermal anomalies across active study areas</p>
          </div>
          <button
            onClick={() => onNavigate('results')}
            className="text-xs font-semibold text-[#0D3B45] hover:text-[#2E6F6E] flex items-center gap-1"
          >
            <span>Full ranked queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPriorities.map((seg, idx) => (
            <div
              key={seg.id}
              onClick={() => onSelectSegment(seg)}
              className="ios-card ios-card-hover p-5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-[#0D3B45]">
                    {seg.code}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    seg.screeningPriority === 'Higher Priority' 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {seg.screeningPriority}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-sm font-bold text-[#1E1E1E]">{seg.aoiName}</div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{seg.explanation}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Median LST:</span>
                  <span className="font-mono font-bold text-[#0D3B45]">{seg.medianLST}°C</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Pixel Support:</span>
                  <span className={`font-mono text-[11px] font-semibold ${
                    seg.supportQuality === 'LOW SUPPORT' ? 'text-amber-700' : 'text-slate-700'
                  }`}>
                    {seg.validPixels} pixels ({seg.supportQuality})
                  </span>
                </div>
                <div className="pt-1 flex items-center text-xs text-[#2E6F6E] font-medium justify-end">
                  <span>Segment details</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence Stack Preview & Reproducible PoC */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence Stack Summary */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0D3B45]">Evidence Stack</h3>
              <p className="text-xs text-slate-500">Multimodal remote sensing layers used for resilience screening</p>
            </div>
            <button
              onClick={() => onNavigate('evidence')}
              className="text-xs font-semibold text-[#0D3B45] hover:text-[#2E6F6E] flex items-center gap-1"
            >
              <span>Explore stack</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {EVIDENCE_STACK.map((item) => (
              <div 
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-200/60 flex items-start justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0D3B45]">{item.sourceName}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full ${
                      item.category === 'Active' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{item.role}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
                  {item.spatialResolution}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reproducible PoC Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#0D3B45]">
              <div className="p-2 rounded-xl bg-[#0D3B45]/5 text-[#0D3B45]">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0D3B45]">Reproducible PoC</h3>
                <span className="text-xs text-slate-500">Colab / Jupyter Notebook</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Judges can open the notebook in Colab and run the provided sample data to independently verify all calculations.
            </p>

            <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] space-y-1">
              <div className="text-amber-400"># Notebook:</div>
              <div>{REPRODUCIBLE_POC.notebook}</div>
              <div className="text-slate-400 pt-1"># Inputs: {REPRODUCIBLE_POC.inputsDir}</div>
              <div className="text-slate-400"># Outputs: {REPRODUCIBLE_POC.outputsDir}</div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('about')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#0D3B45] text-white text-xs font-semibold hover:bg-[#2E6F6E] transition-colors flex items-center justify-center gap-2"
          >
            <span>Review Method & Notebook</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
