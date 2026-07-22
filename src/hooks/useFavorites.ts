import { useCallback, useEffect, useState } from 'react';
import { CategoryId, StoredPair } from '../types';
import { loadJSON, saveJSON } from '../utils/storage';

const FAVORITES_KEY = '@mesur/favorites';

function pairId(categoryId: CategoryId, fromUnitId: string, toUnitId: string): string {
  return `${categoryId}:${fromUnitId}:${toUnitId}`;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<StoredPair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJSON<StoredPair[]>(FAVORITES_KEY, []).then((data) => {
      setFavorites(data);
      setLoading(false);
    });
  }, []);

  const toggleFavorite = useCallback((categoryId: CategoryId, fromUnitId: string, toUnitId: string) => {
    setFavorites((prev) => {
      const id = pairId(categoryId, fromUnitId, toUnitId);
      const exists = prev.some((p) => p.id === id);
      const next = exists
        ? prev.filter((p) => p.id !== id)
        : [{ id, categoryId, fromUnitId, toUnitId, savedAt: Date.now() }, ...prev];
      saveJSON(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (categoryId: CategoryId, fromUnitId: string, toUnitId: string) =>
      favorites.some((p) => p.id === pairId(categoryId, fromUnitId, toUnitId)),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, loading };
}
