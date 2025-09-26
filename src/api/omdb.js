const BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY || '2d7eccc4';

async function callOmdb(params) {
  const qs = new URLSearchParams({ apikey: API_KEY, ...params }).toString();
  const res = await fetch(`${BASE_URL}?${qs}`);
  if (!res.ok) throw new Error('Network response not ok');
  return await res.json();
}

/**
 * Search movies
 * @param {{query:string, page:number, type:string}} options
 */
export async function searchMovies({ query, page = 1, type = '' }) {
  const params = { s: query, page: String(page) };
  if (type) params.type = type;
  return await callOmdb(params);
}

/** Get full details by imdbID */
export async function getMovieById(id) {
  return await callOmdb({ i: id, plot: 'full' });
}
