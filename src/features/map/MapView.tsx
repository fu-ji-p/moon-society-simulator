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
  "lunar-orbit-hub": { x: 52, y: 13 },
  "lunar-relay": { x: 67, y: 14 },
  "navigation-system": { x: 80, y: 14 },
  "earth-moon-link": { x: 91, y: 14 },
  "communication-network": { x: 79, y: 23 },
  "sample-return-facility": { x: 57, y: 31 },
  "science-observatories": { x: 69, y: 32 },
  "lunar-observatory": { x: 80, y: 31 },
  "seismometer-network": { x: 67, y: 41 },
  "power-infrastructure": { x: 38, y: 32 },
  "construction-area": { x: 25, y: 49 },
  "pressurized-rover": { x: 42, y: 49 },
  "crewed-lunar-outpost": { x: 52, y: 48 },
  "habitation-district": { x: 61, y: 48 },
  "medical-support": { x: 48, y: 64 },
  "food-production": { x: 63, y: 61 },
  "data-architecture": { x: 79, y: 60 },
  "surface-transport": { x: 70, y: 70 },
  "crewed-lander": { x: 89, y: 56 },
  "cargo-transport": { x: 88, y: 74 },
  "water-mining-site": { x: 17, y: 76 },
  "propellant-plant": { x: 28, y: 69 },
  "qol-systems": { x: 62, y: 78 },
};

const zoneAccent: Record<string, string> = {
  habitat: "#87c8ff",
  science: "#f6d27d",
  construction: "#ffaf7a",
  resource: "#81ddb0",
  logistics: "#f2b6a9",
  orbit: "#b9c2ff",
  surface: "#d8d7d0",
  commercial: "#efc7ff",
};

const zoneAreas = [
  { id: "orbit", label: "月近傍・月周回", x: 50, y: 7, w: 92, h: 14, fill: "rgba(143, 154, 255, 0.14)", stroke: "rgba(185,194,255,0.55)" },
  { id: "science", label: "観測ゾーン", x: 69, y: 24, w: 33, h: 22, fill: "rgba(246, 210, 125, 0.12)", stroke: "rgba(246,210,125,0.5)" },
  { id: "construction", label: "建設ゾーン", x: 28, y: 28, w: 28, h: 34, fill: "rgba(255, 175, 122, 0.12)", stroke: "rgba(255,175,122,0.5)" },
  { id: "habitat", label: "居住ゾーン", x: 54, y: 39, w: 28, h: 19, fill: "rgba(135, 200, 255, 0.12)", stroke: "rgba(135,200,255,0.55)" },
  { id: "resource", label: "資源採掘・推薬ゾーン", x: 22, y: 63, w: 28, h: 24, fill: "rgba(129, 221, 176, 0.12)", stroke: "rgba(129,221,176,0.5)" },
  { id: "commercial", label: "商業利用エリア", x: 63, y: 69, w: 24, h: 18, fill: "rgba(239, 199, 255, 0.12)", stroke: "rgba(239,199,255,0.5)" },
  { id: "logistics", label: "着陸・物流ゾーン", x: 86, y: 66, w: 24, h: 22, fill: "rgba(242, 182, 169, 0.12)", stroke: "rgba(242,182,169,0.5)" },
] as const;

const guideLines = [
  { x1: 52, y1: 20, x2: 52, y2: 42 },
  { x1: 67, y1: 20, x2: 67, y2: 29 },
  { x1: 79, y1: 20, x2: 79, y2: 23 },
  { x1: 39, y1: 37, x2: 52, y2: 42 },
  { x1: 52, y1: 56, x2: 52, y2: 64 },
  { x1: 61, y1: 56, x2: 63, y2: 61 },
  { x1: 79, y1: 27, x2: 79, y2: 55 },
  { x1: 28, y1: 62, x2: 28, y2: 69 },
  { x1: 79, y1: 65, x2: 88, y2: 65 },
  { x1: 88, y1: 65, x2: 88, y2: 72 },
];

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
        <div className="relative overflow-hidden rounded-[32px] border border-[#d8c29f]/30 bg-[linear-gradient(180deg,#e7dac7_0%,#d5c0a7_100%)]">
          <div className="aspect-[16/9]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_14%,rgba(60,42,26,0.06)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_42%)]" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(80,60,40,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(80,60,40,0.7)_1px,transparent_1px)] [background-size:48px_48px]" />
            {zoneAreas.map((area) => (
              <div
                key={area.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[28px] border backdrop-blur-[1px]"
                style={{
                  left: `${area.x}%`,
                  top: `${area.y}%`,
                  width: `${area.w}%`,
                  height: `${area.h}%`,
                  background: area.fill,
                  borderColor: area.stroke,
                }}
              >
                <div className="absolute left-4 top-3 rounded-full bg-[#34281d]/85 px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-[#f6ecdf]">
                  {area.label}
                </div>
              </div>
            ))}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              {guideLines.map((line, index) => (
                <line
                  key={index}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="rgba(87, 63, 42, 0.28)"
                  strokeWidth="0.35"
                  strokeDasharray="1.6 1.3"
                />
              ))}
            </svg>
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
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-left text-xs shadow-lg transition-transform hover:-translate-y-[52%] ${
                    isSelected
                      ? "z-20 border-[#c48e2b] bg-[#f5d48b] text-[#2b2014]"
                      : "z-10 border-[#b99c7d] bg-[#f3e7d7]/92 text-[#34281d] hover:bg-[#f7efe3]"
                  }`}
                  style={{ left: `${position.x}%`, top: `${position.y}%`, width: "148px" }}
                  onClick={() => setSelectedId(asset.id)}
                  title={asset.name}
                >
                  <span className="mb-1 flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full border border-white/60"
                      style={{ backgroundColor: zoneAccent[zone.type] ?? "#ffffff55" }}
                    />
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#75593d]">{asset.category}</span>
                  </span>
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
