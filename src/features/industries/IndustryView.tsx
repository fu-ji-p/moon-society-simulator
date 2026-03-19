import { scenarioData } from "../../lib/data";
import { SectionHeader } from "../../components/SectionHeader";
import { useScenarioStore } from "../../hooks/useScenarioStore";

const locations = ["all", "earth-moon-space", "lunar-surface-exposed", "lunar-surface-pressurized", "earth", "location-agnostic"];

export function IndustryView() {
  const activeEraId = useScenarioStore((state) => state.activeEraId);
  const locationFilter = useScenarioStore((state) => state.locationFilter);
  const actorFilter = useScenarioStore((state) => state.actorFilter);
  const setLocationFilter = useScenarioStore((state) => state.setLocationFilter);
  const setActorFilter = useScenarioStore((state) => state.setActorFilter);
  const setSelectedId = useScenarioStore((state) => state.setSelectedId);

  const industries = scenarioData.industries.filter((industry) => {
    const locationMatch = locationFilter === "all" || industry.locationType === locationFilter;
    const eraMatch = industry.eraIds.includes(activeEraId);
    const infraActors = (industry.requiredInfrastructureIds ?? [])
      .map((id) => scenarioData.assets.find((asset) => asset.id === id))
      .flatMap((asset) => asset?.actorIds ?? []);
    const actorMatch = actorFilter === "all" || infraActors.includes(actorFilter);
    return locationMatch && eraMatch && actorMatch;
  });

  return (
    <div className="space-y-4">
      <SectionHeader
        eyebrow="Industries"
        title="産業ビュー"
        description="月面社会が将来どこで、どのインフラの上に、どんな産業を生み得るのかを場所別に俯瞰します。"
      />
      <div className="panel p-6">
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <button
              key={location}
              className={`chip-button ${locationFilter === location ? "chip-button-active" : ""}`}
              onClick={() => setLocationFilter(location)}
            >
              {location === "all" ? "すべて" : scenarioData.labels.locationTypes[location as keyof typeof scenarioData.labels.locationTypes]}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["all", "government", "private", "academia", "international"].map((actor) => (
            <button
              key={actor}
              className={`chip-button ${actorFilter === actor ? "chip-button-active" : ""}`}
              onClick={() => setActorFilter(actor)}
            >
              {actor === "all" ? "主体: すべて" : `主体: ${actor}`}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 xl:grid-cols-5">
          {Object.entries(scenarioData.labels.locationTypes).map(([key, label]) => {
            const columnItems = industries.filter((item) => item.locationType === key);
            return (
              <div key={key} className="rounded-3xl border border-white/10 bg-black/10 p-4">
                <h3 className="text-sm font-semibold text-white">{label}</h3>
                <div className="mt-3 space-y-3">
                  {columnItems.length > 0 ? (
                    columnItems.map((item) => (
                      <button
                        key={item.id}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-left hover:bg-white/10"
                        onClick={() => setSelectedId(item.id)}
                      >
                        <p className="text-sm font-semibold text-white">{item.name}</p>
                        <p className="mt-2 text-xs leading-5 text-slate-300">{item.description}</p>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">該当なし</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
