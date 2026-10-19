import React from 'react';
import { 
  Award, 
  ExternalLink, 
  FileCode, 
  ShieldCheck, 
  MapPin, 
  Layers, 
  Github, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { REPRODUCIBLE_POC } from '../data/mockData';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
              <Award className="w-3.5 h-3.5 text-[#D4B483]" />
              <span>Arab Youth Space Hackathon 2026 · 813 Challenge</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
              ABOUT THABAT
            </h1>
            <p className="text-sm font-bold text-[#2E6F6E] uppercase tracking-wider">
              AI-POWERED ROAD RESILIENCE
            </p>
          </div>
          <div className="flex items-center gap-3.5 p-3 sm:p-3.5 bg-[#F5F1E8]/70 rounded-2xl border border-[#D4B483]/30 self-start md:self-center shadow-xs">
            <div className="w-14 h-14 rounded-xl bg-white p-1 border border-slate-200/80 flex items-center justify-center shrink-0">
              <img 
                src="/assets/aistudio/image_724da27a.png" 
                alt="THABAT Official Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-black text-[#0D3B45]">THABAT</div>
              <div className="text-[11px] text-slate-600 font-semibold">Earth-Observation Road Resilience</div>
              <div className="text-[10px] text-[#2E6F6E] font-mono mt-0.5 font-bold">PoC v1.0 · UAE Space Challenge</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          THABAT is an Earth-observation road environmental screening and inspection-prioritisation system engineered for the road and highway networks of the United Arab Emirates.
        </p>
      </div>

      {/* Reproducible PoC Card with Clickable GitHub Link */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#0D3B45] text-white">
              <FileCode className="w-6 h-6 text-[#D4B483]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0D3B45]">REPRODUCIBLE PoC</h2>
              <span className="text-xs text-slate-500 font-mono">
                Independent Evaluation Dossier for Competition Judges
              </span>
            </div>
          </div>

          <a
            href={REPRODUCIBLE_POC.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-2 text-xs font-bold shadow-xs"
          >
            <Github className="w-4 h-4 text-amber-400" />
            <span>Open GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {REPRODUCIBLE_POC.description}
        </p>

        {/* Directory Spec */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">NOTEBOOK</span>
            <span className="font-bold text-[#0D3B45] block mt-1">{REPRODUCIBLE_POC.notebook}</span>
          </div>

          <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">SAMPLE DATA DIRECTORY</span>
            <span className="font-bold text-slate-800 block mt-1">{REPRODUCIBLE_POC.inputsDir}</span>
          </div>

          <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">OUTPUT RESULTS DIRECTORY</span>
            <span className="font-bold text-slate-800 block mt-1">{REPRODUCIBLE_POC.outputsDir}</span>
          </div>
        </div>

        {/* Terminal Instructions */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs space-y-1.5 overflow-x-auto">
          <div className="text-amber-400 font-bold">// Reproduce all results in 3 commands:</div>
          <div className="text-slate-300">git clone {REPRODUCIBLE_POC.githubUrl}.git</div>
          <div className="text-slate-300">cd Arab-Youth-Space-Hackathon-2026-813-Challenge</div>
          <div className="text-emerald-400">jupyter notebook 02_main_analysis.ipynb</div>
        </div>

        {/* Clickable GitHub Direct URL Box */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-slate-800">Direct GitHub URL:</span>
            <div className="font-mono text-[#0D3B45] break-all">{REPRODUCIBLE_POC.githubUrl}</div>
          </div>
          <a
            href={REPRODUCIBLE_POC.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#2E6F6E] hover:underline flex items-center gap-1"
          >
            <span>Visit on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
