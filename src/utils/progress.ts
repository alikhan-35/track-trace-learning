const STORAGE_KEY = 'track-trace-learning-progress';

export type ProgressState = Record<string, string[]>;

export const createProgressKey = (roleId: string, moduleId: string) => `${roleId}:${moduleId}`;

export const readProgress = (): ProgressState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressState) : {};
  } catch {
    return {};
  }
};

export const writeProgress = (progress: ProgressState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const toggleChecklistItem = (
  progress: ProgressState,
  key: string,
  itemId: string,
): ProgressState => {
  const currentItems = progress[key] ?? [];
  const nextItems = currentItems.includes(itemId)
    ? currentItems.filter((id) => id !== itemId)
    : [...currentItems, itemId];

  return {
    ...progress,
    [key]: nextItems,
  };
};

export const calculateModuleProgress = (completed: number, total: number) => {
  if (total === 0) {
    return 0;
  }

  return Math.round((completed / total) * 100);
};
