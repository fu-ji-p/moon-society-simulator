import { create } from "zustand";
import { scenarioData } from "../lib/data";
import { readQueryState, writeQueryState } from "../lib/queryState";
import type { ViewId } from "../types/scenario";

const query = typeof window !== "undefined" ? readQueryState() : {};

type ScenarioStore = {
  currentView: ViewId;
  activeEraId: string;
  selectedId?: string;
  functionTab: string;
  locationFilter: string;
  actorFilter: string;
  dependencyMode: "outgoing" | "incoming";
  mapLayers: string[];
  narrativeStepId: string;
  setView: (view: ViewId) => void;
  setEra: (eraId: string) => void;
  setSelectedId: (id?: string) => void;
  setFunctionTab: (tab: string) => void;
  setLocationFilter: (value: string) => void;
  setActorFilter: (value: string) => void;
  setDependencyMode: (value: "outgoing" | "incoming") => void;
  toggleMapLayer: (layer: string) => void;
  setNarrativeStepId: (id: string) => void;
};

export const useScenarioStore = create<ScenarioStore>((set, get) => ({
  currentView: query.view ?? "home",
  activeEraId: query.era ?? scenarioData.filters.eraId,
  selectedId: query.selected,
  functionTab: scenarioData.filters.functionTab,
  locationFilter: scenarioData.filters.locationFilter,
  actorFilter: scenarioData.filters.actorFilter,
  dependencyMode: scenarioData.filters.dependencyMode,
  mapLayers: scenarioData.filters.mapLayers,
  narrativeStepId: query.step ?? scenarioData.narrativeSteps[0].id,
  setView: (view) => {
    set({ currentView: view });
    const state = get();
    writeQueryState({ view, era: state.activeEraId, selected: state.selectedId, step: state.narrativeStepId });
  },
  setEra: (eraId) => {
    set({ activeEraId: eraId });
    const state = get();
    writeQueryState({ view: state.currentView, era: eraId, selected: state.selectedId, step: state.narrativeStepId });
  },
  setSelectedId: (id) => {
    set({ selectedId: id });
    const state = get();
    writeQueryState({ view: state.currentView, era: state.activeEraId, selected: id, step: state.narrativeStepId });
  },
  setFunctionTab: (tab) => set({ functionTab: tab }),
  setLocationFilter: (value) => set({ locationFilter: value }),
  setActorFilter: (value) => set({ actorFilter: value }),
  setDependencyMode: (value) => set({ dependencyMode: value }),
  toggleMapLayer: (layer) => {
    const next = get().mapLayers.includes(layer)
      ? get().mapLayers.filter((item) => item !== layer)
      : [...get().mapLayers, layer];
    set({ mapLayers: next });
  },
  setNarrativeStepId: (id) => {
    set({ narrativeStepId: id });
    const state = get();
    writeQueryState({ view: state.currentView, era: state.activeEraId, selected: state.selectedId, step: id });
  },
}));
