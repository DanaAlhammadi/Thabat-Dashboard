import React, { useState } from 'react';
import { NavTab, DeliverableMode } from '../types';
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
  ExternalLink,
  HelpCircle,
  FileCode
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

  const navItems: Array<{ id: NavTab; label: string; badge?: number }> = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'study-areas', label: 'Study Areas' },
    { id: 'segments', label: 'Road Segments' },
    { id: 'thermal', label: 'Thermal Screening' },
    { id: 'evidence', label: 'Environmental Evidence' },
    { id: 'results', label: 'Results', badge: queueCount },
    { id: 'about', label: 'About & Method' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectTab('dashboard')} 
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#0D3B45] flex items-center justify-center text-white font-black text-base shadow-sm group-hover:bg-[#2E6F6E] transition-colors">
              ث
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-[#0D3B45]">THABAT</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-[#0D3B45]/10 text-[#0D3B45] font-semibold">
                  UAE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block -mt-0.5">
                AI-Powered Road Resilience
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links — iOS Segmented / Clean Text Bar */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#F1F5F9]/80 p-1 rounded-full border border-slate-200/60 text-xs font-semibold">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-[#0D3B45] shadow-xs'
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

        {/* Right Utility Buttons */}
        <div className="flex items-center gap-2">
          {/* Feasibility Gate Trigger */}
          <button
            onClick={onOpenFeasibility}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200/60"
            title="Review Feasibility Gate Verification"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Feasibility Gate</span>
          </button>

          {/* Competition Pitch Trigger */}
          <button
            onClick={onOpenPitch}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#0D3B45] text-white hover:bg-[#2E6F6E] transition-colors shadow-xs"
            title="Open Judge Presentation Dossier"
          >
            <Award className="w-3.5 h-3.5 text-[#D4B483]" />
            <span>Competition Pitch</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-3 pt-3 border-t border-slate-200/80 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
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
              className="flex-1 py-2 text-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-700"
            >
              Feasibility Gate
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
