import React, { useState } from 'react';
import Autocomplete from './Autocomplete';
import { FaSearch } from 'react-icons/fa';

interface Props {
  onSearch: (query: string) => void;
  elapsedSeconds?: number | null;
}

export default function SearchBar({ onSearch, elapsedSeconds }: Props) {
  const [query, setQuery] = useState('');

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="flex items-center bg-white rounded-full shadow px-4 py-3">
        <Autocomplete
          value={query}
          onChange={(v) => setQuery(v)}
          onSelect={(v) => setQuery(v)}
        />
        <button
          aria-label="Buscar"
          onClick={() => onSearch(query)}
          className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          <FaSearch />
        </button>
      </div>

      {elapsedSeconds != null && (
        <p className="text-sm text-gray-500 mt-2">
          Resultado em {elapsedSeconds.toFixed(3)}s
        </p>
      )}
    </div>
  );
}
