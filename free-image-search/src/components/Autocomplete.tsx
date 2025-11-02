import { useEffect, useState } from 'react';
import { fetchHistory } from '../api/api';
import type { SearchHistoryItem } from '../types/index';
import { useDebounce } from '../hooks/useDebounce';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSelect: (v: string) => void;
}

export default function Autocomplete({ value, onChange, onSelect }: Props) {
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<SearchHistoryItem[]>([]);
  const [, setTotal] = useState(0);
  const debounced = useDebounce(value, 300);
  const pageSize = 5;

  useEffect(() => {
    // se quer apenas histórico (independente do termo), chamar sempre page=1.
    // para filtrar pelo texto do usuário no backend, precisaria endpoint diferente.
    const load = async () => {
      try {
        const data = await fetchHistory(page, pageSize);
        setResults(data.items);
        setTotal(data.total);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [page, debounced]); // buscando apenas por page (server returns latest queries sorted desc)

  return (
    <div className="relative flex-1">
      <input
        className="w-full outline-none px-3 py-2"
        value={value}
        placeholder="Free Image Search"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSelect(value); // parent will run search
          }
        }}
      />

      {results.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-50">
          <ul>
            {results.map((r) => (
              <li
                key={r.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => onSelect(r.query)}
              >
                {r.query}
                <span className="text-xs text-gray-400 ml-2">
                  • {new Date(r.searchDate).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between px-3 py-2 border-t text-sm">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-blue-600 disabled:text-gray-400"
            >
              Anterior
            </button>
            <div>Página {page}</div>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="text-blue-600"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
