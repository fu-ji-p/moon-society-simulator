import { AppShell } from "../components/AppShell";
import { DetailPanel } from "../components/DetailPanel";
import { useScenarioStore } from "../hooks/useScenarioStore";
import { HomeView } from "./HomeView";
import { EraView } from "../features/eras/EraView";
import { MapView } from "../features/map/MapView";
import { FunctionView } from "../features/functions/FunctionView";
import { IndustryView } from "../features/industries/IndustryView";
import { DependencyView } from "../features/dependencies/DependencyView";
import { SourceView } from "../features/sources/SourceView";
import { NarrativeView } from "../features/narrative/NarrativeView";

export function App() {
  const currentView = useScenarioStore((state) => state.currentView);

  return (
    <AppShell detailPanel={<DetailPanel />}>
      {currentView === "home" ? <HomeView /> : null}
      {currentView === "eras" ? <EraView /> : null}
      {currentView === "map" ? <MapView /> : null}
      {currentView === "functions" ? <FunctionView /> : null}
      {currentView === "industries" ? <IndustryView /> : null}
      {currentView === "dependencies" ? <DependencyView /> : null}
      {currentView === "sources" ? <SourceView /> : null}
      {currentView === "narrative" ? <NarrativeView /> : null}
    </AppShell>
  );
}
