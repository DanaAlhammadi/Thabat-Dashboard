import React, { useState } from 'react';
import { RoadSegment } from '../types';
import { NetworkOverview } from './NetworkOverview';
import { 
  Sparkles, Calendar, Sun, Thermometer, Wind, Play, 
  Pause, RotateCcw, Navigation, Cpu, Sliders, AlertCircle 
} from 'lucide-react';

interface DashboardV2Props {
  segments: RoadSegment[];
  onSelectSegment: (segment: RoadSegment) => void;
}

export const DashboardV2View: React.FC<DashboardV2Props> = ({ segments, onSelectSegment }) => {
  const [simulationMonth, setSimulationMonth] = useState<number>(0); // 0, 6, 12, 18, 24 months ahead
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [heatStressFactor, setHeatStressFactor] = useState<number>(46); // Celsius surface temp

  // Adjust segment scores dynamically based on simulation month
  const simulatedSegments = segments.map(seg => {
    if (seg.status === 'Normal' && simulationMonth > 12) {
      return {
        ...seg,
        thabatScore: Math.max(30, seg.thabatScore - simulationMonth * 0.8),
        status: (simulationMonth >= 18 ? 'Watch' : 'Normal') as any
      };
    }
    if (seg.status === 'Watch') {
      return {
        ...seg,
        thabatScore: Math.max(25, seg.thabatScore - simulationMonth * 1.4),
        status: (simulationMonth >= 12 ? 'Inspect' : 'Watch') as any
      };
    }
    if (seg.status === 'Inspect') {
      return {
        ...seg,
        thabatScore: Math.max(18, seg.thabatScore - simulationMonth * 1.9),
        status: (simulationMonth >= 6 ? 'High Priority' : 'Inspect') as any
      };
    }
    if (seg.status === 'High Priority') {
      return {
        ...seg,
        thabatScore: Math.max(10, seg.thabatScore - simulationMonth * 2.3)
      };
    }
    return seg;
  });

  return (
    <div className="space-y-6">
      {/* V2 Predictive Control Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase font-mono">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Dashboard V2: Predictive Deterioration Simulation & Thermal Stress</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              4D Predictive Road Health & Extreme Weather Degradation Engine
            </h2>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl">
              Simulate future road degradation across 24 months to visualize structural tipping points before they happen.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30 font-mono text-xs font-bold">
              AI Prognostics v2.4 Active
            </span>
          </div>
        </div>

        {/* Interactive Simulation Timeline Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800/80">
          {/* Time Projection Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Predictive Time Horizon:</span>
              </span>
              <span className="font-mono font-bold text-amber-400 text-sm">
                {simulationMonth === 0 ? 'Today (Current State)' : `+${simulationMonth} Months Future Projection`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              step="6"
              value={simulationMonth}
              onChange={(e) => setSimulationMonth(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>Today</span>
              <span>+6 Mos</span>
              <span>+12 Mos</span>
              <span>+18 Mos</span>
              <span>+24 Mos (Critical)</span>
            </div>
          </div>

          {/* Extreme Heat / Thermal Stress Multiplier */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                <span>Pavement Surface Temperature Stress:</span>
              </span>
              <span className="font-mono font-bold text-rose-300 text-sm">
                {heatStressFactor}°C ({heatStressFactor > 50 ? 'Severe Softening' : 'Nominal'})
              </span>
            </div>
            <input
              type="range"
              min="35"
              max="65"
              step="1"
              value={heatStressFactor}
              onChange={(e) => setHeatStressFactor(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>35°C (Winter)</span>
              <span>48°C (Summer Base)</span>
              <span>65°C (Peak Desert Asphalt)</span>
            </div>
          </div>
        </div>

        {simulationMonth > 0 && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Simulated future state shows <strong>{simulatedSegments.filter(s => s.status === 'High Priority').length} segments</strong> reaching catastrophic structural failure without preventive sealing.
              </span>
            </div>
            <button
              onClick={() => setSimulationMonth(0)}
              className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 transition-colors"
            >
              Reset to Today
            </button>
          </div>
        )}
      </div>

      {/* Network Overview with Simulated Degradation Values */}
      <NetworkOverview
        segments={simulatedSegments}
        onSelectSegment={onSelectSegment}
        isV2={true}
      />
    </div>
  );
};
