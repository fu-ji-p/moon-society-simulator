import { SectionHeader } from "../../components/SectionHeader";
import { scenarioData } from "../../lib/data";
import { useScenarioStore } from "../../hooks/useScenarioStore";

export function SourceView() {
  const setSelectedId = useScenarioStore((state) => state.setSelectedId);

  return (
    <div className="space-y-4">
      <SectionHeader
        eyebrow="Sources"
        title="出典ビュー"
        description="各可視化が原典のどの章・ページ群に基づくかを確認できます。要素クリック時の詳細パネルでも sourcePages を表示します。"
      />
      <div className="grid gap-4">
        {scenarioData.sourceIndex.map((source) => (
          <button
            key={source.id}
            className="panel p-5 text-left hover:bg-white/10"
            onClick={() => setSelectedId(source.id)}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-accent">{source.chapter}</p>
            <h3 className="mt-2 text-xl font-bold text-white">{source.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{source.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {source.pages.map((page) => (
                <span key={page} className="tag">
                  p.{page}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
