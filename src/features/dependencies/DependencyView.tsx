import { scenarioData } from "../../lib/data";
import { SectionHeader } from "../../components/SectionHeader";
import { useScenarioStore } from "../../hooks/useScenarioStore";

const graphNodes = [
  { id: "power-infrastructure", x: 18, y: 34 },
  { id: "communication-network", x: 34, y: 20 },
  { id: "navigation-system", x: 52, y: 18 },
  { id: "data-architecture", x: 68, y: 28 },
  { id: "construction-area", x: 28, y: 58 },
  { id: "water-mining-site", x: 48, y: 58 },
  { id: "propellant-plant", x: 66, y: 56 },
  { id: "habitation-district", x: 43, y: 40 },
  { id: "lunar-observatory", x: 60, y: 40 },
  { id: "commercial-operations", x: 82, y: 48 },
];

export function DependencyView() {
  const activeEraId = useScenarioStore((state) => state.activeEraId);
  const selectedId = useScenarioStore((state) => state.selectedId);
  const dependencyMode = useScenarioStore((state) => state.dependencyMode);
  const setSelectedId = useScenarioStore((state) => state.setSelectedId);
  const setDependencyMode = useScenarioStore((state) => state.setDependencyMode);

  const links = scenarioData.dependencies.filter((link) => {
    const fromAsset = scenarioData.assets.find((item) => item.id === link.fromId);
    const fromActivity = scenarioData.activities.find((item) => item.id === link.fromId);
    const fromIndustry = scenarioData.industries.find((item) => item.id === link.fromId);
    return (
      (fromAsset?.eraIds.includes(activeEraId) ?? false) ||
      (fromActivity?.eraIds.includes(activeEraId) ?? false) ||
      (fromIndustry?.eraIds.includes(activeEraId) ?? false)
    );
  });

  const filteredLinks = selectedId
    ? links.filter((link) => (dependencyMode === "outgoing" ? link.fromId === selectedId : link.toId === selectedId))
    : links;

  return (
    <div className="space-y-4">
      <SectionHeader
        eyebrow="Dependencies"
        title="依存関係ビュー"
        description="どの要素が何に依存し、何を成立させるのかをたどることで、月面社会が単独要素の寄せ集めではないことを示します。"
      />
      <div className="panel p-6">
        <div className="mb-4 flex gap-2">
          <button
            className={`chip-button ${dependencyMode === "outgoing" ? "chip-button-active" : ""}`}
            onClick={() => setDependencyMode("outgoing")}
          >
            この要素が必要とするもの
          </button>
          <button
            className={`chip-button ${dependencyMode === "incoming" ? "chip-button-active" : ""}`}
            onClick={() => setDependencyMode("incoming")}
          >
            この要素が無いと困るもの
          </button>
        </div>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/15">
          <svg viewBox="0 0 100 72" className="aspect-[16/10] w-full">
            {filteredLinks.map((link) => {
              const from = graphNodes.find((node) => node.id === link.fromId);
              const to = graphNodes.find((node) => node.id === link.toId);
              if (!from || !to) return null;
              return (
                <line
                  key={link.id}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={selectedId ? "#ffd271" : "#7dc0ff"}
                  strokeOpacity="0.55"
                  strokeWidth="0.7"
                />
              );
            })}
            {graphNodes.map((node) => {
              const entity = scenarioData.assets.find((item) => item.id === node.id) ?? scenarioData.activities.find((item) => item.id === node.id);
              if (!entity) return null;
              const active = selectedId === node.id;
              return (
                <g key={node.id} onClick={() => setSelectedId(node.id)} className="cursor-pointer">
                  <circle cx={node.x} cy={node.y} r="4.4" fill={active ? "#ffd271" : "#20364d"} stroke="#d9d7d1" strokeWidth="0.4" />
                  <text x={node.x} y={node.y + 9} textAnchor="middle" fill="#f8fafc" fontSize="2.2">
                    {entity.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="mt-5 grid gap-3">
          {filteredLinks.map((link) => (
            <button
              key={link.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10"
              onClick={() => setSelectedId(dependencyMode === "outgoing" ? link.toId : link.fromId)}
            >
              <p className="text-sm font-semibold text-white">
                {link.fromId} → {link.toId}
              </p>
              <p className="mt-1 text-xs text-accent">{scenarioData.labels.relations[link.relation]}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{link.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
