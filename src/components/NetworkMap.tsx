import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import { RoadSegment, SegmentStatus, ScreeningSegment } from '../types';
import { 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  MapPin, 
  Flame, 
  ShieldCheck, 
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Maximize2,
  Minimize2,
  Eye,
  Info,
  X,
  PlusCircle,
  CheckCircle2,
  Compass,
  FileCode,
  Database
} from 'lucide-react';
import { AOI_A_SEGMENTS, AOI_B_SEGMENTS, ALL_SCREENING_SEGMENTS } from '../data/mockData';
import { 
  AOI_A_GEOJSON, 
  AOI_B_GEOJSON, 
  AOI_A_BOUNDARY_POLYGON, 
  AOI_B_BOUNDARY_POLYGON,
  AOI_CONFIGS,
  GeoJSONFeature
} from '../data/geojsonData';

interface NetworkMapProps {
  segments?: RoadSegment[];
  selectedSegment?: RoadSegment | null;
  onSelectSegment?: (segment: RoadSegment) => void;
  statusFilter?: SegmentStatus | 'All';
  isV2?: boolean;
  initialAOI?: 'AOI-A' | 'AOI-B';
  onDispatchInspection?: (segment: RoadSegment) => void;
  onAddToQueue?: (segment: RoadSegment | ScreeningSegment) => void;
}

