import { scenarioData } from "../../lib/data";
import { useScenarioStore } from "../../hooks/useScenarioStore";
import { SectionHeader } from "../../components/SectionHeader";

const layerMap = {
  habitat: ["habitat"],
  science: ["science"],
  infrastructure: ["power", "communication", "navigation", "data", "logistics", "transport", "rover"],
  industry: ["isru", "construction", "commerce", "food", "medical"],
} as const;

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
          <div className="aspect-[16/9] bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.18),transparent_10%),radial-gradient(circle_at_55%_42%,rgba(110,82,44,0.34),transparent_24%),linear-gradient(180deg,#dcd2c5_0%,#bfa894_100%)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(19,27,34,0.18)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(125,192,255,0.3),transparent_60%)]" />
            {visibleAssets.map((asset) => {
              const zone = scenarioData.zones.find((item) => item.id === asset.zoneId);
              if (!zone?.position) return null;
              const layerEnabled = mapLayers.some((layer) =>
                layerMap[layer as keyof typeof layerMap].includes(asset.category as never),
              );
              if (!layerEnabled) return null;
              const isSelected = selectedId === asset.id;
              return (
                <button
                  key={asset.id}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-left text-xs shadow-lg ${
                    isSelected
                      ? "border-highlight bg-highlight/90 text-slate-900"
                      : "border-white/25 bg-horizon/80 text-white backdrop-blur"
                  }`}
                  style={{ left: `${zone.position.x}%`, top: `${zone.position.y}%` }}
                  onClick={() => setSelectedId(asset.id)}
                  title={asset.name}
                >
                  {asset.name}
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
