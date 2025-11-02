import { useEffect, useRef, useState } from "react";
import { fetchHistory } from "../api/api";
import { useDebounce } from "../hooks/useDebounce";
import type { SearchHistoryItem } from "../types";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSelect: (v: string) => void;
}

export default function Autocomplete({ value, onChange, onSelect }: Props) {
  const [results, setResults] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(value, 400);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // 🎯 Efeito para fechar a lista quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!debounced.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    fetchHistory(debounced)
      .then((data) => setResults(data.items || []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debounced]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSelect(value);
            setResults([]); // fecha a lista ao pressionar Enter
          }
        }}
        placeholder="Pesquisar imagens..."
        className="w-full border border-gray-300 rounded-full px-4 py-2 text-black placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {loading && (
        <div className="absolute left-4 top-2 text-gray-400 text-sm">Carregando...</div>
      )}

      {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 text-black">
          {results.map((r) => (
            <li
              key={r.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(r.query);
                setResults([]); // fecha a lista ao selecionar
              }}
            >
              {r.query}
              <span className="text-xs text-gray-400 ml-2">
                {new Date(r.searchDate).toLocaleTimeString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
