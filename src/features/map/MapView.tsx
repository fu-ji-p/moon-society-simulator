import { scenarioData } from "../../lib/data";
import { useScenarioStore } from "../../hooks/useScenarioStore";
import { SectionHeader } from "../../components/SectionHeader";

const layerMap = {
  habitat: ["habitat"],
  science: ["science"],
  infrastructure: ["power", "communication", "navigation", "data", "logistics", "transport", "rover"],
  industry: ["isru", "construction", "commerce", "food", "medical"],
} as const;

const assetPositions: Record<string, { x: number; y: number }> = {
  "crewed-lunar-outpost": { x: 50, y: 45 },
  "habitation-district": { x: 57, y: 48 },
  "science-observatories": { x: 66, y: 34 },
  "lunar-observatory": { x: 73, y: 27 },
  "seismometer-network": { x: 80, y: 38 },
  "sample-return-facility": { x: 61, y: 27 },
  "power-infrastructure": { x: 39, y: 34 },
  "communication-network": { x: 84, y: 21 },
  "navigation-system": { x: 75, y: 16 },
  "lunar-relay": { x: 66, y: 13 },
  "earth-moon-link": { x: 91, y: 12 },
  "data-architecture": { x: 78, y: 56 },
  "pressurized-rover": { x: 46, y: 56 },
  "surface-transport": { x: 70, y: 62 },
  "lunar-orbit-hub": { x: 55, y: 14 },
  "cargo-transport": { x: 84, y: 66 },
  "crewed-lander": { x: 88, y: 52 },
  "propellant-plant": { x: 26, y: 67 },
  "water-mining-site": { x: 18, y: 74 },
  "construction-area": { x: 33, y: 47 },
  "food-production": { x: 62, y: 56 },
  "medical-support": { x: 48, y: 63 },
  "qol-systems": { x: 67, y: 70 },
};

const zoneAccent: Record<string, string> = {
  habitat: "#98d6ff",
  science: "#ffe29a",
  construction: "#ffb37c",
  resource: "#8ee0b2",
  logistics: "#f4c0b7",
  orbit: "#c3c8ff",
  surface: "#d8d7d0",
  commercial: "#f7d8ff",
};

export function MapView() {
  const activeEraId = useScenarioStore((state) => state.activeEraId);
  const mapLayers = useScenarioStore((state) => state.mapLayers);
  const toggleMapLayer = useScenarioStore((state) => state.toggleMapLayer);
  const selectedId = useScenarioStore((state) => state.selectedId);
  const setSelectedId = useScenarioStore((state) => state.setSelectedId);

  const visibleAssets = scenarioData.assets.filter((asset) => asset.eraIds.includes(activeEraId));

  return (
    <div className="space-y-4">
      <SectionHeader
        eyebrow="Map"
        title="月面社会マップビュー"
        description="月面俯瞰図の上に、居住、観測、建設、資源、物流、通信の要素を重ね、社会システムとしての空間構造を見せます。"
      />
      <div className="panel p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.keys(layerMap).map((layer) => (
            <button
              key={layer}
              className={`chip-button ${mapLayers.includes(layer) ? "chip-button-active" : ""}`}
              onClick={() => toggleMapLayer(layer)}
            >
              {layer === "habitat" ? "居住" : layer === "science" ? "科学" : layer === "infrastructure" ? "インフラ" : "産業"}
            </button>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#d7cec2]">
          <div
            className="aspect-[16/9] bg-cover bg-center"
            style={{ backgroundImage: "url('/lunar-surface-map.svg')" }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,27,0.04)_0%,rgba(10,18,27,0.22)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(125,192,255,0.22),transparent_60%)]" />
            {scenarioData.zones.map((zone) => {
              if (!zone.position) return null;
              return (
                <div
                  key={zone.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${zone.position.x}%`, top: `${zone.position.y}%` }}
                >
                  <div
                    className="h-5 w-5 rounded-full border border-white/50 shadow-[0_0_22px_rgba(255,255,255,0.2)]"
                    style={{ backgroundColor: zoneAccent[zone.type] ?? "#ffffff55" }}
                  />
                  <div className="mt-2 whitespace-nowrap rounded-full bg-black/45 px-2 py-1 text-[10px] text-white/85 backdrop-blur">
                    {zone.name}
                  </div>
                </div>
              );
            })}
            {visibleAssets.map((asset) => {
              const zone = scenarioData.zones.find((item) => item.id === asset.zoneId);
              if (!zone?.position) return null;
              const position = assetPositions[asset.id] ?? zone.position;
              const layerEnabled = mapLayers.some((layer) =>
                layerMap[layer as keyof typeof layerMap].includes(asset.category as never),
              );
              if (!layerEnabled) return null;
              const isSelected = selectedId === asset.id;
              return (
                <button
                  key={asset.id}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-left text-xs shadow-lg ${
                    isSelected
                      ? "z-20 border-highlight bg-highlight/92 text-slate-900"
                      : "z-10 border-white/25 bg-horizon/84 text-white backdrop-blur hover:bg-horizon"
                  }`}
                  style={{ left: `${position.x}%`, top: `${position.y}%`, width: "132px" }}
                  onClick={() => setSelectedId(asset.id)}
                  title={asset.name}
                >
                  <span className="block font-medium leading-4">{asset.name}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {scenarioData.zones.map((zone) => (
            <button
              key={zone.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10"
              onClick={() => setSelectedId(zone.id)}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{zone.type}</p>
              <p className="mt-2 text-base font-semibold text-white">{zone.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{zone.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
