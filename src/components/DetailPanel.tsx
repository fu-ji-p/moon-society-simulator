import { scenarioData } from "../lib/data";
import { findEntityById, uniqueNumbers } from "../lib/resolve";
import { useScenarioStore } from "../hooks/useScenarioStore";

export function DetailPanel() {
  const selectedId = useScenarioStore((state) => state.selectedId);
  const setSelectedId = useScenarioStore((state) => state.setSelectedId);
  const entity = findEntityById(selectedId);

  if (!entity) {
    return (
      <div className="panel p-5">
        <h2 className="panel-title">詳細パネル</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          ノード、カード、年代、出典をクリックすると、説明と出典ページがここに表示されます。
        </p>
      </div>
    );
  }

  const sourcePages = "sourcePages" in entity ? uniqueNumbers(entity.sourcePages) : "pages" in entity ? entity.pages : [];
  const relatedSources = scenarioData.sourceIndex.filter((source) =>
    source.pages.some((page) => sourcePages.includes(page)),
  );

  return (
    <div className="panel p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Selected</p>
          <h2 className="mt-2 text-2xl font-bold text-white">{"name" in entity ? entity.name : entity.title}</h2>
        </div>
        <button className="chip-button" onClick={() => setSelectedId(undefined)}>
          閉じる
        </button>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">
        {"description" in entity ? entity.description : entity.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {sourcePages.map((page) => (
          <span key={page} className="tag">
            p.{page}
          </span>
        ))}
      </div>
      {relatedSources.length > 0 ? (
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold text-slate-100">関連出典</h3>
          {relatedSources.map((source) => (
            <button
              key={source.id}
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-left hover:bg-white/10"
              onClick={() => setSelectedId(source.id)}
            >
              <p className="text-sm font-semibold text-white">{source.title}</p>
              <p className="mt-1 text-xs text-slate-400">{source.chapter}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{source.summary}</p>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
