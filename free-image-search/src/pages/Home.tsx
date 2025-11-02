import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ImageList from "../components/ImageList";
import ImageModal from "../components/ImageModal";
import { searchPhotos } from "../api/api";
import type { PhotoResult } from "../types";

export default function Home() {
  const [photos, setPhotos] = useState<PhotoResult[]>([]);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [openPhoto, setOpenPhoto] = useState<PhotoResult | null>(null);

  const handleSearch = async (query: string) => {
    if (!query) return;
    const t0 = performance.now();
    try {
      const data = await searchPhotos(query, 1, 12);
      const t1 = performance.now();
      setPhotos(data);
      setElapsed((t1 - t0) / 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center">
      <header className="pt-16 pb-6 text-center">
        <h1 className="text-6xl font-bold text-blue-600 tracking-tight">
          Free Image Search
        </h1>
        {elapsed !== null && (
          <p className="text-sm text-gray-500 mt-2">
            Tempo de busca: {elapsed.toFixed(2)}s
          </p>
        )}
      </header>

      <div className="w-full max-w-xl px-4">
        <SearchBar onSearch={handleSearch} elapsedSeconds={elapsed ?? undefined} />
      </div>

      <main className="max-w-6xl mx-auto px-4 mt-10">
        <ImageList photos={photos} onOpen={(p) => setOpenPhoto(p)} />
      </main>

      <ImageModal
        isOpen={!!openPhoto}
        photo={openPhoto}
        onRequestClose={() => setOpenPhoto(null)}
      />
    </div>
  );
}
