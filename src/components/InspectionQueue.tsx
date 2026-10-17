import React, { useState } from 'react';
import { InspectionQueueItem, RoadSegment, SegmentStatus } from '../types';
import { 
  AlertCircle, CheckCircle, Clock, Truck, UserCheck, 
  Download, Filter, ArrowUpDown, ChevronRight, ShieldAlert, Sparkles, Send
} from 'lucide-react';

interface InspectionQueueProps {
  queue: InspectionQueueItem[];
  segments: RoadSegment[];
  onSelectSegment: (segment: RoadSegment) => void;
  onUpdateQueueItem: (itemId: string, updates: Partial<InspectionQueueItem>) => void;
  onDispatchCrew: (item: InspectionQueueItem) => void;
}

export const InspectionQueue: React.FC<InspectionQueueProps> = ({
  queue,
  segments,
  onSelectSegment,
  onUpdateQueueItem,
  onDispatchCrew
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<InspectionQueueItem | null>(null);

  const filteredQueue = queue.filter(item => {
    const matchesFilter = filterStatus === 'All' || item.status === filterStatus || item.workStatus === filterStatus;
    const matchesSearch = 
      item.segmentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.roadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.corridor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detectedDefect.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getUrgencyBadge = (score: number) => {
    if (score >= 90) return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    if (score >= 70) return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  };

  const getWorkStatusColor = (status: InspectionQueueItem['workStatus']) => {
    switch (status) {
      case 'Pending Dispatch': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'In Transit': return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'Field Validating': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'Inspected & Confirmed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Maintenance Scheduled': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Field Crew Context */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="p-6 lg:p-8 lg:col-span-2 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
                <ShieldAlert className="w-4 h-4" />
                <span>Automated Inspection Dispatch Engine</span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">
                Priority Inspection Queue & Crew Ranking
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                THABAT continuously prioritizes road segments using multi-dimensional risk scores combining SWIR moisture absorption, structural depth variance, and traffic axle load. Field crews are dispatched to highest-risk sublayers before surface distress manifests.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-slate-400">Total in Queue</div>
                <div className="text-xl font-bold font-mono text-white mt-1">{queue.length} Segments</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-rose-500/20">
                <div className="text-rose-400">High Urgency (&gt;85)</div>
                <div className="text-xl font-bold font-mono text-rose-300 mt-1">
                  {queue.filter(q => q.urgencyScore >= 85).length} Segments
                </div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-slate-400">Avg Response Time</div>
                <div className="text-xl font-bold font-mono text-amber-300 mt-1">14.2 Hours</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-emerald-500/20">
                <div className="text-emerald-400">Active Field Crews</div>
                <div className="text-xl font-bold font-mono text-emerald-300 mt-1">3 Mobile Units</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative border-l border-slate-800">
            <img
              src="/src/assets/images/thabat_field_inspection_team_1790338398849.jpg"
              alt="THABAT Highway Mobile Inspection Unit in the field"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-4">
              <span className="text-xs text-slate-300 font-mono">
                Field Inspection Crew Bravo · Live GPS Telemetry
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-xl">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Search segment code, corridor, or defect..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {['All', 'High Priority', 'Inspect', 'Pending Dispatch', 'In Transit'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterStatus === status ? 'bg-amber-400 text-slate-950 font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
                <th className="py-3 px-4 w-12 text-center">Rank</th>
                <th className="py-3 px-4">Segment Code & Name</th>
                <th className="py-3 px-4">Urgency Score</th>
                <th className="py-3 px-4">Detected Subsurface Defect</th>
                <th className="py-3 px-4">Assigned Crew</th>
                <th className="py-3 px-4">Scheduled Date</th>
                <th className="py-3 px-4">Execution Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredQueue.map((item) => {
                const matchedSegment = segments.find(s => s.id === item.segmentId);

                return (
                  <tr 
                    key={item.id} 
                    className="hover:bg-slate-850/60 transition-colors group cursor-pointer"
                    onClick={() => matchedSegment && onSelectSegment(matchedSegment)}
                  >
                    {/* Rank */}
                    <td className="py-3 px-4 text-center font-mono font-bold text-amber-400">
                      #{item.priorityRank}
                    </td>

                    {/* Code & Name */}
                    <td className="py-3 px-4">
                      <div className="font-mono font-semibold text-white group-hover:text-amber-400 transition-colors">
                        {item.segmentCode}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">
                        {item.roadName} ({item.corridor})
                      </div>
                    </td>

                    {/* Urgency Score */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded font-mono font-bold border ${getUrgencyBadge(item.urgencyScore)}`}>
                          {item.urgencyScore}/100
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {item.spectralConfidence}% Conf.
                        </span>
                      </div>
                    </td>

                    {/* Detected Defect */}
                    <td className="py-3 px-4">
                      <span className="text-slate-200 font-medium">
                        {item.detectedDefect}
                      </span>
                    </td>

                    {/* Assigned Crew */}
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={item.assignedCrew}
                        onChange={(e) => onUpdateQueueItem(item.id, { assignedCrew: e.target.value })}
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option value="Mobile Inspection Unit Alpha">Unit Alpha (GPR + Optical)</option>
                        <option value="Mobile Inspection Unit Bravo">Unit Bravo (Spectral Van)</option>
                        <option value="Mobile Inspection Unit Gamma">Unit Gamma (Core Extraction)</option>
                        <option value="Unassigned (Q4 Schedule)">Unassigned</option>
                      </select>
                    </td>

                    {/* Scheduled Date */}
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {item.scheduledDate}
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={item.workStatus}
                        onChange={(e) => onUpdateQueueItem(item.id, { workStatus: e.target.value as any })}
                        className={`border rounded px-2 py-1 text-xs font-medium focus:outline-none bg-slate-950 ${getWorkStatusColor(item.workStatus)}`}
                      >
                        <option value="Pending Dispatch">Pending Dispatch</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Field Validating">Field Validating</option>
                        <option value="Inspected & Confirmed">Inspected & Confirmed</option>
                        <option value="Maintenance Scheduled">Maintenance Scheduled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onDispatchCrew(item)}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors flex items-center gap-1 shadow-sm"
                          title="Dispatch Crew to this location"
                        >
                          <Send className="w-3 h-3" />
                          <span>Dispatch</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
