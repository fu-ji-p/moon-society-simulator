import { scenarioData } from "../../lib/data";
import { SectionHeader } from "../../components/SectionHeader";
import { useScenarioStore } from "../../hooks/useScenarioStore";

export function NarrativeView() {
  const narrativeStepId = useScenarioStore((state) => state.narrativeStepId);
  const setNarrativeStepId = useScenarioStore((state) => state.setNarrativeStepId);
  const setView = useScenarioStore((state) => state.setView);
  const setSelectedId = useScenarioStore((state) => state.setSelectedId);
  const setEra = useScenarioStore((state) => state.setEra);

  const currentIndex = scenarioData.narrativeSteps.findIndex((step) => step.id === narrativeStepId);
  const currentStep = scenarioData.narrativeSteps[currentIndex] ?? scenarioData.narrativeSteps[0];

  function applyStepContext(step: (typeof scenarioData.narrativeSteps)[number]) {
    setNarrativeStepId(step.id);
    if (step.eraId) setEra(step.eraId);
    setSelectedId(step.focusTargetIds?.[0]);
  }

  function focusStep(offset: number) {
    const next = scenarioData.narrativeSteps[Math.min(Math.max(currentIndex + offset, 0), scenarioData.narrativeSteps.length - 1)];
    applyStepContext(next);
  }

  function openRelatedView() {
    setView(currentStep.focusView);
    if (currentStep.eraId) setEra(currentStep.eraId);
    setSelectedId(currentStep.focusTargetIds?.[0]);
  }

  const relatedViewLabel = scenarioData.labels.views[currentStep.focusView];

  return (
    <div className="space-y-4">
      <SectionHeader
        eyebrow="Narrative"
        title="ナレーション / ストーリーモード"
        description="非専門家向けに数分で全体像をたどるためのステップ形式です。ストーリーはこの画面内で進み、必要なときだけ関連ビューを開けます。"
      />
      <div className="panel p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">
              Step {currentIndex + 1} / {scenarioData.narrativeSteps.length}
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">{currentStep.title}</h3>
          </div>
          <div className="flex gap-2">
            <button className="chip-button" onClick={() => focusStep(-1)}>
              前へ
            </button>
            <button className="chip-button chip-button-active" onClick={() => focusStep(1)}>
              次へ
            </button>
          </div>
        </div>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-100">{currentStep.body}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="nav-button nav-button-active" onClick={openRelatedView}>
            関連ビューを開く: {relatedViewLabel}
          </button>
          {currentStep.eraId ? (
            <span className="tag">
              対象年代: {scenarioData.eras.find((era) => era.id === currentStep.eraId)?.name}
            </span>
          ) : null}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {currentStep.sourcePages.map((page) => (
            <span key={page} className="tag">
              p.{page}
            </span>
          ))}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {scenarioData.narrativeSteps.map((step, index) => (
            <button
              key={step.id}
              className={`rounded-3xl border p-4 text-left ${step.id === currentStep.id ? "border-highlight/40 bg-highlight/15" : "border-white/10 bg-white/5"}`}
              onClick={() => {
                applyStepContext(step);
              }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Step {index + 1}</p>
              <p className="mt-2 text-base font-semibold text-white">{step.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{step.body}</p>
              <p className="mt-3 text-xs text-accent">関連ビュー: {scenarioData.labels.views[step.focusView]}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
