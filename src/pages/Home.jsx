import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { searchMovies } from '../api/omdb';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const qParam = params.get('q') || '';
  const typeParam = params.get('type') || '';
  const pageParam = Number(params.get('page') || '1');

  const [query, setQuery] = useState(qParam);
  const [type, setType] = useState(typeParam);
  const [page, setPage] = useState(pageParam);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=> {
    const sp = new URLSearchParams();
    if (query) sp.set('q', query);
    if (type) sp.set('type', type);
    if (page) sp.set('page', String(page));
    navigate({ pathname: '/', search: sp.toString() }, { replace: true });
  }, [query, type, page, navigate]);

  const doSearch = useCallback(async (q, p = 1, t = type) => {
    setError(''); setLoading(true);
    try {
      const res = await searchMovies({ query: q, page: p, type: t });
      if (res.Response === 'False') {
        setResults([]); setTotalResults(0); setError(res.Error || 'No results');
      } else {
        setResults(res.Search || []); setTotalResults(res.totalResults || 0);
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
      setResults([]); setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [type]);

  // run initial search if URL has query
  useEffect(()=> {
    if (qParam) doSearch(qParam, pageParam, typeParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (q) => {
    setQuery(q);
    setPage(1);
    doSearch(q, 1, type);
  };

  const handleTypeChange = (t) => {
    setType(t);
    if (query) { setPage(1); doSearch(query, 1, t); }
  };

  const handlePageChange = (p) => {
    setPage(p);
    doSearch(query, p, type);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Movie Search</h1>
        <Link to="/favorites" className="text-blue-600">Favorites</Link>
      </header>

      <SearchBar initialQuery={query} onSearch={handleSearch} type={type} setType={handleTypeChange} />

      <div className="mt-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <>
            <MovieGrid movies={results} />
            <Pagination currentPage={page} totalResults={totalResults} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  );
}
