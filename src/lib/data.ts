import eras from "../data/eras.json";
import zones from "../data/zones.json";
import actors from "../data/actors.json";
import assets from "../data/assets.json";
import activities from "../data/activities.json";
import industries from "../data/industries.json";
import dependencies from "../data/dependencies.json";
import narrativeSteps from "../data/narrative.json";
import sourceIndex from "../data/sourceIndex.json";
import labels from "../data/labels.ja.json";
import filters from "../data/filterDefaults.json";
import type {
  Activity,
  Actor,
  Asset,
  DependencyLink,
  Era,
  FilterDefaults,
  Industry,
  LabelsDictionary,
  NarrativeStep,
  ScenarioData,
  SourceReference,
  Zone,
} from "../types/scenario";

export const scenarioData: ScenarioData = {
  eras: eras as Era[],
  zones: zones as Zone[],
  actors: actors as Actor[],
  assets: assets as Asset[],
  activities: activities as Activity[],
  industries: industries as Industry[],
  dependencies: dependencies as DependencyLink[],
  narrativeSteps: narrativeSteps as NarrativeStep[],
  sourceIndex: sourceIndex as SourceReference[],
  labels: labels as LabelsDictionary,
  filters: filters as FilterDefaults,
};

export const eraOrder = scenarioData.eras.map((era) => era.id);
