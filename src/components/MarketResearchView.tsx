import React, { useState } from 'react';
import { COMPETITORS, CUSTOMER_PERSONAS } from '../data/mockData';
import { 
  DollarSign, TrendingUp, Clock, ShieldCheck, Users, Target, 
  Check, X, Sparkles, Building2, Truck, Leaf, ChevronRight, BarChart3
} from 'lucide-react';

export const MarketResearchView: React.FC = () => {
  const [networkKm, setNetworkKm] = useState<number>(2500);
  const [activePersonaTab, setActivePersonaTab] = useState<number>(0);

  // Dynamic ROI calculations
  const traditionalInspectionCost = networkKm * 1250;
  const thabatInspectionCost = networkKm * 140;
  const directInspectionSavings = traditionalInspectionCost - thabatInspectionCost;

  // Typical failure rate without early subsurface detection: 4.5% of network fails severely per year
  // Deep reconstruction: $220,000 / km. Early preventative intervention: $32,000 / km
  const severelyDegradedKm = networkKm * 0.045;
  const traditionalRehabCost = severelyDegradedKm * 220000;
  const thabatPreventativeCost = severelyDegradedKm * 32000;
  const preventativeCapitalSaved = traditionalRehabCost - thabatPreventativeCost;

  const totalAnnualSavings = directInspectionSavings + preventativeCapitalSaved;
  const avoidedLaneClosureHours = Math.round(networkKm * 3.8);
  const avoidedCo2Tons = Math.round(severelyDegradedKm * 142); // 142 tons CO2 per km of avoided asphalt milling/production

  return (
    <div className="space-y-8">
      {/* Header & Value Proposition */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase font-mono">
          <Target className="w-4 h-4" />
          <span>Strategic Market Research & Commercial Impact</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">
          Why Current Road Inspection is Broken — And How THABAT Wins
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Traditional road maintenance is purely reactive. Heavy laser profiling vans cost $1,250/km, require rolling lane closures, and only detect cracks <em>after</em> the road has physically fractured. THABAT flips the paradigm to autonomous hyperspectral sensing that catches subsurface moisture and bitumen oxidation 14 months before surface distress occurs, at an 88% lower operational cost.
        </p>
      </div>

      {/* Workflow Transformation: Before vs After */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* The Legacy Workflow */}
        <div className="bg-slate-900/60 border border-rose-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-semibold text-rose-400 flex items-center gap-2">
              <X className="w-5 h-5 text-rose-500" />
              <span>Legacy Industry Workflow (Current State)</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">$1,250 / km</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
              <div>
                <strong className="text-white block font-medium">Physical Profiler Vans or Manual Walkers</strong>
                Expensive laser profilometers require shadow escort vehicles and close high-speed lanes, causing traffic gridlock and collision hazards.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
              <div>
                <strong className="text-white block font-medium">45-to-60 Day Post-Processing Delay</strong>
                By the time highway departments receive PCI reports, moisture has already penetrated the subbase, turning micro-cracks into full-depth potholes.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
              <div>
                <strong className="text-white block font-medium">Surface-Blind to Subsurface Moisture</strong>
                LIDAR and optical cameras cannot see pore water or bitumen binder aging beneath the surface, leading to catastrophic surprise collapses.
              </div>
            </div>
          </div>
        </div>

        {/* The THABAT Autonomous Workflow */}
        <div className="bg-slate-900/60 border border-emerald-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-semibold text-emerald-400 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>The THABAT Autonomous Workflow</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">$140 / km (88% Savings)</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
              <div>
                <strong className="text-white block font-medium">Zero-Disruption Hyperspectral Scanning</strong>
                Remote satellite and aerial sweeps scan thousands of kilometers with zero traffic interference, zero fuel consumption, and zero personnel hazard.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
              <div>
                <strong className="text-white block font-medium">48-Hour Cloud Ingestion & Analysis</strong>
                Automated radiometric calibration and spectral matching algorithms update road scores within 48 hours, enabling proactive intervention.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
              <div>
                <strong className="text-white block font-medium">Subsurface Molecular Diagnosis</strong>
                SWIR 1450nm/1940nm absorption pinpoints moisture trapped 2–7cm under asphalt friction courses, allowing simple resin sealants before structural failure.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Commercial ROI & Impact Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <span>Interactive Network ROI & Cost Savings Model</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Adjust your road network size to calculate direct operational and preventive capital savings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Network Size:</span>
            <span className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-mono font-bold text-sm">
              {networkKm.toLocaleString()} lane-km
            </span>
          </div>
        </div>

        {/* Network Size Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="300"
            max="10000"
            step="100"
            value={networkKm}
            onChange={(e) => setNetworkKm(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>300 km (Municipality)</span>
            <span>2,500 km (State Highway)</span>
            <span>10,000 km (National Network)</span>
          </div>
        </div>

        {/* Calculated Results Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Direct Inspection Savings</div>
            <div className="mt-2 text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              ${(directInspectionSavings / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              ${thabatInspectionCost.toLocaleString()} vs ${(traditionalInspectionCost).toLocaleString()}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Preventative Capital Saved</div>
            <div className="mt-2 text-2xl font-bold font-mono text-amber-400 tabular-nums">
              ${(preventativeCapitalSaved / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Catastrophic road reconstruction avoided
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Avoided Lane Closures</div>
            <div className="mt-2 text-2xl font-bold font-mono text-sky-400 tabular-nums">
              {avoidedLaneClosureHours.toLocaleString()} <span className="text-sm font-sans font-normal text-slate-400">hrs</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Zero highway congestion from vans
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-xs text-emerald-300 font-medium">Total Annual Value Delivered</div>
            <div className="mt-2 text-3xl font-extrabold font-mono text-emerald-300 tabular-nums">
              ${(totalAnnualSavings / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-emerald-400/80 mt-1">
              {(totalAnnualSavings / thabatInspectionCost).toFixed(1)}x Return on Investment
            </div>
          </div>
        </div>
      </div>

      {/* Competitor Landscape Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white">Competitive Landscape Matrix</h3>
          <p className="text-xs text-slate-400 mt-1">
            How THABAT benchmarks against global road survey vendors on cost, speed, and subsurface sensing capability.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
                <th className="py-3 px-4">Solution</th>
                <th className="py-3 px-4">Primary Method</th>
                <th className="py-3 px-4">Cost / km</th>
                <th className="py-3 px-4">Turnaround</th>
                <th className="py-3 px-4">Subsurface Sensing</th>
                <th className="py-3 px-4">Traffic Disruption</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {COMPETITORS.map((comp, idx) => (
                <tr 
                  key={comp.name} 
                  className={idx === 0 ? 'bg-amber-500/10 font-medium' : 'hover:bg-slate-850/40'}
                >
                  <td className="py-3.5 px-4">
                    <span className={idx === 0 ? 'font-bold text-amber-400 text-sm' : 'font-semibold text-white'}>
                      {comp.name}
                    </span>
                    {idx === 0 && (
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-mono text-[10px] font-bold">
                        OUR TECH
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{comp.method}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    ${comp.costPerKm}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{comp.turnaroundTime}</td>
                  <td className="py-3.5 px-4">
                    {comp.subsurfaceSensing ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Yes (to 7.5cm)</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <X className="w-4 h-4 text-rose-500" />
                        <span>Surface Only</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{comp.trafficDisruption}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Target Customer Personas */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white">Target Customer Profiles</h3>
          <p className="text-xs text-slate-400 mt-1">
            Validation across national transport authorities, private toll road operators, and municipal public works.
          </p>
        </div>

        {/* Persona Selectors */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 text-xs">
          {CUSTOMER_PERSONAS.map((persona, index) => (
            <button
              key={index}
              onClick={() => setActivePersonaTab(index)}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                activePersonaTab === index
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-950'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{persona.organizationType}</span>
            </button>
          ))}
        </div>

        {/* Selected Persona Detail */}
        {(() => {
          const current = CUSTOMER_PERSONAS[activePersonaTab];
          return (
            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-white">{current.role}</h4>
                  <span className="text-xs text-amber-400 font-medium">{current.organizationType}</span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Budget Cycle: <strong className="text-slate-200">{current.budgetCycle}</strong>
                </div>
              </div>

              <blockquote className="p-3 bg-slate-900 border-l-2 border-amber-400 rounded-r-lg text-slate-300 text-xs italic">
                {current.quote}
              </blockquote>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                  <div className="font-semibold text-rose-400 mb-1">Primary Operational Pain Point:</div>
                  <p className="text-slate-300 leading-relaxed">{current.primaryPainPoint}</p>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                  <div className="font-semibold text-emerald-400 mb-1">THABAT Commercial Solution:</div>
                  <p className="text-slate-300 leading-relaxed">{current.thabatValueProp}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
