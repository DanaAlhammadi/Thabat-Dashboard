export type SegmentStatus = 'Normal' | 'Watch' | 'Inspect' | 'High Priority';

export type ScreeningPriority = 'Higher Priority' | 'Moderate' | 'Lower Priority';
export type SupportQuality = 'High support' | 'Moderate support' | 'LOW SUPPORT' | 'Not yet validated';

export type DefectType = 
  | 'Subsurface Moisture Ingress'
  | 'Bitumen Binder Oxidation'
  | 'Subgrade Void & Settlement'
  | 'Aggregate Stripping'
  | 'Thermal Fatigue Micro-Cracking'
  | 'None (Optimal)';

export interface SpectralPoint {
  wavelength: number; // in nanometers (nm), e.g. 400 to 2450 nm
  baselineReflectance: number; // 0 to 1
  currentReflectance: number; // 0 to 1
  flaggedAnomaly?: boolean;
  featureLabel?: string;
}

export interface TrendPoint {
  month: string;
  thabatScore: number;
  projectedWithoutIntervention?: number;
  projectedWithIntervention?: number;
}

// Official Screening Segment for AOI-A and AOI-B
export interface ScreeningSegment {
  id: string; // e.g. 'A-005', 'B-002'
  code: string; // e.g. 'A-005'
  aoiId: 'AOI-A' | 'AOI-B';
  aoiName: string; // 'Saih Al Salam Street / D42' or 'Fujairah Road Study Area'
  roadName: string;
  medianLST: number; // °C
  tempRange: number; // °C
  validPixels: number; // count of valid thermal pixels
  screeningPriority: ScreeningPriority;
  supportQuality: SupportQuality;
  explanation: string;
  limitations: string;
  sentinelEvidence: string;
  recommendedAction: string;
  rank: number;
  coordinates: {
    lat: number;
    lng: number;
    path: Array<[number, number]>;
  };
}

export interface RoadSegment {
  id: string;
  code: string;
  name: string;
  corridor: string;
  district: string;
  lengthKm: number;
  lanes: number;
  pavementType: 'Stone Mastic Asphalt' | 'Dense Bituminous Macadam' | 'Polymer Modified Asphalt';
  status: SegmentStatus;
  thabatScore: number; // 0 to 100
  previousScore: number;
  primaryDefect: DefectType;
  defectDepthCm: number;
  urgencyRank: number; // 1 = highest
  lastScanDate: string;
  revisitCycleDays: number;
  coordinates: {
    lat: number;
    lng: number;
    path: Array<[number, number]>;
  };
  scoreBreakdown: {
    bitumenHealth: number; // 0-100
    subgradeMoistureIndex: number; // 0-100
    voidSusceptibility: number; // 0-100
    structuralFatigueIndex: number; // 0-100
  };
  recommendation: {
    action: string;
    interventionWindowDays: number;
    estimatedCostUsd: number;
    preventedFailureCostUsd: number;
    rationale: string;
    spectralSignatures: string[];
  };
  spectralData: SpectralPoint[];
  historicalTrend: TrendPoint[];
  inspectorNotes?: string;
  assignedCrew?: string;
  inspectionScheduled?: string;
  // Screening metadata link
  medianLST?: number;
  tempRange?: number;
  validPixels?: number;
  screeningPriority?: ScreeningPriority;
  supportQuality?: SupportQuality;
}

export interface InspectionQueueItem {
  id: string;
  segmentId: string;
  segmentCode: string;
  roadName: string;
  corridor: string;
  urgencyScore: number; // 0 - 100
  status: SegmentStatus;
  priorityRank: number;
  detectedDefect: DefectType;
  spectralConfidence: number;
  assignedCrew: string;
  scheduledDate: string;
  workStatus: 'Pending Dispatch' | 'In Transit' | 'Field Validating' | 'Inspected & Confirmed' | 'Maintenance Scheduled';
  estimatedFieldHours: number;
  coordinates: { lat: number; lng: number };
  screeningPriority?: ScreeningPriority;
  supportQuality?: SupportQuality;
  explanation?: string;
}

export interface CompetitorComparison {
  name: string;
  method: string;
  costPerKm: number;
  detectionDepth: string;
  turnaroundTime: string;
  trafficDisruption: string;
  subsurfaceSensing: boolean;
  accuracy: string;
}

export interface CustomerPersona {
  role: string;
  organizationType: string;
  primaryPainPoint: string;
  thabatValueProp: string;
  quote: string;
  budgetCycle: string;
}

export type NavTab = 
  | 'dashboard' 
  | 'study-areas' 
  | 'segments' 
  | 'thermal' 
  | 'evidence' 
  | 'results' 
  | 'about';

// Keep DeliverableMode backward compatible with previous views
export type DeliverableMode = NavTab | 'wireframes' | 'v1' | 'v2' | 'queue' | 'commercial';