export const NetworkMap: React.FC<NetworkMapProps> = ({
  segments = [],
  selectedSegment = null,
  onSelectSegment,
  statusFilter = 'All',
  isV2 = false,
  initialAOI = 'AOI-A',
  onDispatchInspection,
  onAddToQueue
}) => {
  const [activeAOI, setActiveAOI] = useState<'AOI-A' | 'AOI-B'>(initialAOI);
  const [activeSegmentCode, setActiveSegmentCode] = useState<string | null>(
    selectedSegment ? selectedSegment.code : 'A-005'
  );
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [currentZoom, setCurrentZoom] = useState<number>(13);
  const [queuedCodes, setQueuedCodes] = useState<Set<string>>(new Set());
  const [queueFeedback, setQueueFeedback] = useState<string | null>(null);

  // Layer Toggles (which actually work!)
  const [showRoadSegments, setShowRoadSegments] = useState<boolean>(true);
  const [showBoundary, setShowBoundary] = useState<boolean>(true);
  const [usePriorityColoring, setUsePriorityColoring] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showThermalContext, setShowThermalContext] = useState<boolean>(false);
  const [showSentinelContext, setShowSentinelContext] = useState<boolean>(false);

  // Leaflet map refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const roadsGroupRef = useRef<L.LayerGroup | null>(null);
  const boundaryGroupRef = useRef<L.LayerGroup | null>(null);
  const labelsGroupRef = useRef<L.LayerGroup | null>(null);
  const thermalGroupRef = useRef<L.LayerGroup | null>(null);

  // Sync with selectedSegment prop if provided from parent
  useEffect(() => {
    if (selectedSegment) {
      setActiveSegmentCode(selectedSegment.code);
      if (selectedSegment.code.startsWith('B-') && activeAOI !== 'AOI-B') {
        setActiveAOI('AOI-B');
      } else if (selectedSegment.code.startsWith('A-') && activeAOI !== 'AOI-A') {
        setActiveAOI('AOI-A');
      }
    }
  }, [selectedSegment]);

  // Current AOI segments from CSV-backed mock data
  const currentAOIScreeningSegments = activeAOI === 'AOI-A' ? AOI_A_SEGMENTS : AOI_B_SEGMENTS;
  const currentGeoJSON = activeAOI === 'AOI-A' ? AOI_A_GEOJSON : AOI_B_GEOJSON;
  const aoiConfig = AOI_CONFIGS[activeAOI];

  // Currently focused segment detail looked up directly from CSV-backed data
  const currentFocusedSegment = useMemo(() => {
    if (!activeSegmentCode) return null;
    return currentAOIScreeningSegments.find(s => s.code === activeSegmentCode) || 
           ALL_SCREENING_SEGMENTS.find(s => s.code === activeSegmentCode) || null;
  }, [activeSegmentCode, currentAOIScreeningSegments]);

  // Find corresponding full RoadSegment from segments list
  const findFullSegment = (code: string): RoadSegment | undefined => {
    const found = segments.find(s => s.code === code);
    if (found) return found;

    // Generate fallback RoadSegment from screening segment
    const screening = ALL_SCREENING_SEGMENTS.find(s => s.code === code);
    if (!screening) return undefined;

    return {
      id: `seg-${screening.code}`,
      code: screening.code,
      name: screening.roadName,
      corridor: screening.aoiName,
      district: screening.aoiId,
      lengthKm: 2.0,
      lanes: 4,
      pavementType: 'Stone Mastic Asphalt',
      status: screening.screeningFlag === 'HIGHER PRIORITY' ? 'High Priority' : 'Watch',
      thabatScore: screening.screeningFlag === 'HIGHER PRIORITY' ? 55 : 80,
      previousScore: 68,
      primaryDefect: 'Thermal Fatigue Micro-Cracking',
      defectDepthCm: 2.5,
      urgencyRank: screening.rank,
      lastScanDate: '2026-08-31',
      revisitCycleDays: 14,
      coordinates: screening.coordinates,
      medianLST: screening.tMedian,
      tempRange: screening.tRange,
      validPixels: screening.validPixelCount,
      screeningPriority: screening.screeningFlag,
      supportQuality: screening.supportFlag,
      whyFlagged: screening.whyFlagged,
      priorityScore: screening.priorityScore,
      scoreBreakdown: {
        bitumenHealth: 70,
        subgradeMoistureIndex: 35,
        voidSusceptibility: 40,
        structuralFatigueIndex: 50
      },
      recommendation: {
        action: screening.recommendedAction,
        interventionWindowDays: 21,
        estimatedCostUsd: 12000,
        preventedFailureCostUsd: 90000,
        rationale: screening.whyFlagged,
        spectralSignatures: [
          `Median surface temp: ${screening.tMedian.toFixed(2)} °C`,
          `Valid pixel sample: ${screening.validPixelCount} pixels`
        ]
      },
      spectralData: [],
      historicalTrend: [{ month: 'Aug 26', thabatScore: 70 }]
    };
  };

  // Color logic according to exact THABAT requirements
  const getSegmentColor = (screeningFlag: string, supportFlag: string, usePriority: boolean) => {
    if (!usePriority) {
      return '#0D3B45'; // default brand Deep Teal
    }
    if (screeningFlag === 'HIGHER PRIORITY') {
      return '#D97706'; // warm amber / orange accent (NOT neon red)
    }
    if (screeningFlag === 'MODERATE') {
      return '#D4B483'; // sand / muted gold
    }
    // LOWER PRIORITY
    return '#2E6F6E'; // teal / muted green-blue
  };

  // 1. Initialize Leaflet Map with 100% public OpenStreetMap tiles (ZERO API KEY REQUIRED)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Leaflet instance
    const map = L.map(mapContainerRef.current, {
      center: aoiConfig.center,
      zoom: aoiConfig.defaultZoom,
      zoomControl: false, // custom iOS controls
      attributionControl: true
    });

    // 100% Free Public Basemap: Standard OpenStreetMap over HTTPS with custom light CSS styling
    // Absolutely NO API key required, NO tokens, NO watermarks, NO "API KEY REQUIRED" errors
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      className: 'thabat-clean-tiles'
    }).addTo(map);

    // Add scale bar
    L.control.scale({
      imperial: false,
      metric: true,
      position: 'bottomleft'
    }).addTo(map);

    // Track zoom level for dynamic labels
    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom());
    });

    // Layer Groups
    const boundaryGroup = L.layerGroup().addTo(map);
    const roadsGroup = L.layerGroup().addTo(map);
    const thermalGroup = L.layerGroup().addTo(map);
    const labelsGroup = L.layerGroup().addTo(map);

    boundaryGroupRef.current = boundaryGroup;
    roadsGroupRef.current = roadsGroup;
    thermalGroupRef.current = thermalGroup;
    labelsGroupRef.current = labelsGroup;
    mapInstanceRef.current = map;

    // Resize invalidation
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Invalidate map size whenever panel opens/closes or fullscreen toggles
  useEffect(() => {
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [activeSegmentCode, isFullscreen]);

  // 2. Fly to active AOI when AOI changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const config = AOI_CONFIGS[activeAOI];
    map.flyTo(config.center, config.defaultZoom, {
      duration: 1.0,
      easeLinearity: 0.25
    });

    // Set first segment of the AOI as active if current doesn't match
    if (activeAOI === 'AOI-A' && activeSegmentCode?.startsWith('B-')) {
      setActiveSegmentCode('A-005');
    } else if (activeAOI === 'AOI-B' && activeSegmentCode?.startsWith('A-')) {
      setActiveSegmentCode('B-002');
    }
  }, [activeAOI]);

  // 3. Render Layers whenever state / toggles / active segment changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const boundaryGroup = boundaryGroupRef.current;
    const roadsGroup = roadsGroupRef.current;
    const thermalGroup = thermalGroupRef.current;
    const labelsGroup = labelsGroupRef.current;

    if (!boundaryGroup || !roadsGroup || !thermalGroup || !labelsGroup) return;

    // Clear previous layers
    boundaryGroup.clearLayers();
    roadsGroup.clearLayers();
    thermalGroup.clearLayers();
    labelsGroup.clearLayers();

    // -------------------------------------------------------------
    // A. AOI BOUNDARY POLYGON (Subtle dashed line)
    // -------------------------------------------------------------
    if (showBoundary) {
      const boundaryCoords = activeAOI === 'AOI-A' 
        ? AOI_A_BOUNDARY_POLYGON 
        : AOI_B_BOUNDARY_POLYGON;

      const boundaryColor = activeAOI === 'AOI-A' ? '#0D3B45' : '#2E6F6E';

      const boundaryPolygon = L.polygon(boundaryCoords, {
        color: boundaryColor,
        weight: 1.5,
        dashArray: '6, 6',
        dashOffset: '0',
        fillColor: boundaryColor,
        fillOpacity: 0.04,
        interactive: false
      });
      boundaryPolygon.addTo(boundaryGroup);

      // Boundary Label Badge
      const firstCoord = boundaryCoords[0];
      const boundaryLabelIcon = L.divIcon({
        className: 'custom-boundary-tag',
        html: `
          <div style="
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(4px);
            border: 1px dashed ${boundaryColor};
            color: ${boundaryColor};
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 6px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.06);
            white-space: nowrap;
          ">
            ${activeAOI} BOUNDARY · ${activeAOI === 'AOI-A' ? 'SAIH AL SALAM (D42)' : 'FUJAIRAH STUDY AREA'}
          </div>
        `,
        iconSize: [180, 20],
        iconAnchor: [90, 10]
      });
      L.marker(firstCoord, { icon: boundaryLabelIcon, interactive: false }).addTo(boundaryGroup);
    }

    // -------------------------------------------------------------
    // B. THERMAL CONTEXT OVERLAY (AOI-A ONLY)
    // -------------------------------------------------------------
    if (showThermalContext && activeAOI === 'AOI-A') {
      // Landsat 9 thermal spectrum corridor buffer
      AOI_A_GEOJSON.features.forEach((feature) => {
        const latlngs: [number, number][] = feature.geometry.coordinates.map(c => [c[1], c[0]]);
        const isHigher = feature.properties.screening_flag === 'HIGHER PRIORITY';
        
        // Thermal heat halo
        const thermalGlow = L.polyline(latlngs, {
          color: isHigher ? '#F59E0B' : '#0D3B45',
          weight: 22,
          opacity: 0.25,
          lineCap: 'round',
          interactive: false
        });
        thermalGlow.addTo(thermalGroup);
      });
    }

    // -------------------------------------------------------------
    // C. ROAD SEGMENTS (GeoJSON Authoritative Geometries)
    // -------------------------------------------------------------
    if (showRoadSegments) {
      currentGeoJSON.features.forEach((feature: GeoJSONFeature) => {
        const segId = feature.properties.segment_id;
        const latlngs: [number, number][] = feature.geometry.coordinates.map(c => [c[1], c[0]]);
        const isSelected = activeSegmentCode === segId;
        const isHovered = hoveredCode === segId;
        const hasSelection = activeSegmentCode !== null;

        // Dim non-selected segments when a segment is selected
        const baseOpacity = isSelected 
          ? 1.0 
          : hasSelection 
            ? 0.35 
            : (feature.properties.support_flag === 'LOW SUPPORT' ? 0.75 : 0.9);

        const strokeColor = getSegmentColor(
          feature.properties.screening_flag,
          feature.properties.support_flag,
          usePriorityColoring
        );

        const isLowSupport = feature.properties.support_flag === 'LOW SUPPORT';

        // 1. Halo / Outline underneath selected segment
        if (isSelected) {
          const halo = L.polyline(latlngs, {
            color: '#FFFFFF',
            weight: 14,
            opacity: 0.9,
            lineCap: 'round',
            lineJoin: 'round',
            interactive: false
          });
          halo.addTo(roadsGroup);

          const outerGlow = L.polyline(latlngs, {
            color: strokeColor,
            weight: 18,
            opacity: 0.35,
            lineCap: 'round',
            lineJoin: 'round',
            interactive: false
          });
          outerGlow.addTo(roadsGroup);
        }

        // 2. Base road casing (Apple Maps crisp style)
        const roadCasing = L.polyline(latlngs, {
          color: '#FFFFFF',
          weight: isSelected ? 10 : isHovered ? 9 : 7.5,
          opacity: isSelected ? 1 : 0.85,
          lineCap: 'round',
          lineJoin: 'round',
          interactive: false
        });
        roadCasing.addTo(roadsGroup);

        // 3. Primary Colored Road Segment
        const roadLine = L.polyline(latlngs, {
          color: strokeColor,
          weight: isSelected ? 8 : isHovered ? 7 : (feature.properties.screening_flag === 'HIGHER PRIORITY' ? 6 : 5),
          opacity: baseOpacity,
          dashArray: isLowSupport ? '6, 6' : undefined,
          lineCap: 'round',
          lineJoin: 'round'
        });

        // Hover & Click interactions
        roadLine.on('mouseover', () => {
          setHoveredCode(segId);
          roadLine.setStyle({
            weight: isSelected ? 9 : 8,
            opacity: 1
          });
        });

        roadLine.on('mouseout', () => {
          setHoveredCode(null);
          roadLine.setStyle({
            weight: isSelected ? 8 : (feature.properties.screening_flag === 'HIGHER PRIORITY' ? 6 : 5),
            opacity: baseOpacity
          });
        });

        roadLine.on('click', () => {
          setActiveSegmentCode(segId);
          const full = findFullSegment(segId);
          if (full && onSelectSegment) {
            onSelectSegment(full);
          }
        });

        roadLine.addTo(roadsGroup);

        // -------------------------------------------------------------
        // D. ROAD LABELS (iOS Pill Badges at midpoint)
        // -------------------------------------------------------------
        if (showLabels && (currentZoom >= 12 || isSelected)) {
          // Midpoint calculation
          const midIndex = Math.floor(latlngs.length / 2);
          const midCoord = latlngs[midIndex] || latlngs[0];

          const isHigher = feature.properties.screening_flag === 'HIGHER PRIORITY';
          const isModerate = feature.properties.screening_flag === 'MODERATE';

          const badgeBg = isSelected 
            ? '#0D3B45' 
            : isHigher 
              ? '#FFFBEB' 
              : isModerate 
                ? '#FDF8F0' 
                : '#FFFFFF';

          const badgeTextColor = isSelected 
            ? '#FFFFFF' 
            : isHigher 
              ? '#B45309' 
              : isModerate 
                ? '#92400E' 
                : '#0D3B45';

          const badgeBorderColor = isSelected 
            ? '#0D3B45' 
            : isHigher 
              ? '#D97706' 
              : isModerate 
                ? '#D4B483' 
                : '#CBD5E1';

          const labelIcon = L.divIcon({
            className: 'custom-segment-tag',
            html: `
              <div style="
                background: ${badgeBg};
                color: ${badgeTextColor};
                border: 1.5px solid ${badgeBorderColor};
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                font-weight: 700;
                padding: 2px 7px;
                border-radius: 9999px;
                box-shadow: 0 2px 8px rgba(13, 59, 69, 0.12);
                display: flex;
                align-items: center;
                gap: 4px;
                cursor: pointer;
                transition: transform 0.15s ease;
                transform: ${isSelected ? 'scale(1.1)' : 'scale(1)'};
                white-space: nowrap;
              ">
                <span style="width: 6px; height: 6px; border-radius: 9999px; background: ${strokeColor};"></span>
                <span>${segId}</span>
                <span style="opacity: 0.7; font-size: 10px;">${feature.properties.t_median.toFixed(1)}°C</span>
              </div>
            `,
            iconSize: [80, 22],
            iconAnchor: [40, 11]
          });

          const marker = L.marker(midCoord, { icon: labelIcon });
          marker.on('click', () => {
            setActiveSegmentCode(segId);
            const full = findFullSegment(segId);
            if (full && onSelectSegment) {
              onSelectSegment(full);
            }
          });
          marker.addTo(labelsGroup);
        }
      });
    }

  }, [
    activeAOI, 
    activeSegmentCode, 
    hoveredCode, 
    showRoadSegments, 
    showBoundary, 
    usePriorityColoring, 
    showLabels, 
    showThermalContext, 
    currentZoom
  ]);

  // Handle Fit AOI
  const handleFitAOI = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const config = AOI_CONFIGS[activeAOI];
    map.flyTo(config.center, config.defaultZoom, {
      duration: 0.8
    });
  };

  // Handle Reset View (centers on default and resets zoom)
  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const config = AOI_CONFIGS[activeAOI];
    map.setView(config.center, config.defaultZoom);
  };

  // Handle Zoom In / Out
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  // Handle adding segment to inspection queue
  const handleAddToInspectionQueue = (code: string) => {
    setQueuedCodes(prev => new Set(prev).add(code));
    setQueueFeedback(`Segment ${code} added to inspection queue.`);
    setTimeout(() => {
      setQueueFeedback(null);
    }, 3500);

    const full = findFullSegment(code);
    if (full) {
      if (onAddToQueue) {
        onAddToQueue(full);
      } else if (onDispatchInspection) {
        onDispatchInspection(full);
      }
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,59,69,0.06)] overflow-hidden flex flex-col transition-all duration-300 ${
      isFullscreen ? 'fixed inset-4 z-50 shadow-2xl' : 'relative'
    }`}>
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP TOOLBAR — Modern Clean iOS Navigation */}
      {/* ------------------------------------------------------------- */}
      <div className="px-4 sm:px-6 py-3.5 bg-white border-b border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs z-20">
        {/* Left: Study Area Indicator (Clean Location Header — No Filenames) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0D3B45] text-white flex items-center justify-center font-bold shadow-xs">
              <MapPin className="w-4 h-4 text-[#D4B483]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#0D3B45] text-sm sm:text-base">
                  {activeAOI === 'AOI-A' 
                    ? 'AOI-A · Saih Al Salam Street / D42' 
                    : 'AOI-B · Fujairah Study Area'}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeAOI === 'AOI-A'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {aoiConfig.supportQuality}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono hidden sm:block">
                {activeAOI === 'AOI-A' 
                  ? 'Landsat 9 Thermal L2 · 31 Aug 2026 · 88–91 px/segment' 
                  : 'ArcGIS Pro Zonal Extraction · 2–3 px/segment (Preliminary)'}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Polished AOI-A | AOI-B Segmented Switcher */}
        <div className="ios-segmented shadow-xs">
          <button
            onClick={() => setActiveAOI('AOI-A')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeAOI === 'AOI-A'
                ? 'bg-white text-[#0D3B45] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>AOI-A</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 text-[#0D3B45]">5</span>
          </button>
          <button
            onClick={() => setActiveAOI('AOI-B')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeAOI === 'AOI-B'
                ? 'bg-white text-[#0D3B45] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>AOI-B</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 text-[#0D3B45]">4</span>
          </button>
        </div>

        {/* Right: Map Action Controls (All Fully Functional) */}
        <div className="flex items-center gap-1.5 text-slate-600">
          {/* Overlays / Layers Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsLayersOpen(!isLayersOpen)}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                isLayersOpen || showThermalContext || showSentinelContext
                  ? 'bg-[#0D3B45] text-white border-[#0D3B45]'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200/80'
              }`}
              title="Toggle Map Overlays"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Overlays</span>
            </button>

            {/* Overlays Popover Panel */}
            {isLayersOpen && (
              <div className="absolute right-0 top-10 w-64 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-3.5 z-30 space-y-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 text-xs font-bold text-[#0D3B45]">
                  <span>Active Map Overlays</span>
                  <button 
                    onClick={() => setIsLayersOpen(false)}
                    className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50">
                    <input 
                      type="checkbox" 
                      checked={showRoadSegments}
                      onChange={(e) => setShowRoadSegments(e.target.checked)}
                      className="rounded text-[#0D3B45] focus:ring-[#0D3B45]" 
                    />
                    <span>Road Segments</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50">
                    <input 
                      type="checkbox" 
                      checked={showBoundary}
                      onChange={(e) => setShowBoundary(e.target.checked)}
                      className="rounded text-[#0D3B45] focus:ring-[#0D3B45]" 
                    />
                    <span>AOI Boundary</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50">
                    <input 
                      type="checkbox" 
                      checked={usePriorityColoring}
                      onChange={(e) => setUsePriorityColoring(e.target.checked)}
                      className="rounded text-[#0D3B45] focus:ring-[#0D3B45]" 
                    />
                    <span>Priority Coloring</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50">
                    <input 
                      type="checkbox" 
                      checked={showLabels}
                      onChange={(e) => setShowLabels(e.target.checked)}
                      className="rounded text-[#0D3B45] focus:ring-[#0D3B45]" 
                    />
                    <span>Segment Labels</span>
                  </label>

                  <div className="pt-1.5 border-t border-slate-100">
                    <label className={`flex items-center gap-2 cursor-pointer p-1.5 rounded-lg ${
                      activeAOI === 'AOI-A' ? 'hover:bg-amber-50/50' : 'opacity-60 cursor-not-allowed'
                    }`}>
                      <input 
                        type="checkbox" 
                        checked={showThermalContext && activeAOI === 'AOI-A'}
                        disabled={activeAOI !== 'AOI-A'}
                        onChange={(e) => setShowThermalContext(e.target.checked)}
                        className="rounded text-amber-600 focus:ring-amber-600" 
                      />
                      <span className="font-semibold text-amber-900 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-600" />
                        <span>Thermal Context (AOI-A only)</span>
                      </span>
                    </label>
                    {activeAOI === 'AOI-B' && (
                      <p className="text-[10px] text-amber-800/80 pl-6 leading-tight">
                        Landsat thermal raster does NOT cover AOI-B.
                      </p>
                    )}
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-sky-50/50">
                    <input 
                      type="checkbox" 
                      checked={showSentinelContext}
                      onChange={(e) => setShowSentinelContext(e.target.checked)}
                      className="rounded text-sky-600 focus:ring-sky-600" 
                    />
                    <span className="font-semibold text-sky-900 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-sky-600" />
                      <span>Sentinel-2 Multispectral</span>
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* FIT AOI Button */}
          <button
            onClick={handleFitAOI}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
            title="Fit to AOI Bounds"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">FIT AOI</span>
          </button>

          {/* RESET VIEW Button */}
          <button
            onClick={handleResetView}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors cursor-pointer hidden md:inline-block"
            title="Reset Map Center"
          >
            RESET
          </button>

          {/* Zoom Buttons */}
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              setTimeout(() => {
                mapInstanceRef.current?.invalidateSize();
              }, 200);
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer hidden sm:block"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. CRITICAL LOW SUPPORT WARNING FOR AOI-B (Visible yet elegant) */}
      {/* ------------------------------------------------------------- */}
      {activeAOI === 'AOI-B' && (
        <div className="bg-amber-50/95 border-b border-amber-200/80 px-5 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 text-amber-900 animate-in fade-in duration-200 z-10">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>LOW SUPPORT:</strong> 2–3 valid thermal pixels / segment · <strong>PRELIMINARY SCREENING EVIDENCE</strong>
            </span>
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900">
            ArcGIS Pro Zonal Sample Only
          </span>
        </div>
      )}

      {/* Queue feedback toast notice */}
      {queueFeedback && (
        <div className="bg-[#0D3B45] text-white px-4 py-2 text-xs flex items-center justify-between gap-2 z-20 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{queueFeedback}</span>
          </div>
          <button 
            onClick={() => setQueueFeedback(null)}
            className="text-white/70 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. MAP COMPOSITION (68% MAP / 32% DETAIL PANEL ON DESKTOP) */}
      {/* Mobile: Map on top, Compact Detail Card at bottom */}
      {/* ------------------------------------------------------------- */}
      <div className={`relative flex flex-col lg:flex-row min-h-[540px] ${
        isFullscreen ? 'flex-1' : 'lg:h-[580px]'
      } overflow-hidden select-none bg-[#F8F9FA]`}>
        
        {/* MAP CANVAS (occupies 68% when panel is active, 100% when panel is closed) */}
        <div className={`relative ${
          currentFocusedSegment ? 'w-full lg:w-[68%]' : 'w-full'
        } h-[440px] sm:h-[480px] lg:h-full transition-all duration-300 overflow-hidden`}>
          
          {/* Leaflet DOM container */}
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

          {/* North Arrow Indicator (Apple Maps style compass badge) */}
          <div className="absolute top-4 right-4 z-10">
            <div 
              onClick={handleResetView}
              className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-transform active:scale-95"
              title="North Indicator / Reset Orientation"
            >
              <div className="flex flex-col items-center justify-center -space-y-0.5">
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[7px] border-b-rose-600" />
                <span className="text-[9px] font-black text-[#0D3B45] font-mono leading-none">N</span>
              </div>
            </div>
          </div>

          {/* COMPACT MAP LEGEND (Bottom-Left) */}
          <div className="absolute bottom-6 left-4 z-10 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 shadow-md text-xs space-y-1.5 max-w-[240px]">
            <div className="font-extrabold text-[#0D3B45] text-[10px] uppercase tracking-wide">
              THERMAL SCREENING PRIORITY
            </div>

            <div className="space-y-1 text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] shadow-xs"></span>
                <span className="text-slate-800 font-semibold">Higher priority</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4B483] shadow-xs"></span>
                <span className="text-slate-800 font-semibold">Moderate</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F6E] shadow-xs"></span>
                <span className="text-slate-800 font-semibold">Lower priority</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full border border-dashed border-slate-500 bg-slate-200"></span>
                <span className="text-slate-700">Low support (dashed)</span>
              </div>
            </div>

            <div className="text-[9px] text-slate-500 pt-1 border-t border-slate-100 leading-tight">
              Priority indicates relative thermal screening behaviour — <strong>not confirmed damage</strong>.
            </div>
          </div>

          {/* SENTINEL-2 EVIDENCE FLOATING CARD (When toggled ON) */}
          {showSentinelContext && (
            <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md border border-sky-200/90 rounded-2xl p-3.5 shadow-xl text-xs max-w-xs space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-sky-900">
                  <Eye className="w-4 h-4 text-sky-600" />
                  <span>SENTINEL-2 CONTEXT</span>
                </div>
                <button 
                  onClick={() => setShowSentinelContext(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-2 rounded-xl bg-sky-50 text-[11px] text-sky-900 space-y-1">
                <div className="font-mono font-bold">19 Sep 2026 → 4 Oct 2026</div>
                <p>
                  <strong>Observed:</strong> No obvious visual road-surface change detected in the tested views.
                </p>
              </div>
              <div className="text-[10px] text-slate-500 italic">
                Contextual evidence only — not proof of unchanged pavement condition.
              </div>
            </div>
          )}

          {/* LANDSAT THERMAL CONTEXT FLOATING CARD (When toggled ON for AOI-A) */}
          {showThermalContext && activeAOI === 'AOI-A' && (
            <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-xl text-xs max-w-xs space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>LANDSAT 9 THERMAL CONTEXT</span>
                </div>
                <button 
                  onClick={() => setShowThermalContext(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 text-[11px] text-amber-900 space-y-1 font-mono">
                <div>Landsat 9 C2 L2 Surface Temp</div>
                <div>Acquired: 31 Aug 2026</div>
                <div className="text-[10px] text-amber-800">
                  Kelvin = DN × 0.00341802 + 149.0
                </div>
              </div>
              <div className="text-[10px] text-amber-900 font-bold">
                AOI-A ONLY. Landsat thermal raster does NOT cover AOI-B.
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. DETAIL PANEL (32% ON DESKTOP, COMPACT & READABLE) */}
        {/* Mobile: converted to bottom sheet */}
        {/* ------------------------------------------------------------- */}
        {currentFocusedSegment && (
          <div className="w-full lg:w-[32%] lg:max-w-[390px] bg-white border-t lg:border-t-0 lg:border-l border-slate-200/80 p-5 flex flex-col justify-between overflow-y-auto max-h-[540px] lg:max-h-full z-10 shadow-sm animate-in fade-in lg:slide-in-from-right-2 duration-200 space-y-4">
            <div className="space-y-4">
              {/* Header: Segment Code & Dismiss */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-black text-[#0D3B45]">
                      {currentFocusedSegment.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      currentFocusedSegment.code === 'B-002'
                        ? 'bg-[#F5F1E8] text-[#92400E] border border-[#D4B483]'
                        : currentFocusedSegment.screeningFlag === 'HIGHER PRIORITY'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : currentFocusedSegment.screeningFlag === 'MODERATE'
                            ? 'bg-[#F5F1E8] text-[#92400E] border border-[#D4B483]'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {currentFocusedSegment.code === 'B-002' ? 'HIGHEST WITHIN AOI-B' : currentFocusedSegment.screeningFlag}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {currentFocusedSegment.roadName}
                  </div>
                </div>

                <button
                  onClick={() => setActiveSegmentCode(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Deselect Segment"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Metrics in a Compact Grid (Exact CSV Data of Truth) */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="bg-[#F8F9FA] rounded-xl p-2.5 border border-slate-200/70">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">MEDIAN LST</span>
                  <span className="font-mono font-bold text-sm text-[#0D3B45] block mt-0.5">
                    {currentFocusedSegment.tMedian.toFixed(currentFocusedSegment.code.startsWith('B-') ? 2 : 1)} °C
                  </span>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-2.5 border border-slate-200/70">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">RANGE</span>
                  <span className="font-mono font-bold text-sm text-[#0D3B45] block mt-0.5">
                    {currentFocusedSegment.tRange.toFixed(currentFocusedSegment.code.startsWith('B-') ? 2 : 1)} °C
                  </span>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-2.5 border border-slate-200/70">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">VALID PIXELS</span>
                  <span className="font-mono font-bold text-sm text-[#0D3B45] block mt-0.5">
                    {currentFocusedSegment.validPixelCount}
                  </span>
                </div>

                <div className={`rounded-xl p-2.5 border ${
                  currentFocusedSegment.supportFlag === 'HIGH SUPPORT'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50/70 border-amber-300 text-amber-900'
                }`}>
                  <span className="text-[10px] font-mono block font-bold uppercase">EVIDENCE SUPPORT</span>
                  <span className="font-mono font-bold text-xs block mt-0.5">
                    {currentFocusedSegment.supportFlag}
                  </span>
                </div>
              </div>

              {/* WHY PRIORITISED */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  WHY PRIORITISED
                </span>
                <p className="text-xs text-slate-800 leading-snug font-medium bg-[#F8F9FA] p-3 rounded-xl border border-slate-200/60">
                  "{currentFocusedSegment.whyFlagged}"
                </p>
              </div>

              {/* RECOMMENDED ACTION */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  RECOMMENDED ACTION
                </span>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0D3B45]/5 border border-[#0D3B45]/15 text-xs font-bold text-[#0D3B45]">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4B483] shrink-0" />
                  <span>{currentFocusedSegment.recommendedAction}</span>
                </div>
              </div>

              {/* Scientific Boundary Notice */}
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-2 text-[11px] text-amber-950 leading-tight">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Scientific boundary:</strong> Thermal screening evidence is not proof of pavement damage.
                </span>
              </div>
            </div>

            {/* Changed Primary Buttons: "View segment evidence" & "Add to inspection queue" */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  const full = findFullSegment(currentFocusedSegment.code);
                  if (full && onSelectSegment) {
                    onSelectSegment(full);
                  }
                }}
                className="w-full py-2.5 rounded-2xl bg-[#0D3B45] text-white text-xs font-bold hover:bg-[#2E6F6E] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>View segment evidence</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4B483]" />
              </button>

              <button
                onClick={() => handleAddToInspectionQueue(currentFocusedSegment.code)}
                className={`w-full py-2 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  queuedCodes.has(currentFocusedSegment.code)
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200/80'
                }`}
              >
                {queuedCodes.has(currentFocusedSegment.code) ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>In inspection queue</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-3.5 h-3.5 text-[#2E6F6E]" />
                    <span>Add to inspection queue</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. SUBTLE TECHNICAL DETAILS FOOTER (Outside the Main Map) */}
      {/* ------------------------------------------------------------- */}
      <div className="px-5 py-3 bg-[#F8F9FA] border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-600">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#2E6F6E]" />
            <span>
              <strong>Current data:</strong> {activeAOI === 'AOI-A' ? 'Landsat 9 C2 L2 · AOI-A' : 'ArcGIS Pro Zonal Extraction · AOI-B'}
            </span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div>
            <strong>Road segmentation:</strong> ArcGIS Pro
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1">
            <FileCode className="w-3.5 h-3.5 text-slate-400" />
            <span><strong>Analysis:</strong> 02_main_analysis.ipynb</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 italic">
          "Satellite evidence helps identify <strong>WHERE TO LOOK</strong>. Engineering inspection determines <strong>WHAT FAILED</strong>."
        </div>
      </div>
    </div>
  );
};
