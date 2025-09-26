import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const items = Object.values(favorites || {});

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <Link to="/">Search</Link>
      </header>

      {items.length === 0 ? (
        <p>No favorites yet. Add some from the search results.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(m => <MovieCard movie={m} key={m.imdbID} />)}
        </div>
      )}
    </div>
  );
}
