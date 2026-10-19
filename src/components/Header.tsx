import React, { useState } from 'react';
import { NavTab } from '../types';
import { 
  ShieldCheck, 
  Award, 
  Menu, 
  X, 
  MapPin, 
  Layers, 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  Eye,
  FileCode,
  Info
} from 'lucide-react';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenFeasibility: () => void;
  onOpenPitch: () => void;
  queueCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenFeasibility,
  onOpenPitch,
  queueCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact 8 sections as specified in the Information Architecture
  const navItems: Array<{ id: NavTab; label: string; badge?: number }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'study-areas', label: 'Study Areas' },
    { id: 'thermal', label: 'Thermal Screening' },
    { id: 'multispectral', label: 'Multispectral Context' },
    { id: 'queue', label: 'Inspection Queue', badge: queueCount },
    { id: 'evidence', label: 'Evidence' },
    { id: 'method', label: 'Method' },
    { id: 'about', label: 'About' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectTab('overview')} 
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white p-0.5 border border-slate-200/90 shadow-xs flex items-center justify-center overflow-hidden shrink-0 group-hover:border-[#2E6F6E]/40 transition-colors">
              <img 
                src="/assets/aistudio/image_724da27a.png" 
                alt="THABAT Logo - AI-Powered Road Resilience" 
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#0D3B45]">THABAT</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-[#0D3B45]/10 text-[#0D3B45] font-bold">
                  UAE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold tracking-wider hidden sm:block -mt-0.5">
                AI-POWERED ROAD RESILIENCE
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links — iOS Cupertino-style Segmented Bar */}
        <nav className="hidden xl:flex items-center gap-0.5 bg-[#F1F5F9]/90 p-1 rounded-full border border-slate-200/70 text-xs font-semibold">
          {navItems.map((item) => {
            const isActive = currentTab === item.id || 
              (item.id === 'overview' && currentTab === 'dashboard') ||
              (item.id === 'queue' && currentTab === 'results');

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#0D3B45] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-100 text-amber-900 font-bold border border-amber-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Feasibility Gate Trigger */}
          <button
            onClick={onOpenFeasibility}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200/60 cursor-pointer"
            title="Review Feasibility Gate Verification"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Feasibility Gate</span>
          </button>

          {/* Competition Pitch Trigger */}
          <button
            onClick={onOpenPitch}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0D3B45] text-white hover:bg-[#2E6F6E] transition-colors shadow-xs cursor-pointer"
            title="Open Judge Presentation Dossier"
          >
            <Award className="w-3.5 h-3.5 text-[#D4B483]" />
            <span>Competition Pitch</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-3 pt-3 border-t border-slate-200/80 space-y-1 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-2.5 px-3 py-2 bg-[#F5F1E8]/70 rounded-2xl border border-[#D4B483]/20 mb-2">
            <img 
              src="/assets/aistudio/image_724da27a.png" 
              alt="THABAT Logo" 
              className="w-8 h-8 object-contain shrink-0 rounded-lg bg-white p-0.5 border border-slate-200/60"
            />
            <div>
              <div className="text-xs font-black text-[#0D3B45]">THABAT</div>
              <div className="text-[9px] font-bold text-slate-500 tracking-wider">AI-POWERED ROAD RESILIENCE</div>
            </div>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between cursor-pointer ${
                currentTab === item.id
                  ? 'bg-[#0D3B45] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-400 text-slate-900 font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                onOpenFeasibility();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center rounded-xl bg-slate-100 text-xs font-bold text-slate-700"
            >
              Feasibility Gate
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
