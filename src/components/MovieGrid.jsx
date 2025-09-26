import React from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) return <p className="text-center">No results to show</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map(m => <MovieCard movie={m} key={m.imdbID} />)}
    </div>
  );
}
