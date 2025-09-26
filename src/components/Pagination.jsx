import React from 'react';

export default function Pagination({ currentPage, totalResults, onPageChange }) {
  const totalPages = Math.ceil((Number(totalResults) || 0) / 10);
  if (totalPages <= 1) return null;

  const createPages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = createPages();

  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)} className={`px-3 py-1 border rounded ${p === currentPage ? 'bg-gray-200' : ''}`}>{p}</button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
    </div>
  );
}
