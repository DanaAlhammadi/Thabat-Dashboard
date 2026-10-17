import React, { useState } from 'react';
import { RoadSegment, SegmentStatus } from '../types';
import { NetworkMap } from './NetworkMap';
import { 
  AlertTriangle, ShieldCheck, Eye, Activity, Filter, 
  TrendingDown, ArrowRight, DollarSign, Calendar, RefreshCw, FileSpreadsheet
} from 'lucide-react';

interface NetworkOverviewProps {
  segments: RoadSegment[];
  onSelectSegment: (segment: RoadSegment) => void;
  isV2?: boolean;
}

export const NetworkOverview: React.FC<NetworkOverviewProps> = ({
  segments,
  onSelectSegment,
  isV2 = false
}) => {
  const [statusFilter, setStatusFilter] = useState<SegmentStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMapSegment, setSelectedMapSegment] = useState<RoadSegment | null>(segments[0]);

  // Aggregate counts
  const highPriorityCount = segments.filter(s => s.status === 'High Priority').length;
  const inspectCount = segments.filter(s => s.status === 'Inspect').length;
  const watchCount = segments.filter(s => s.status === 'Watch').length;
  const normalCount = segments.filter(s => s.status === 'Normal').length;

  const totalPreventedSavings = segments.reduce(
    (acc, curr) => acc + (curr.recommendation.preventedFailureCostUsd - curr.recommendation.estimatedCostUsd),
    0
  );

  const filteredSegments = segments.filter(s => {
    const matchesFilter = statusFilter === 'All' || s.status === statusFilter;
    const matchesSearch = 
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.corridor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.primaryDefect.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadgeClass = (status: SegmentStatus) => {
    switch (status) {
      case 'High Priority': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Inspect': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Watch': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'Normal': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Stat Cards (Single-Elevation Flat Surface with Subtle Borders) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Total Scanned */}
        <div 
          onClick={() => setStatusFilter('All')}
          className={`p-4 bg-slate-900 border rounded-xl cursor-pointer transition-all ${
            statusFilter === 'All' ? 'border-amber-400/80 bg-slate-850' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-xs text-slate-400 font-medium">Scanned Corridor Network</div>
          <div className="mt-2 text-2xl font-bold font-mono text-white tabular-nums">
            1,420 <span className="text-xs font-sans font-normal text-slate-500">km</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {segments.length} Monitored Segments
          </div>
        </div>

        {/* High Priority (<50) */}
        <div 
          onClick={() => setStatusFilter('High Priority')}
          className={`p-4 bg-slate-900 border rounded-xl cursor-pointer transition-all ${
            statusFilter === 'High Priority' ? 'border-rose-500/80 bg-slate-850' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-xs text-rose-400 font-medium flex items-center justify-between">
            <span>High Priority</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-rose-300 tabular-nums">
            {highPriorityCount} <span className="text-xs font-sans font-normal text-slate-500">units</span>
          </div>
          <div className="mt-1 text-[11px] text-rose-400/80">
            Immediate dispatch (&lt;14d)
          </div>
        </div>

        {/* Inspect (50-69) */}
        <div 
          onClick={() => setStatusFilter('Inspect')}
          className={`p-4 bg-slate-900 border rounded-xl cursor-pointer transition-all ${
            statusFilter === 'Inspect' ? 'border-orange-500/80 bg-slate-850' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-xs text-orange-400 font-medium">Inspect</div>
          <div className="mt-2 text-2xl font-bold font-mono text-orange-300 tabular-nums">
            {inspectCount} <span className="text-xs font-sans font-normal text-slate-500">units</span>
          </div>
          <div className="mt-1 text-[11px] text-orange-400/80">
            Field validation (&lt;28d)
          </div>
        </div>

        {/* Watch (70-84) */}
        <div 
          onClick={() => setStatusFilter('Watch')}
          className={`p-4 bg-slate-900 border rounded-xl cursor-pointer transition-all ${
            statusFilter === 'Watch' ? 'border-yellow-500/80 bg-slate-850' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-xs text-yellow-400 font-medium">Watch</div>
          <div className="mt-2 text-2xl font-bold font-mono text-yellow-300 tabular-nums">
            {watchCount} <span className="text-xs font-sans font-normal text-slate-500">units</span>
          </div>
          <div className="mt-1 text-[11px] text-yellow-400/80">
            Routine satellite pass (30d)
          </div>
        </div>

        {/* Normal (85-100) */}
        <div 
          onClick={() => setStatusFilter('Normal')}
          className={`p-4 bg-slate-900 border rounded-xl cursor-pointer transition-all col-span-2 lg:col-span-1 ${
            statusFilter === 'Normal' ? 'border-emerald-500/80 bg-slate-850' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-xs text-emerald-400 font-medium">Normal</div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-300 tabular-nums">
            {normalCount} <span className="text-xs font-sans font-normal text-slate-500">units</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-400/80">
            Optimal structural health
          </div>
        </div>
      </div>

      {/* Main Interactive Road Network GIS Canvas */}
      <NetworkMap
        segments={segments}
        selectedSegment={selectedMapSegment}
        onSelectSegment={(seg) => {
          setSelectedMapSegment(seg);
          onSelectSegment(seg);
        }}
        statusFilter={statusFilter}
        isV2={isV2}
      />

      {/* Segments Directory Table with Real Filtering */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        {/* Table Filter Header */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">Segment Health Inventory</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 font-mono">Showing {filteredSegments.length} of {segments.length} Segments</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search corridor or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => {
                setStatusFilter('All');
                setSearchQuery('');
              }}
              className="px-2.5 py-1 rounded bg-slate-850 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* High-Density Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
                <th className="py-2.5 px-4">Segment Code</th>
                <th className="py-2.5 px-4">Corridor & District</th>
                <th className="py-2.5 px-4 text-center">THABAT Score</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Detected Molecular Distress</th>
                <th className="py-2.5 px-4">Depth</th>
                <th className="py-2.5 px-4">Intervention Window</th>
                <th className="py-2.5 px-4">Preventive vs Replacement</th>
                <th className="py-2.5 px-4 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSegments.map((segment) => (
                <tr
                  key={segment.id}
                  onClick={() => onSelectSegment(segment)}
                  className="hover:bg-slate-850/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-mono font-bold text-amber-400 group-hover:text-amber-300">
                    {segment.code}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-200">{segment.name}</div>
                    <div className="text-[11px] text-slate-400">{segment.corridor}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-mono text-sm font-bold text-white tabular-nums">
                      {segment.thabatScore}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">/100</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-mono font-medium border text-[11px] ${getStatusBadgeClass(segment.status)}`}>
                      {segment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-200 font-medium">{segment.primaryDefect}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-xs">{segment.recommendation.action}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {segment.defectDepthCm > 0 ? `${segment.defectDepthCm} cm` : 'Surface'}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {segment.status === 'Normal' ? '180 Days' : `${segment.recommendation.interventionWindowDays} Days`}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <div className="text-emerald-400">
                      ${segment.recommendation.estimatedCostUsd.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500 line-through">
                      ${segment.recommendation.preventedFailureCostUsd.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSegment(segment);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium flex items-center gap-1 ml-auto text-[11px]"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
