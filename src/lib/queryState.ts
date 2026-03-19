import type { ViewId } from "../types/scenario";

export type QueryState = {
  view?: ViewId;
  era?: string;
  selected?: string;
  step?: string;
};

export function readQueryState(): QueryState {
  const params = new URLSearchParams(window.location.search);
  return {
    view: (params.get("view") as ViewId | null) ?? undefined,
    era: params.get("era") ?? undefined,
    selected: params.get("selected") ?? undefined,
    step: params.get("step") ?? undefined,
  };
}

export function writeQueryState(next: QueryState) {
  const params = new URLSearchParams(window.location.search);
  const entries = Object.entries(next) as Array<[keyof QueryState, string | undefined]>;
  for (const [key, value] of entries) {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }
  const nextUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", nextUrl);
}
