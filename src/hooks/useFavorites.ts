"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "pokeexplorer_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      setFavorites([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch {
        // storage quota exceeded or unavailable
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
