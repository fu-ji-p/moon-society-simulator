import type { ReactNode } from "react";
import { scenarioData } from "../lib/data";
import { useScenarioStore } from "../hooks/useScenarioStore";
import type { ViewId } from "../types/scenario";

type AppShellProps = {
  children: ReactNode;
  detailPanel: ReactNode;
};

export function AppShell({ children, detailPanel }: AppShellProps) {
  const currentView = useScenarioStore((state) => state.currentView);
  const setView = useScenarioStore((state) => state.setView);

  const views = Object.entries(scenarioData.labels.views) as Array<[ViewId, string]>;

  return (
    <div className="min-h-screen px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
        <header className="panel overflow-hidden px-6 py-5">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs uppercase tracking-[0.35em] text-accent">Lunar Society Scenario Viewer</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                月面社会ビジュアルシミュレーター
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
                「日本の国際宇宙探査シナリオ案2025」をもとに、月面社会の全体像、段階的発展、社会機能の相互依存、
                産業成立条件を対話的に理解するための説明型ツールです。
              </p>
            </div>
            <div className="max-w-md rounded-2xl border border-amber-300/20 bg-amber-200/10 px-4 py-3 text-sm text-amber-50">
              原典文書をもとに再構成した理解支援ツールです。構想案であり、確定計画ではありません。
            </div>
          </div>
          <nav className="mt-5 flex flex-wrap gap-2">
            {views.map(([id, label]) => (
              <button
                key={id}
                className={`nav-button ${currentView === id ? "nav-button-active" : ""}`}
                onClick={() => setView(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <main className="space-y-4">{children}</main>
          <aside className="xl:sticky xl:top-4 xl:self-start">{detailPanel}</aside>
        </div>
      </div>
    </div>
  );
}
