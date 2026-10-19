// Authoritative GeoJSON geometries for AOI-A and AOI-B from project files
// AOI_A_saih_al_salam_D42.geojson & AOI_B_Fujairah_segments.geojson

export interface GeoJSONFeature {
  type: 'Feature';
  properties: {
    segment_id: string;
    aoi_id: 'AOI-A' | 'AOI-B';
    road_name: string;
    t_median: number;
    t_range: number;
    valid_pixel_count: number;
    screening_flag: 'HIGHER PRIORITY' | 'MODERATE' | 'LOWER PRIORITY';
    support_flag: 'HIGH SUPPORT' | 'LOW SUPPORT';
    priority_score: number;
    why_flagged: string;
  };
  geometry: {
    type: 'LineString';
    coordinates: [number, number][]; // [longitude, latitude]
  };
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  name: string;
  crs?: {
    type: string;
    properties: { name: string };
  };
  features: GeoJSONFeature[];
}

export const AOI_A_GEOJSON: GeoJSONFeatureCollection = {
  type: 'FeatureCollection',
  name: 'AOI_A_saih_al_salam_D42',
  crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
  features: [
    {
      type: 'Feature',
      properties: {
        segment_id: 'A-001',
        aoi_id: 'AOI-A',
        road_name: 'Saih Al Salam Street / D42',
        t_median: 54.60,
        t_range: 4.01,
        valid_pixel_count: 88,
        screening_flag: 'HIGHER PRIORITY',
        support_flag: 'HIGH SUPPORT',
        priority_score: 2.566,
        why_flagged: 'Elevated median temperature and high internal thermal spread.'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [55.3360, 24.8470],
          [55.3420, 24.8510],
          [55.3470, 24.8550]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        segment_id: 'A-002',
        aoi_id: 'AOI-A',
        road_name: 'Saih Al Salam Street / D42',
        t_median: 54.20,
        t_range: 1.03,
        valid_pixel_count: 90,
        screening_flag: 'LOWER PRIORITY',
        support_flag: 'HIGH SUPPORT',
        priority_score: 0.0,
        why_flagged: 'Consistent thermal behavior with minimal internal temperature spread.'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [55.3580, 24.8650],
          [55.3640, 24.8690],
          [55.3700, 24.8740]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        segment_id: 'A-003',
        aoi_id: 'AOI-A',
        road_name: 'Saih Al Salam Street / D42',
        t_median: 54.03,
        t_range: 1.24,
        valid_pixel_count: 90,
        screening_flag: 'LOWER PRIORITY',
        support_flag: 'HIGH SUPPORT',
        priority_score: 0.0,
        why_flagged: 'Lowest relative thermal anomaly delta within AOI-A.'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [55.3700, 24.8740],
          [55.3750, 24.8780],
          [55.3810, 24.8820]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        segment_id: 'A-004',
        aoi_id: 'AOI-A',
        road_name: 'Saih Al Salam Street / D42',
        t_median: 54.23,
        t_range: 2.04,
        valid_pixel_count: 91,
        screening_flag: 'LOWER PRIORITY',
        support_flag: 'HIGH SUPPORT',
        priority_score: 0.0,
        why_flagged: 'Thermal values remain within standard corridor baseline envelope.'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [55.3470, 24.8550],
          [55.3530, 24.8600],
          [55.3580, 24.8650]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        segment_id: 'A-005',
        aoi_id: 'AOI-A',
        road_name: 'Saih Al Salam Street / D42',
        t_median: 55.61,
        t_range: 3.39,
        valid_pixel_count: 91,
        screening_flag: 'HIGHER PRIORITY',
        support_flag: 'HIGH SUPPORT',
        priority_score: 5.572,
        why_flagged: 'Highest relative median temperature with elevated internal thermal spread.'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [55.3260, 24.8380],
          [55.3310, 24.8420],
          [55.3360, 24.8470]
        ]
      }
    }
  ]
};

