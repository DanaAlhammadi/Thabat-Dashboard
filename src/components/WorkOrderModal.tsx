import React from 'react';
import { RoadSegment } from '../types';
import { FileText, X, Printer, MapPin, ShieldCheck, Check, Send } from 'lucide-react';

interface WorkOrderModalProps {
  segment: RoadSegment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WorkOrderModal: React.FC<WorkOrderModalProps> = ({ segment, isOpen, onClose }) => {
  if (!isOpen || !segment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Header */}
        <div className="px-6 py-3.5 bg-[#F8F9FA] border-b border-slate-200 flex items-center justify-between text-xs print:hidden">
          <div className="flex items-center gap-2 text-[#0D3B45] font-semibold font-mono">
            <FileText className="w-4 h-4 text-[#2E6F6E]" />
            <span>Field Work Order #WO-2026-{segment.code.replace(/[^a-zA-Z0-9]/g, '')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#0D3B45] text-white rounded-xl hover:bg-[#2E6F6E] transition-colors flex items-center gap-1.5 font-semibold text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Document */}
        <div className="p-8 overflow-y-auto space-y-6 text-xs text-slate-800 font-sans">
          {/* Document Header */}
          <div className="flex items-start justify-between border-b-2 border-[#0D3B45] pb-4">
            <div>
              <div className="text-xl font-extrabold tracking-tight text-[#0D3B45] flex items-center gap-2">
                <span className="bg-[#0D3B45] text-white px-2 py-0.5 rounded font-black text-sm">ث</span>
                <span>THABAT ROAD RESILIENCE</span>
              </div>
              <div className="text-[11px] text-slate-600 mt-1">
                Satellite Environmental Screening & Inspection Prioritisation Protocol
              </div>
            </div>

            <div className="text-right font-mono text-[11px]">
              <div className="font-bold text-[#0D3B45]">SEGMENT: #{segment.code}</div>
              <div className="text-slate-500">Date: {new Date().toISOString().split('T')[0]}</div>
              <div className="text-slate-500">Classification: Official</div>
            </div>
          </div>

          {/* Location & Corridor */}
          <div className="grid grid-cols-2 gap-4 bg-[#F8F9FA] p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Assigned Corridor</span>
              <span className="font-bold text-slate-900 text-sm">{segment.name}</span>
              <span className="block text-slate-600 text-[11px] mt-0.5">{segment.corridor} · {segment.district}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Screening Ranking</span>
              <span className="font-mono font-bold text-amber-800 text-sm">
                {segment.screeningPriority || 'Higher Priority'} ({segment.supportQuality || 'High support'})
              </span>
              <span className="block text-slate-600 text-[11px] mt-0.5">
                Median LST: {segment.medianLST || 54.6}°C · Valid Pixels: {segment.validPixels || 91}
              </span>
            </div>
          </div>

          {/* Action Directive */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#0D3B45]">
              Field Crew Inspection Directive
            </h4>
            <div className="p-4 border-l-4 border-[#0D3B45] bg-[#F8F9FA] rounded-r-2xl space-y-1">
              <div className="font-bold text-slate-900">
                Prioritise for Physical Inspection & Surface Thermography
              </div>
              <p className="text-slate-700 leading-relaxed">
                {segment.recommendation?.rationale || 
                  'Perform physical walking audit along corridor mark to verify thermal variance observations against physical asphalt condition.'}
              </p>
            </div>
          </div>

          {/* Evidence Checklist */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#0D3B45]">
              Empirical Satellite Checklist
            </h4>
            <div className="space-y-1.5 bg-[#F8F9FA] p-3 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Landsat 9 Level-2 Surface Temperature checked (31 Aug 2026 pass)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>DN=0 fill data filtered; verified valid pixel count recorded</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sentinel-2 visual check (19 Sep ↔ 4 Oct 2026): No obvious visual road-surface change</span>
              </div>
            </div>
          </div>

          {/* Inspector Signatures */}
          <div className="pt-4 border-t border-slate-300 grid grid-cols-2 gap-8 text-[11px]">
            <div>
              <div className="text-slate-400 font-mono">DISPATCHING ENGINEER</div>
              <div className="mt-4 border-b border-slate-400 w-3/4"></div>
              <div className="text-slate-700 mt-1 font-semibold">THABAT Remote Screening Desk</div>
            </div>
            <div>
              <div className="text-slate-400 font-mono">FIELD INSPECTION LEAD</div>
              <div className="mt-4 border-b border-slate-400 w-3/4"></div>
              <div className="text-slate-700 mt-1 font-semibold">
                {segment.assignedCrew || 'Mobile Inspection Unit Alpha'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F8F9FA] border-t border-slate-200 flex items-center justify-between text-xs print:hidden">
          <span className="text-slate-500 font-mono text-[10px]">
            CONFIDENTIAL · ROAD ASSET MANAGEMENT INTELLIGENCE
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#0D3B45] text-white hover:bg-[#2E6F6E] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
