export type SegmentStatus = 'Normal' | 'Watch' | 'Inspect' | 'High Priority';

export type ScreeningPriority = 'HIGHER PRIORITY' | 'MODERATE' | 'LOWER PRIORITY' | 'Higher Priority' | 'Moderate' | 'Lower Priority';
export type SupportQuality = 'HIGH SUPPORT' | 'LOW SUPPORT' | 'High support' | 'Moderate support' | 'LOW SUPPORT' | 'Not yet validated';

export type DefectType = 
  | 'Subsurface Moisture Ingress'
  | 'Bitumen Binder Oxidation'
  | 'Subgrade Void & Settlement'
  | 'Aggregate Stripping'
  | 'Thermal Fatigue Micro-Cracking'
  | 'None (Optimal)';

export interface SpectralPoint {
  wavelength: number;
  baselineReflectance: number;
  currentReflectance: number;
  flaggedAnomaly?: boolean;
  featureLabel?: string;
}

export interface TrendPoint {
  month: string;
  thabatScore: number;
  projectedWithoutIntervention?: number;
  projectedWithIntervention?: number;
}

// Official Screening Segment for AOI-A and AOI-B based on uploaded CSVs
export interface ScreeningSegment {
  id: string; // e.g. 'A-005', 'B-002'
  code: string; // e.g. 'A-005'
  aoiId: 'AOI-A' | 'AOI-B';
  aoiName: string; // 'Saih Al Salam Street / D42' or 'Fujairah study area'
  roadName: string;
  // Raw CSV values
  tMin: number;
  tMedian: number;
  tMax: number;
  tRange: number;
  validPixelCount: number;
  zMedian: number;
  zRange: number;
  positiveThermalAnomaly: number;
  spreadAnomaly: number;
  priorityScore: number;
  supportFlag: 'HIGH SUPPORT' | 'LOW SUPPORT';
  screeningFlag: 'HIGHER PRIORITY' | 'MODERATE' | 'LOWER PRIORITY';
  // Explanations
  whyFlagged: string;
  recommendedAction: string;
  scientificNote: string;
  // Aliases for compatibility
  medianLST: number;
  tempRange: number;
  validPixels: number;
  screeningPriority: ScreeningPriority;
  supportQuality: SupportQuality;
  explanation: string;
  limitations: string;
  sentinelEvidence: string;
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
  thabatScore: number;
  previousScore: number;
  primaryDefect: DefectType;
  defectDepthCm: number;
  urgencyRank: number;
  lastScanDate: string;
  revisitCycleDays: number;
  coordinates: {
    lat: number;
    lng: number;
    path: Array<[number, number]>;
  };
  scoreBreakdown: {
    bitumenHealth: number;
    subgradeMoistureIndex: number;
    voidSusceptibility: number;
    structuralFatigueIndex: number;
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
  whyFlagged?: string;
  priorityScore?: number;
}

export interface InspectionQueueItem {
  id: string;
  segmentId: string;
  segmentCode: string;
  roadName: string;
  corridor: string;
  urgencyScore: number;
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
  whyFlagged?: string;
  priorityScore?: number;
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

// 8 Primary Sections according to Information Architecture
export type NavTab = 
  | 'overview'
  | 'study-areas' 
  | 'thermal'
  | 'multispectral'
  | 'queue'
  | 'evidence' 
  | 'method'
  | 'about'
  // Legacy aliases for backward compatibility
  | 'dashboard'
  | 'segments'
  | 'results';

// Keep DeliverableMode backward compatible with previous views
export type DeliverableMode = NavTab | 'wireframes' | 'v1' | 'v2' | 'commercial';
