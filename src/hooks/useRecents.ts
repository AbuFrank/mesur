import { useCallback, useEffect, useState } from 'react';
import { CategoryId, StoredPair } from '../types';
import { loadJSON, saveJSON } from '../utils/storage';

const RECENTS_KEY = '@mesur/recents';
const MAX_RECENTS = 20;

function pairId(categoryId: CategoryId, fromUnitId: string, toUnitId: string): string {
  return `${categoryId}:${fromUnitId}:${toUnitId}`;
}

export function useRecents() {
  const [recents, setRecents] = useState<StoredPair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJSON<StoredPair[]>(RECENTS_KEY, []).then((data) => {
      setRecents(data);
      setLoading(false);
    });
  }, []);

  const addRecent = useCallback((categoryId: CategoryId, fromUnitId: string, toUnitId: string) => {
    setRecents((prev) => {
      const id = pairId(categoryId, fromUnitId, toUnitId);
      const entry: StoredPair = { id, categoryId, fromUnitId, toUnitId, savedAt: Date.now() };
      const next = [entry, ...prev.filter((p) => p.id !== id)].slice(0, MAX_RECENTS);
      saveJSON(RECENTS_KEY, next);
      return next;
    });
  }, []);

  const clearRecents = useCallback(() => {
    setRecents([]);
    saveJSON(RECENTS_KEY, []);
  }, []);

  return { recents, addRecent, clearRecents, loading };
}
