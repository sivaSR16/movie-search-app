import React, { useState, useEffect } from 'react';

export default function SearchBar({ initialQuery = '', onSearch, type, setType }) {
  const [q, setQ] = useState(initialQuery);

  useEffect(() => {
    setQ(initialQuery);
  }, [initialQuery]);

  const submit = (e) => {
    e?.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form onSubmit={submit} className="flex gap-2 w-full max-w-3xl">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search movies, series, episodes..."
        className="flex-1 p-3 rounded-md border border-gray-300 focus:outline-none"
      />
      <select value={type} onChange={(e) => setType(e.target.value)} className="p-3 rounded-md border border-gray-300">
        <option value="">All types</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
    </form>
  );
}
