import { scenarioData } from "../../lib/data";
import { useScenarioStore } from "../../hooks/useScenarioStore";
import { SectionHeader } from "../../components/SectionHeader";
import { SourceBadgeList } from "../../components/SourceBadgeList";

export function EraView() {
  const activeEraId = useScenarioStore((state) => state.activeEraId);
  const setEra = useScenarioStore((state) => state.setEra);
  const setSelectedId = useScenarioStore((state) => state.setSelectedId);

  const era = scenarioData.eras.find((item) => item.id === activeEraId) ?? scenarioData.eras[0];
  const assets = scenarioData.assets.filter((item) => item.eraIds.includes(era.id));
  const activities = scenarioData.activities.filter((item) => item.eraIds.includes(era.id));

  return (
    <div className="space-y-4">
      <SectionHeader
        eyebrow="Era"
        title="年代ビュー"
        description="2020年代の準備段階から2040年代の40人常時滞在構想まで、月面社会がどのように増築・複雑化していくかを追います。"
      />
      <div className="panel p-6">
        <div className="flex flex-wrap gap-2">
          {scenarioData.eras.map((item) => (
            <button
              key={item.id}
              className={`rounded-2xl px-4 py-3 text-left ${item.id === era.id ? "bg-accent/20 text-white" : "bg-white/5 text-slate-300"}`}
              onClick={() => setEra(item.id)}
            >
              <p className="text-xs uppercase tracking-[0.25em]">{item.startYear}-{item.endYear}</p>
              <p className="mt-1 text-sm font-semibold">{item.name}</p>
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-black/10 p-5">
            <h3 className="text-2xl font-bold text-white">{era.name}</h3>
            <p className="mt-3 text-lg leading-8 text-slate-100">{era.summary}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{era.description}</p>
            <SourceBadgeList pages={era.sourcePages} />
          </div>
          <div className="grid gap-3">
            <div className="metric">
              <p className="text-sm text-slate-400">実現中の主要アセット</p>
              <p className="mt-2 text-3xl font-bold text-white">{assets.length}</p>
            </div>
            <div className="metric">
              <p className="text-sm text-slate-400">主要活動</p>
              <p className="mt-2 text-3xl font-bold text-white">{activities.length}</p>
            </div>
            <div className="metric">
              <p className="text-sm text-slate-400">この年代の社会の姿</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                {era.name === "2040年代"
                  ? "大型インフラと常時滞在を伴う社会段階。科学と生活の上に産業利用が乗り始めます。"
                  : era.name === "2030年代前半"
                    ? "拠点候補地の精査と初期建設が始まり、月面社会の骨格が見え始める段階です。"
                    : "準備と実証を通じて、次の段階に進むための条件を揃える段階です。"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {assets.map((asset, index) => (
            <button
              key={asset.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10"
              onClick={() => setSelectedId(asset.id)}
              style={{ transform: `translateY(${Math.min(index * 2, 12)}px)` }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{asset.category}</p>
              <p className="mt-2 text-lg font-semibold text-white">{asset.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{asset.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
