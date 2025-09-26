import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites_v1');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try { localStorage.setItem('favorites_v1', JSON.stringify(favorites)); } catch {}
  }, [favorites]);

  const toggleFavorite = useCallback((movie) => {
    setFavorites(prev => {
      const next = { ...prev };
      if (next[movie.imdbID]) delete next[movie.imdbID];
      else next[movie.imdbID] = movie;
      return next;
    });
  }, []);

  const isFavorite = useCallback((id) => !!favorites[id], [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
