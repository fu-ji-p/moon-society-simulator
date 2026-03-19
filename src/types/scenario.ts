export type Era = {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  summary: string;
  description?: string;
  sourcePages: number[];
};

export type Zone = {
  id: string;
  name: string;
  type:
    | "surface"
    | "habitat"
    | "orbit"
    | "logistics"
    | "construction"
    | "science"
    | "resource"
    | "commercial";
  description: string;
  position?: { x: number; y: number; z?: number };
  sourcePages: number[];
};

export type Actor = {
  id: string;
  name: string;
  type: "government" | "private" | "academia" | "international" | "crew" | "robotic";
  role: string;
  sourcePages: number[];
};

export type Asset = {
  id: string;
  name: string;
  category:
    | "habitat"
    | "science"
    | "power"
    | "communication"
    | "navigation"
    | "transport"
    | "rover"
    | "construction"
    | "isru"
    | "data"
    | "logistics"
    | "medical"
    | "food"
    | "commerce";
  description: string;
  eraIds: string[];
  zoneId?: string;
  actorIds?: string[];
  dependencies?: string[];
  sourcePages: number[];
};

export type Activity = {
  id: string;
  name: string;
  type:
    | "science"
    | "exploration"
    | "habitation"
    | "infrastructure"
    | "industrial"
    | "logistics"
    | "construction"
    | "data";
  description: string;
  eraIds: string[];
  actorIds?: string[];
  requiredAssetIds?: string[];
  outputIds?: string[];
  sourcePages: number[];
};

export type Industry = {
  id: string;
  name: string;
  domain: string;
  locationType:
    | "earth-moon-space"
    | "lunar-surface-exposed"
    | "lunar-surface-pressurized"
    | "earth"
    | "location-agnostic";
  description: string;
  eraIds: string[];
  requiredInfrastructureIds?: string[];
  sourcePages: number[];
};

export type DependencyLink = {
  id: string;
  fromId: string;
  toId: string;
  relation: "depends_on" | "enables" | "supports" | "requires";
  description?: string;
  sourcePages: number[];
};

export type NarrativeStep = {
  id: string;
  title: string;
  body: string;
  focusView: ViewId;
  focusTargetIds?: string[];
  eraId?: string;
  sourcePages: number[];
};

export type SourceReference = {
  id: string;
  title: string;
  chapter: string;
  pages: number[];
  summary: string;
};

export type LabelsDictionary = {
  locale: string;
  views: Record<ViewId, string>;
  tabs: Record<string, string>;
  relations: Record<DependencyLink["relation"], string>;
  locationTypes: Record<Industry["locationType"], string>;
};

export type FilterDefaults = {
  eraId: string;
  mapLayers: string[];
  functionTab: string;
  locationFilter: string;
  actorFilter: string;
  dependencyMode: "outgoing" | "incoming";
};

export type ViewId =
  | "home"
  | "eras"
  | "map"
  | "functions"
  | "industries"
  | "dependencies"
  | "sources"
  | "narrative";

export type ScenarioData = {
  eras: Era[];
  zones: Zone[];
  actors: Actor[];
  assets: Asset[];
  activities: Activity[];
  industries: Industry[];
  dependencies: DependencyLink[];
  narrativeSteps: NarrativeStep[];
  sourceIndex: SourceReference[];
  labels: LabelsDictionary;
  filters: FilterDefaults;
};