export const AOI_B_GEOJSON: GeoJSONFeatureCollection = {
  type: 'FeatureCollection',
  name: 'AOI_B_Fujairah_segments',
  crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
  features: [
    {
      type: 'Feature',
      properties: {
        segment_id: 'B-001',
        aoi_id: 'AOI-B',
        road_name: 'Fujairah Arterial Roadway — Section 1',
        t_median: 24.31,
        t_range: 0.44,
        valid_pixel_count: 2,
        screening_flag: 'LOWER PRIORITY',
        support_flag: 'LOW SUPPORT',
        priority_score: 0.449,
        why_flagged: 'Only 2 valid pixels available in current ArcGIS Pro extraction.'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [56.2670, 25.1150],
          [56.2720, 25.1200],
          [56.2790, 25.1260]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        segment_id: 'B-002',
        aoi_id: 'AOI-B',
        road_name: 'Fujairah Arterial Roadway — Section 2',
        t_median: 24.95,
        t_range: 0.46,
        valid_pixel_count: 3,
        screening_flag: 'MODERATE',
        support_flag: 'LOW SUPPORT',
        priority_score: 2.279,
        why_flagged: 'Highest relative thermal-screening result within AOI-B, but only 3 valid thermal pixels are represented.'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [56.2790, 25.1260],
          [56.2840, 25.1320],
          [56.2900, 25.1380]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        segment_id: 'B-003',
        aoi_id: 'AOI-B',
        road_name: 'Fujairah Arterial Roadway — Section 3',
        t_median: 24.25,
        t_range: 0.32,
        valid_pixel_count: 3,
        screening_flag: 'LOWER PRIORITY',
        support_flag: 'LOW SUPPORT',
        priority_score: 0.0,
        why_flagged: 'Baseline thermal profile; preliminary screening evidence with only 3 valid pixels.'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [56.3010, 25.1460],
          [56.3050, 25.1500],
          [56.3110, 25.1550]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        segment_id: 'B-004',
        aoi_id: 'AOI-B',
        road_name: 'Fujairah Arterial Roadway — Section 4',
        t_median: 24.69,
        t_range: 0.40,
        valid_pixel_count: 3,
        screening_flag: 'LOWER PRIORITY',
        support_flag: 'LOW SUPPORT',
        priority_score: 0.583,
        why_flagged: 'Minor thermal variance above AOI-B baseline; restricted to 3 valid pixels.'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [56.2900, 25.1380],
          [56.2950, 25.1410],
          [56.3010, 25.1460]
        ]
      }
    }
  ]
};

// Subtle AOI Boundary Polygons enclosing the corridors
export const AOI_A_BOUNDARY_POLYGON: [number, number][] = [
  [24.8320, 55.3200],
  [24.8460, 55.3180],
  [24.8870, 55.3720],
  [24.8890, 55.3880],
  [24.8770, 55.3930],
  [24.8360, 55.3340]
];

export const AOI_B_BOUNDARY_POLYGON: [number, number][] = [
  [25.1090, 56.2620],
  [25.1280, 56.2590],
  [25.1610, 56.3070],
  [25.1630, 56.3210],
  [25.1460, 56.3230],
  [25.1110, 56.2770]
];

// AOI Centers and Default Zooms
export const AOI_CONFIGS = {
  'AOI-A': {
    name: 'AOI-A: Saih Al Salam Street / D42',
    shortName: 'AOI-A (D42)',
    location: 'Dubai, UAE',
    center: [24.8580, 55.3530] as [number, number],
    defaultZoom: 13,
    sensor: 'Landsat 9 TIRS-2 Collection 2 Level-2',
    date: '31 August 2026',
    validPixelsText: '88–91 valid pixels / segment',
    supportQuality: 'HIGH SUPPORT' as const,
    rasterAvailable: true,
    description: 'Saih Al Salam Street / D42 desert corridor in southern Dubai. 5 official road segments (A-001 to A-005) scanned under pristine 0% cloud cover.'
  },
  'AOI-B': {
    name: 'AOI-B: Fujairah Study Area',
    shortName: 'AOI-B (Fujairah)',
    location: 'Fujairah, UAE',
    center: [25.1350, 56.2890] as [number, number],
    defaultZoom: 14,
    sensor: 'ArcGIS Pro Zonal Segment Thermal Extraction',
    date: 'Baseline Zonal Sample',
    validPixelsText: '2–3 valid pixels / segment',
    supportQuality: 'LOW SUPPORT' as const,
    rasterAvailable: false,
    description: 'Mountainous arterial corridor in Fujairah. 4 segments (B-001 to B-004) with sparse sample density. Explicitly classified as preliminary / low support.'
  }
};
