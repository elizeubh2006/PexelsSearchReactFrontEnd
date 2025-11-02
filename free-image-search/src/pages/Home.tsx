import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ImageList from "../components/ImageList";
import ImageModal from "../components/ImageModal";
import { searchPhotos } from "../api/api";
import type { PhotoResult } from "../types";

export default function Home() {
  const [photos, setPhotos] = useState<PhotoResult[]>([]);
  const [elapsed, setElapsed] = useState<number | undefined>(undefined);
  const [openPhoto, setOpenPhoto] = useState<PhotoResult | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    const t0 = performance.now();
    try {
      const data = await searchPhotos(query, 1, 30);
      const t1 = performance.now();
      setPhotos(data);
      setElapsed((t1 - t0) / 1000);
    } catch (err) {
      console.error(err);
      setPhotos([]);
      setElapsed(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center">
      <header className="pt-16 pb-6 text-center">
        {/* 🎨 Título no estilo Google: cores em cada letra */}
        <h1 className="text-6xl font-bold tracking-tight">
          <span className="text-blue-600">F</span>
          <span className="text-red-500">r</span>
          <span className="text-yellow-500">e</span>
          <span className="text-blue-600">e</span>
          <span className="text-green-500"> </span>
          <span className="text-red-500">I</span>
          <span className="text-blue-600">m</span>
          <span className="text-yellow-500">a</span>
          <span className="text-green-500">g</span>
          <span className="text-red-500">e</span>
          <span className="text-blue-600"> </span>
          <span className="text-yellow-500">S</span>
          <span className="text-green-500">e</span>
          <span className="text-red-500">a</span>
          <span className="text-blue-600">r</span>
          <span className="text-yellow-500">c</span>
          <span className="text-green-500">h</span>
        </h1>
      </header>

      <div className="w-full max-w-xl px-4">
        <SearchBar onSearch={handleSearch} elapsedSeconds={elapsed} />
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
