import React, { useState } from 'react';
import { 
  ROAD_SEGMENTS, 
  INSPECTION_QUEUE, 
  AOI_A_SEGMENTS, 
  AOI_B_SEGMENTS, 
  ALL_SCREENING_SEGMENTS 
} from './data/mockData';
import { 
  NavTab, 
  DeliverableMode, 
  RoadSegment, 
  InspectionQueueItem, 
  ScreeningSegment 
} from './types';
import { Header } from './components/Header';
import { DashboardHome } from './components/DashboardHome';
import { StudyAreasView } from './components/StudyAreasView';
import { ThermalScreeningView } from './components/ThermalScreeningView';
import { EnvironmentalEvidenceView } from './components/EnvironmentalEvidenceView';
import { ResultsQueueView } from './components/ResultsQueueView';
import { ValidationRoadmapView } from './components/ValidationRoadmapView';
import { NetworkMap } from './components/NetworkMap';
import { DashboardV2View } from './components/DashboardV2View';
import { InspectionQueue } from './components/InspectionQueue';
import { WireframeView } from './components/WireframeView';
import { MarketResearchView } from './components/MarketResearchView';
import { SegmentDetailModal } from './components/SegmentDetailModal';
import { FeasibilityGateModal } from './components/FeasibilityGateModal';
import { JudgePitchModal } from './components/JudgePitchModal';
import { WorkOrderModal } from './components/WorkOrderModal';
import { 
  CheckCircle2, 
  MapPin, 
  Layers, 
  Flame, 
  Activity, 
  BookOpen, 
  Home,
  FileCode,
  ShieldCheck,
  Send
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [legacyMode, setLegacyMode] = useState<DeliverableMode | null>(null);

  const [segments, setSegments] = useState<RoadSegment[]>(ROAD_SEGMENTS);
  const [queue, setQueue] = useState<InspectionQueueItem[]>(INSPECTION_QUEUE);
  
  // Modals state
  const [selectedSegment, setSelectedSegment] = useState<RoadSegment | null>(null);
  const [isFeasibilityOpen, setIsFeasibilityOpen] = useState<boolean>(false);
  const [isPitchOpen, setIsPitchOpen] = useState<boolean>(false);
  const [workOrderSegment, setWorkOrderSegment] = useState<RoadSegment | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Helper to convert ScreeningSegment to RoadSegment for modals
  const handleSelectScreeningSegment = (screeningSeg: ScreeningSegment) => {
    const full = segments.find(s => s.code === screeningSeg.code);
    if (full) {
      setSelectedSegment(full);
    } else {
      // Fallback synthesizer
      const fallback: RoadSegment = {
        id: `seg-${screeningSeg.code}`,
        code: screeningSeg.code,
        name: screeningSeg.roadName,
        corridor: screeningSeg.aoiName,
        district: screeningSeg.aoiId,
        lengthKm: 2.0,
        lanes: 4,
        pavementType: 'Stone Mastic Asphalt',
        status: screeningSeg.screeningPriority === 'Higher Priority' ? 'High Priority' : 'Watch',
        thabatScore: screeningSeg.screeningPriority === 'Higher Priority' ? 55 : 80,
        previousScore: 68,
        primaryDefect: 'Thermal Fatigue Micro-Cracking',
        defectDepthCm: 2.5,
        urgencyRank: screeningSeg.rank,
        lastScanDate: '2026-08-31',
        revisitCycleDays: 14,
        coordinates: screeningSeg.coordinates,
        medianLST: screeningSeg.medianLST,
        tempRange: screeningSeg.tempRange,
        validPixels: screeningSeg.validPixels,
        screeningPriority: screeningSeg.screeningPriority,
        supportQuality: screeningSeg.supportQuality,
        scoreBreakdown: {
          bitumenHealth: 70,
          subgradeMoistureIndex: 35,
          voidSusceptibility: 40,
          structuralFatigueIndex: 50
        },
        recommendation: {
          action: screeningSeg.recommendedAction,
          interventionWindowDays: 21,
          estimatedCostUsd: 12000,
          preventedFailureCostUsd: 90000,
          rationale: screeningSeg.explanation,
          spectralSignatures: [
            `Landsat 9 L2 Surface Temp: ${screeningSeg.medianLST}°C`,
            `Valid pixel sample: ${screeningSeg.validPixels} pixels`
          ]
        },
        spectralData: [],
        historicalTrend: [{ month: 'Aug 26', thabatScore: 70 }]
      };
      setSelectedSegment(fallback);
    }
  };

  // Handler for dispatching crew from segment or queue
  const handleDispatchCrew = (segmentOrItem: RoadSegment | InspectionQueueItem | ScreeningSegment) => {
    const code = 'code' in segmentOrItem ? segmentOrItem.code : segmentOrItem.segmentCode;
    const crewName = 'assignedCrew' in segmentOrItem && segmentOrItem.assignedCrew 
      ? segmentOrItem.assignedCrew 
      : 'Mobile Inspection Unit Alpha';

    // Update queue item status to 'In Transit'
    setQueue(prev => prev.map(item => {
      if (item.segmentCode === code) {
        return { ...item, workStatus: 'In Transit', assignedCrew: crewName };
      }
      return item;
    }));

    showToast(`Inspection Crew (${crewName}) dispatched to ${code}. Inspection telemetry synchronized.`);
  };

  // Handler for opening work order modal
  const handleOpenWorkOrder = (segmentOrScreening: RoadSegment | ScreeningSegment) => {
    if ('scoreBreakdown' in segmentOrScreening) {
      setWorkOrderSegment(segmentOrScreening);
    } else {
      const full = segments.find(s => s.code === segmentOrScreening.code);
      if (full) {
        setWorkOrderSegment(full);
      }
    }
  };

  // Navigation handler that clears legacy mode overrides
  const handleNavigateTab = (tab: NavTab) => {
    setLegacyMode(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Legacy mode handler (e.g. from pitch modal to wireframes or commercial)
  const handleNavigateLegacy = (mode: DeliverableMode) => {
    if (mode === 'wireframes' || mode === 'v2' || mode === 'commercial') {
      setLegacyMode(mode);
    } else if (mode === 'v1' || mode === 'dashboard') {
      handleNavigateTab('dashboard');
    } else if (mode === 'queue' || mode === 'results') {
      handleNavigateTab('results');
    } else {
      handleNavigateTab(mode as NavTab);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E1E1E] flex flex-col font-sans">
      {/* Universal iOS-Style Top Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleNavigateTab}
        onOpenFeasibility={() => setIsFeasibilityOpen(true)}
        onOpenPitch={() => setIsPitchOpen(true)}
        queueCount={queue.filter(q => q.workStatus === 'Pending Dispatch').length}
      />

      {/* Main Container Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-20 xl:pb-6">
        {/* Legacy Mode Overrides (Preserves all existing working features) */}
        {legacyMode === 'v2' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold text-[#0D3B45]">
                Viewing: Dashboard V2 (Predictive Simulation & Thermal Stress)
              </span>
              <button
                onClick={() => setLegacyMode(null)}
                className="text-xs font-bold text-[#2E6F6E] hover:underline"
              >
                ← Back to Primary Dashboard
              </button>
            </div>
            <DashboardV2View
              segments={segments}
              onSelectSegment={(seg) => setSelectedSegment(seg)}
            />
          </div>
        )}

        {legacyMode === 'wireframes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold text-[#0D3B45]">
                Viewing: Wireframes & Architecture Specification
              </span>
              <button
                onClick={() => setLegacyMode(null)}
                className="text-xs font-bold text-[#2E6F6E] hover:underline"
              >
                ← Back to Primary Dashboard
              </button>
            </div>
            <WireframeView
              onSwitchToV1={() => handleNavigateTab('dashboard')}
              onSwitchToV2={() => setLegacyMode('v2')}
            />
          </div>
        )}

        {legacyMode === 'commercial' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold text-[#0D3B45]">
                Viewing: Market Research, Unit Economics & Competitor Comparison
              </span>
              <button
                onClick={() => setLegacyMode(null)}
                className="text-xs font-bold text-[#2E6F6E] hover:underline"
              >
                ← Back to Primary Dashboard
              </button>
            </div>
            <MarketResearchView />
          </div>
        )}

        {/* Primary iOS Application Tabs */}
        {!legacyMode && (
          <>
            {/* 1. Dashboard Home */}
            {currentTab === 'dashboard' && (
              <DashboardHome
                onNavigate={handleNavigateTab}
                onSelectSegment={handleSelectScreeningSegment}
              />
            )}

            {/* 2. Study Areas */}
            {currentTab === 'study-areas' && (
              <StudyAreasView
                onSelectSegment={handleSelectScreeningSegment}
                onNavigateToThermal={() => handleNavigateTab('thermal')}
              />
            )}

            {/* 3. Road Segments & Interactive GIS Map */}
            {currentTab === 'segments' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(13,59,69,0.06)] space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B45]/5 text-[#0D3B45] text-xs font-semibold tracking-wide border border-[#0D3B45]/10">
                    <Layers className="w-3.5 h-3.5 text-[#2E6F6E]" />
                    <span>Road Corridors & GIS Geometries</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B45] tracking-tight">
                    Interactive Road Segment Map
                  </h1>
                  <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                    Explore road segment boundaries, thermal anomaly overlays, and click any segment pin to examine verified Landsat 9 and Sentinel-2 telemetry.
                  </p>
                </div>

                {/* iOS Clean Map Component */}
                <NetworkMap
                  segments={segments}
                  selectedSegment={selectedSegment}
                  onSelectSegment={(seg) => setSelectedSegment(seg)}
                />
              </div>
            )}

            {/* 4. Thermal Screening */}
            {currentTab === 'thermal' && (
              <ThermalScreeningView
                onSelectSegment={handleSelectScreeningSegment}
                onDispatchInspection={handleDispatchCrew}
              />
            )}

            {/* 5. Environmental Evidence */}
            {currentTab === 'evidence' && (
              <EnvironmentalEvidenceView />
            )}

            {/* 6. Results & Prioritised Inspection Queue */}
            {currentTab === 'results' && (
              <ResultsQueueView
                onSelectSegment={handleSelectScreeningSegment}
                onDispatchCrew={handleDispatchCrew}
                onGenerateWorkOrder={handleOpenWorkOrder}
                queue={queue}
              />
            )}

            {/* 7. About & Method */}
            {currentTab === 'about' && (
              <ValidationRoadmapView />
            )}
          </>
        )}
      </main>

      {/* iOS Mobile Floating Bottom Navigation Bar (Visible only on mobile / small screens) */}
      <div className="xl:hidden fixed bottom-3 left-4 right-4 z-40 bg-white/95 backdrop-blur-lg border border-slate-200/90 rounded-3xl shadow-xl px-4 py-2 flex items-center justify-around text-[10px] font-semibold text-slate-500">
        <button
          onClick={() => handleNavigateTab('dashboard')}
          className={`flex flex-col items-center gap-1 p-1 transition-colors ${
            currentTab === 'dashboard' && !legacyMode ? 'text-[#0D3B45]' : 'hover:text-slate-800'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNavigateTab('segments')}
          className={`flex flex-col items-center gap-1 p-1 transition-colors ${
            currentTab === 'segments' && !legacyMode ? 'text-[#0D3B45]' : 'hover:text-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Map</span>
        </button>

        <button
          onClick={() => handleNavigateTab('thermal')}
          className={`flex flex-col items-center gap-1 p-1 transition-colors ${
            currentTab === 'thermal' && !legacyMode ? 'text-[#0D3B45]' : 'hover:text-slate-800'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Thermal</span>
        </button>

        <button
          onClick={() => handleNavigateTab('results')}
          className={`flex flex-col items-center gap-1 p-1 transition-colors relative ${
            currentTab === 'results' && !legacyMode ? 'text-[#0D3B45]' : 'hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Results</span>
        </button>

        <button
          onClick={() => handleNavigateTab('about')}
          className={`flex flex-col items-center gap-1 p-1 transition-colors ${
            currentTab === 'about' && !legacyMode ? 'text-[#0D3B45]' : 'hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Method</span>
        </button>
      </div>

      {/* iOS Quiet Clean Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-5 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0D3B45]">THABAT Platform</span>
            <span>·</span>
            <span>AI-Powered Road Resilience</span>
            <span>·</span>
            <span className="text-[#2E6F6E]">Landsat 9 & Sentinel-2 Verified</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
            <button 
              onClick={() => setIsFeasibilityOpen(true)}
              className="hover:text-[#0D3B45] transition-colors"
            >
              Feasibility Gate
            </button>
            <button 
              onClick={() => setIsPitchOpen(true)}
              className="hover:text-[#0D3B45] transition-colors text-[#0D3B45] font-semibold"
            >
              Competition Pitch
            </button>
            <button 
              onClick={() => handleNavigateLegacy('commercial')}
              className="hover:text-[#0D3B45] transition-colors"
            >
              Unit Economics
            </button>
            <button 
              onClick={() => handleNavigateLegacy('wireframes')}
              className="hover:text-[#0D3B45] transition-colors"
            >
              Wireframe Specs
            </button>
          </div>
        </div>
      </footer>

      {/* Segment Detail Slide-over / Modal */}
      <SegmentDetailModal
        segment={selectedSegment}
        onClose={() => setSelectedSegment(null)}
        onDispatchCrew={(seg) => handleDispatchCrew(seg)}
        onGenerateWorkOrder={(seg) => setWorkOrderSegment(seg)}
      />

      {/* Feasibility Gate Dossier Modal */}
      <FeasibilityGateModal
        isOpen={isFeasibilityOpen}
        onClose={() => setIsFeasibilityOpen(false)}
      />

      {/* Competition Judge Pitch Modal */}
      <JudgePitchModal
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
        onNavigateTo={(view) => handleNavigateLegacy(view)}
      />

      {/* Official Field Inspection Work Order Modal */}
      <WorkOrderModal
        segment={workOrderSegment}
        isOpen={!!workOrderSegment}
        onClose={() => setWorkOrderSegment(null)}
      />

      {/* iOS Floating Action Confirmation Toast */}
      {toastMessage && (
        <div className="fixed bottom-16 xl:bottom-6 right-6 z-50 bg-white border border-slate-200 text-[#0D3B45] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
