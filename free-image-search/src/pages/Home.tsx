import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ImageList from '../components/ImageList';
import ImageModal from '../components/ImageModal';
import { searchPhotos } from '../api/api';
import type { PhotoResult } from '../types';

export default function Home() {
  const [photos, setPhotos] = useState<PhotoResult[]>([]);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [openPhoto, setOpenPhoto] = useState<PhotoResult | null>(null);

  const handleSearch = async (query: string) => {
    if (!query) return;
    const t0 = performance.now();
    try {
      const data = await searchPhotos(query, 1, 12); // per_page configurable
      const t1 = performance.now();
      // searchPhotos returns array; elapsed = example in each item but we can use t1-t0
      setPhotos(data);
      setElapsed((t1 - t0) / 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="py-8">
        <h1 className="text-center text-3xl font-semibold">Free Image Search</h1>
      </header>

      <SearchBar onSearch={handleSearch} elapsedSeconds={elapsed ?? undefined} />

      <main className="max-w-6xl mx-auto px-4">
        <ImageList photos={photos} onOpen={(p) => setOpenPhoto(p)} />
      </main>

      <ImageModal isOpen={!!openPhoto} photo={openPhoto} onRequestClose={() => setOpenPhoto(null)} />
    </div>
  );
}
