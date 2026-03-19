import { scenarioData } from "./data";

export function findEntityById(id?: string) {
  if (!id) return undefined;
  return (
    scenarioData.assets.find((item) => item.id === id) ??
    scenarioData.activities.find((item) => item.id === id) ??
    scenarioData.industries.find((item) => item.id === id) ??
    scenarioData.eras.find((item) => item.id === id) ??
    scenarioData.sourceIndex.find((item) => item.id === id) ??
    scenarioData.zones.find((item) => item.id === id)
  );
}

export function uniqueNumbers(values: number[]) {
  return [...new Set(values)].sort((a, b) => a - b);
}
