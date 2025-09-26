import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(movie.imdbID);

  return (
    <div className="bg-white rounded shadow p-3 flex flex-col">
      <Link to={`/movie/${movie.imdbID}`} className="block hover:opacity-90">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded"
        />
        <h3 className="mt-2 font-semibold">{movie.Title}</h3>
        <p className="text-sm text-gray-500">{movie.Year} • {movie.Type}</p>
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <Link to={`/movie/${movie.imdbID}`} className="text-sm text-blue-600">Details</Link>
        <button onClick={() => toggleFavorite(movie)} className="text-sm px-3 py-1 border rounded">
          {fav ? 'Remove Favorite' : 'Add Favorite'}
        </button>
      </div>
    </div>
  );
}
