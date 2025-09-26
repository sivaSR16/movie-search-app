import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieById } from '../api/omdb';
import { useFavorites } from '../context/FavoritesContext';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(()=> {
    let mounted = true;
    const load = async () => {
      setLoading(true); setError('');
      try {
        const res = await getMovieById(id);
        if (res.Response === 'False') {
          setError(res.Error || 'Not found');
          setMovie(null);
        } else {
          if (mounted) setMovie(res);
        }
      } catch {
        setError('Failed to fetch movie details');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!movie) return <div className="p-6">No data</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-6">
        <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} alt={movie.Title} className="w-64 h-auto rounded shadow" />
        <div>
          <h2 className="text-2xl font-bold">{movie.Title} <span className="text-gray-500">({movie.Year})</span></h2>
          <p className="mt-2 text-sm text-gray-600">{movie.Genre} • {movie.Runtime} • {movie.Rated}</p>
          <p className="mt-4">{movie.Plot}</p>

          <div className="mt-4">
            <h4 className="font-semibold">Cast</h4>
            <p className="text-sm text-gray-700">{movie.Actors}</p>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={() => toggleFavorite(movie)} className="px-4 py-2 border rounded">{isFavorite(movie.imdbID) ? 'Remove Favorite' : 'Add Favorite'}</button>
            <Link to="/" className="px-4 py-2 border rounded">Back</Link>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Ratings</h4>
            {movie.Ratings && movie.Ratings.length > 0 ? (
              <ul className="list-disc pl-5 text-sm">
                {movie.Ratings.map(r => <li key={r.Source}>{r.Source}: {r.Value}</li>)}
              </ul>
            ) : <p className="text-sm text-gray-500">No ratings available</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
