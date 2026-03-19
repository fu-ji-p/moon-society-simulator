import { scenarioData } from "../lib/data";
import { useScenarioStore } from "../hooks/useScenarioStore";
import { SectionHeader } from "../components/SectionHeader";
import type { ViewId } from "../types/scenario";

const entryViews: Array<{ label: string; view: ViewId }> = [
  { label: "年代で見る", view: "eras" },
  { label: "社会機能で見る", view: "functions" },
  { label: "産業で見る", view: "industries" },
  { label: "依存関係で見る", view: "dependencies" },
  { label: "ストーリーで見る", view: "narrative" },
];

export function HomeView() {
  const setView = useScenarioStore((state) => state.setView);
  const setSelectedId = useScenarioStore((state) => state.setSelectedId);

  return (
    <div className="space-y-4">
      <SectionHeader
        eyebrow="Overview"
        title="月面社会の全体像"
        description="このシミュレーターは、月面社会を基地の集合ではなく、科学、生活、建設、輸送、通信、測位、電力、資源利用、データ、産業がつながる社会システムとして再構成します。"
      />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel overflow-hidden">
          <div className="relative min-h-[420px] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(125,192,255,0.22),transparent_20%),radial-gradient(circle_at_80%_30%,rgba(255,210,113,0.16),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
            <div className="relative z-10">
              <div className="grid gap-4 md:grid-cols-2">
                {entryViews.map(({ label, view }) => (
                  <button
                    key={view}
                    className="rounded-3xl border border-white/10 bg-white/6 p-5 text-left hover:bg-white/10"
                    onClick={() => setView(view)}
                  >
                    <p className="text-xl font-semibold text-white">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {view === "eras"
                        ? "準備、インフラ整備、常時滞在、社会形成の段階を追う"
                        : view === "functions"
                          ? "生活、科学、インフラ、物流、資源、データの機能別に理解する"
                          : view === "industries"
                            ? "どこでどんな産業が生まれ得るかを見る"
                            : view === "dependencies"
                              ? "一つの要素が欠けると何が成立しないかを確かめる"
                              : "数分で全体像を追体験する"}
                    </p>
                  </button>
                ))}
              </div>
              <div className="mt-6 overflow-hidden rounded-[32px] border border-white/10 bg-[#c8b39d]/40 p-5">
                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-3xl bg-[#dbcfc0]/80 p-5 text-slate-900">
                    <h3 className="text-2xl font-bold">月面社会の全景</h3>
                    <p className="mt-3 text-sm leading-7">
                      居住区、観測ゾーン、建設エリア、資源採掘・推薬生成、着陸・物流、月周回通信・測位、データ基盤が、
                      段階的に接続されながら月面社会を形づくります。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["居住", "科学", "電力", "通信", "測位", "物流", "資源", "産業"].map((item) => (
                        <span key={item} className="rounded-full bg-slate-900/10 px-3 py-1 text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative min-h-[220px] rounded-3xl bg-[linear-gradient(180deg,#d8ccb8_0%,#b39574_100%)] p-5">
                    {["crewed-lunar-outpost", "power-infrastructure", "communication-network", "navigation-system", "propellant-plant"].map((id, index) => (
                      <button
                        key={id}
                        className="absolute rounded-full bg-horizon px-3 py-2 text-xs text-white"
                        style={{
                          left: `${20 + index * 14}%`,
                          top: `${30 + (index % 2) * 18}%`,
                        }}
                        onClick={() => setSelectedId(id)}
                      >
                        {scenarioData.assets.find((asset) => asset.id === id)?.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="panel p-5">
            <h3 className="panel-title">中核メッセージ</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>月面社会は、単なる基地ではなく相互依存する社会システムです。</li>
              <li>発展は2020年代、2030年代、2040年代へと段階的に進みます。</li>
              <li>2040年代には40人規模の常時滞在構想が描かれています。</li>
              <li>科学だけでなく、生活、建設、通信、データ、産業が含まれます。</li>
            </ul>
          </div>
          <div className="panel p-5">
            <h3 className="panel-title">代表出典</h3>
            <div className="mt-4 space-y-3">
              {scenarioData.sourceIndex.slice(0, 4).map((source) => (
                <button
                  key={source.id}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-left hover:bg-white/10"
                  onClick={() => setSelectedId(source.id)}
                >
                  <p className="text-sm font-semibold text-white">{source.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{source.pages.map((page) => `p.${page}`).join(", ")}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
