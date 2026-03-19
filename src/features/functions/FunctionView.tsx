import { scenarioData } from "../../lib/data";
import { SectionHeader } from "../../components/SectionHeader";
import { useScenarioStore } from "../../hooks/useScenarioStore";

const functionConfig = {
  life: {
    title: "生活",
    assetIds: ["habitation-district", "medical-support", "food-production", "qol-systems"],
    activityIds: ["short-stay", "long-stay", "continuous-residency"],
  },
  science: {
    title: "科学",
    assetIds: ["science-observatories", "lunar-observatory", "seismometer-network", "sample-return-facility"],
    activityIds: ["science-observation", "environment-resource-survey"],
  },
  infrastructure: {
    title: "インフラ",
    assetIds: ["power-infrastructure", "communication-network", "navigation-system", "data-architecture", "lunar-relay"],
    activityIds: ["data-ops"],
  },
  mobility: {
    title: "移動と物流",
    assetIds: ["pressurized-rover", "surface-transport", "cargo-transport", "crewed-lander", "lunar-orbit-hub"],
    activityIds: ["surface-mobility-logistics"],
  },
  resources: {
    title: "資源と建設",
    assetIds: ["water-mining-site", "propellant-plant", "construction-area"],
    activityIds: ["resource-utilization", "propellant-production", "construction-work"],
  },
  industry: {
    title: "産業",
    assetIds: ["qol-systems", "data-architecture", "surface-transport"],
    activityIds: ["commercial-operations"],
  },
  data: {
    title: "データ",
    assetIds: ["data-architecture", "communication-network", "navigation-system"],
    activityIds: ["data-ops"],
  },
} as const;

export function FunctionView() {
  const functionTab = useScenarioStore((state) => state.functionTab);
  const setFunctionTab = useScenarioStore((state) => state.setFunctionTab);
  const setSelectedId = useScenarioStore((state) => state.setSelectedId);
  const current = functionConfig[functionTab as keyof typeof functionConfig] ?? functionConfig.life;
  const assetIds = new Set<string>(current.assetIds);
  const activityIds = new Set<string>(current.activityIds);
  const assets = scenarioData.assets.filter((asset) => assetIds.has(asset.id));
  const activities = scenarioData.activities.filter((activity) => activityIds.has(activity.id));

  return (
    <div className="space-y-4">
      <SectionHeader
        eyebrow="Functions"
        title="社会機能ビュー"
        description="月面社会を機能別に分けて見ながら、各機能を成立させるアセット、活動、依存関係、出典を確認します。"
      />
      <div className="panel p-6">
        <div className="flex flex-wrap gap-2">
          {Object.entries(functionConfig).map(([key, value]) => (
            <button
              key={key}
              className={`chip-button ${functionTab === key ? "chip-button-active" : ""}`}
              onClick={() => setFunctionTab(key)}
            >
              {value.title}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-2xl font-bold text-white">{current.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              この機能は単独では成立せず、共通インフラと他機能の支援の上で動きます。
            </p>
            <div className="mt-4 space-y-3">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  className="w-full rounded-2xl border border-white/10 bg-black/10 p-4 text-left hover:bg-white/10"
                  onClick={() => setSelectedId(asset.id)}
                >
                  <p className="font-semibold text-white">{asset.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{asset.description}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/10 p-5">
            <h3 className="text-xl font-semibold text-white">関連活動</h3>
            <div className="mt-4 space-y-3">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10"
                  onClick={() => setSelectedId(activity.id)}
                >
                  <p className="font-semibold text-white">{activity.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{activity.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
