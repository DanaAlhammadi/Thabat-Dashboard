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
import { MultispectralView } from './components/MultispectralView';
import { ResultsQueueView } from './components/ResultsQueueView';
import { EnvironmentalEvidenceView } from './components/EnvironmentalEvidenceView';
import { ValidationRoadmapView } from './components/ValidationRoadmapView';
import { AboutView } from './components/AboutView';
import { DashboardV2View } from './components/DashboardV2View';
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
  BookOpen, 
  Home,
  Eye,
  FileCode,
  ShieldCheck,
  Send
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
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
      const fallback: RoadSegment = {
        id: `seg-${screeningSeg.code}`,
        code: screeningSeg.code,
        name: screeningSeg.roadName,
        corridor: screeningSeg.aoiName,
        district: screeningSeg.aoiId,
        lengthKm: 2.0,
        lanes: 4,
        pavementType: 'Stone Mastic Asphalt',
        status: screeningSeg.screeningFlag === 'HIGHER PRIORITY' ? 'High Priority' : 'Watch',
        thabatScore: screeningSeg.screeningFlag === 'HIGHER PRIORITY' ? 55 : 80,
        previousScore: 68,
        primaryDefect: 'Thermal Fatigue Micro-Cracking',
        defectDepthCm: 2.5,
        urgencyRank: screeningSeg.rank,
        lastScanDate: '2026-08-31',
        revisitCycleDays: 14,
        coordinates: screeningSeg.coordinates,
        medianLST: screeningSeg.tMedian,
        tempRange: screeningSeg.tRange,
        validPixels: screeningSeg.validPixelCount,
        screeningPriority: screeningSeg.screeningFlag,
        supportQuality: screeningSeg.supportFlag,
        whyFlagged: screeningSeg.whyFlagged,
        priorityScore: screeningSeg.priorityScore,
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
          rationale: screeningSeg.whyFlagged,
          spectralSignatures: [
            `Median surface temp: ${screeningSeg.tMedian.toFixed(2)} °C`,
            `Valid pixel sample: ${screeningSeg.validPixelCount} pixels`
          ]
        },
        spectralData: [],
        historicalTrend: [{ month: 'Aug 26', thabatScore: 70 }]
      };
      setSelectedSegment(fallback);
    }
  };

  // Handler for dispatching crew
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

    showToast(`Inspection Crew (${crewName}) dispatched to segment ${code}. Telemetry synchronized.`);
  };

  // Handler for adding segment to inspection queue
  const handleAddToQueue = (segmentOrScreening: RoadSegment | ScreeningSegment) => {
    const code = 'code' in segmentOrScreening ? segmentOrScreening.code : (segmentOrScreening as unknown as { segmentCode: string }).segmentCode;
    setQueue(prev => {
      if (prev.some(item => item.segmentCode === code)) {
        showToast(`Segment ${code} is already in the inspection queue.`);
        return prev;
      }
      const newItem: InspectionQueueItem = {
        id: `queue-${Date.now()}`,
        segmentId: 'id' in segmentOrScreening ? segmentOrScreening.id : `seg-${code}`,
        segmentCode: code,
        roadName: 'name' in segmentOrScreening ? segmentOrScreening.name : segmentOrScreening.roadName,
        corridor: 'corridor' in segmentOrScreening ? segmentOrScreening.corridor : segmentOrScreening.aoiName,
        urgencyScore: ('priorityScore' in segmentOrScreening && typeof segmentOrScreening.priorityScore === 'number') ? segmentOrScreening.priorityScore : 2.5,
        status: 'status' in segmentOrScreening ? segmentOrScreening.status : 'Watch',
        priorityRank: ('urgencyRank' in segmentOrScreening && typeof segmentOrScreening.urgencyRank === 'number') 
          ? segmentOrScreening.urgencyRank 
          : ('rank' in segmentOrScreening && typeof segmentOrScreening.rank === 'number' ? segmentOrScreening.rank : 1),
        detectedDefect: 'primaryDefect' in segmentOrScreening ? segmentOrScreening.primaryDefect : 'Thermal Fatigue Micro-Cracking',
        spectralConfidence: 85,
        assignedCrew: 'Inspection Unit Alpha',
        scheduledDate: '2026-09-02',
        workStatus: 'Pending Dispatch',
        estimatedFieldHours: 3.5,
        coordinates: 'coordinates' in segmentOrScreening ? segmentOrScreening.coordinates : { lat: 24.842, lng: 55.331 },
        screeningPriority: 'screeningPriority' in segmentOrScreening ? segmentOrScreening.screeningPriority : 'HIGHER PRIORITY',
        supportQuality: 'supportQuality' in segmentOrScreening ? segmentOrScreening.supportQuality : 'HIGH SUPPORT',
        whyFlagged: 'whyFlagged' in segmentOrScreening ? segmentOrScreening.whyFlagged : 'Thermal anomaly flagged for field validation',
        priorityScore: 'priorityScore' in segmentOrScreening ? segmentOrScreening.priorityScore : 2.5
      };
      showToast(`Segment ${code} added to inspection queue.`);
      return [newItem, ...prev];
    });
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

  // Navigation handler
  const handleNavigateTab = (tab: NavTab) => {
    setLegacyMode(null);
    // Alias normalizations
    if (tab === 'dashboard') setCurrentTab('overview');
    else if (tab === 'results') setCurrentTab('queue');
    else setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Legacy mode handler for preserving existing background views
  const handleNavigateLegacy = (mode: DeliverableMode) => {
    if (mode === 'wireframes' || mode === 'v2' || mode === 'commercial') {
      setLegacyMode(mode);
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
        {/* Legacy Mode Overrides */}
        {legacyMode === 'v2' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold text-[#0D3B45]">
                Viewing: Dashboard V2 (Predictive Simulation & Thermal Stress)
              </span>
              <button
                onClick={() => setLegacyMode(null)}
                className="text-xs font-bold text-[#2E6F6E] hover:underline cursor-pointer"
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
                className="text-xs font-bold text-[#2E6F6E] hover:underline cursor-pointer"
              >
                ← Back to Primary Dashboard
              </button>
            </div>
            <WireframeView
              onSwitchToV1={() => handleNavigateTab('overview')}
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
                className="text-xs font-bold text-[#2E6F6E] hover:underline cursor-pointer"
              >
                ← Back to Primary Dashboard
              </button>
            </div>
            <MarketResearchView />
          </div>
        )}

        {/* 8 Primary Sections according to Information Architecture */}
        {!legacyMode && (
          <>
            {/* 1. Overview */}
            {(currentTab === 'overview' || currentTab === 'dashboard') && (
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
                onDispatchInspection={handleDispatchCrew}
                onAddToQueue={handleAddToQueue}
              />
            )}

            {/* 3. Thermal Screening */}
            {currentTab === 'thermal' && (
              <ThermalScreeningView
                onSelectSegment={handleSelectScreeningSegment}
                onDispatchInspection={handleDispatchCrew}
              />
            )}

            {/* 4. Multispectral Context */}
            {currentTab === 'multispectral' && (
              <MultispectralView />
            )}

            {/* 5. Inspection Queue */}
            {(currentTab === 'queue' || currentTab === 'results') && (
              <ResultsQueueView
                onSelectSegment={handleSelectScreeningSegment}
                onDispatchCrew={handleDispatchCrew}
                onGenerateWorkOrder={handleOpenWorkOrder}
                queue={queue}
              />
            )}

            {/* 6. Evidence */}
            {currentTab === 'evidence' && (
              <EnvironmentalEvidenceView />
            )}

            {/* 7. Method */}
            {currentTab === 'method' && (
              <ValidationRoadmapView />
            )}

            {/* 8. About */}
            {currentTab === 'about' && (
              <AboutView />
            )}
          </>
        )}
      </main>

      {/* Mobile Floating Bottom Navigation Bar (5 core shortcuts for small screens) */}
      <div className="xl:hidden fixed bottom-3 left-4 right-4 z-40 bg-white/95 backdrop-blur-lg border border-slate-200/90 rounded-3xl shadow-xl px-3 py-2 flex items-center justify-around text-[10px] font-bold text-slate-500">
        <button
          onClick={() => handleNavigateTab('overview')}
          className={`flex flex-col items-center gap-1 p-1 transition-colors cursor-pointer ${
            (currentTab === 'overview' || currentTab === 'dashboard') && !legacyMode ? 'text-[#0D3B45]' : 'hover:text-slate-800'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => handleNavigateTab('study-areas')}
          className={`flex flex-col items-center gap-1 p-1 transition-colors cursor-pointer ${
            currentTab === 'study-areas' && !legacyMode ? 'text-[#0D3B45]' : 'hover:text-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Areas</span>
        </button>

        <button
          onClick={() => handleNavigateTab('thermal')}
          className={`flex flex-col items-center gap-1 p-1 transition-colors cursor-pointer ${
            currentTab === 'thermal' && !legacyMode ? 'text-[#0D3B45]' : 'hover:text-slate-800'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Thermal</span>
        </button>

        <button
          onClick={() => handleNavigateTab('queue')}
          className={`flex flex-col items-center gap-1 p-1 transition-colors relative cursor-pointer ${
            (currentTab === 'queue' || currentTab === 'results') && !legacyMode ? 'text-[#0D3B45]' : 'hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Queue</span>
        </button>

        <button
          onClick={() => handleNavigateTab('about')}
          className={`flex flex-col items-center gap-1 p-1 transition-colors cursor-pointer ${
            currentTab === 'about' && !legacyMode ? 'text-[#0D3B45]' : 'hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>About</span>
        </button>
      </div>

      {/* Quiet iOS-Style Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-5 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-white p-0.5 border border-slate-200/80 flex items-center justify-center shrink-0">
              <img 
                src="/assets/aistudio/image_724da27a.png" 
                alt="THABAT Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-extrabold text-[#0D3B45]">THABAT Platform</span>
            <span>·</span>
            <span className="hidden sm:inline font-medium">AI-POWERED ROAD RESILIENCE</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-[#2E6F6E] font-medium">Landsat 9 & Sentinel-2 Verified</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
            <button 
              onClick={() => setIsFeasibilityOpen(true)}
              className="hover:text-[#0D3B45] transition-colors cursor-pointer"
            >
              Feasibility Gate
            </button>
            <button 
              onClick={() => setIsPitchOpen(true)}
              className="hover:text-[#0D3B45] transition-colors text-[#0D3B45] font-bold cursor-pointer"
            >
              Competition Pitch
            </button>
            <a 
              href="https://github.com/DanaAlhammadi/Arab-Youth-Space-Hackathon-2026-813-Challenge"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0D3B45] transition-colors text-[#2E6F6E] font-semibold cursor-pointer"
            >
              GitHub Repository
            </a>
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

      {/* Floating Action Confirmation Toast */}
      {toastMessage && (
        <div className="fixed bottom-16 xl:bottom-6 right-6 z-50 bg-white border border-slate-200 text-[#0D3B45] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
