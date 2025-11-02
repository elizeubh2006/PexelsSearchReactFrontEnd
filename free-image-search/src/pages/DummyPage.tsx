import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Autocomplete from "../components/Autocomplete";
import ImageList from "../components/ImageList";
import ImageCard from "../components/ImageCard";
import ImageModal from "../components/ImageModal";
import Pagination from "../components/Pagination";
import type { PhotoResult } from "../types/index";

export default function DummyPage() {
  // mocks simples
  const mockPhoto: PhotoResult = {
    searchDate: new Date().toISOString(),
    elapsedSeconds: 0.5,
    originalUrl: "https://images.pexels.com/photos/830829/pexels-photo-830829.jpeg",
    thumbnailUrl: "https://images.pexels.com/photos/830829/pexels-photo-830829.jpeg?auto=compress&cs=tinysrgb&h=150",
    author: "Jane Doe",
    width: 1920,
    height: 1080,
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-10">
      <h1 className="text-3xl font-bold text-center">Dummy Component Test Page</h1>

      {/* ✅ Testar SearchBar */}
      <section className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">SearchBar</h2>
        <SearchBar onSearch={() => {}} elapsedSeconds={0.123} />
      </section>

      {/* ✅ Testar Autocomplete */}
      <section className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Autocomplete</h2>
        <Autocomplete value="" onChange={() => {}} onSelect={() => {}} />
        <p className="text-sm text-gray-500 mt-2">* Aqui ele renderiza vazio — sem API *</p>
      </section>

      {/* ✅ Testar ImageCard */}
      <section className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">ImageCard</h2>
        <div className="max-w-xs">
          <ImageCard photo={mockPhoto} onOpen={() => setIsOpen(true)} />
        </div>
      </section>

      {/* ✅ Testar ImageList */}
      <section className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">ImageList</h2>
        <ImageList photos={[mockPhoto, mockPhoto, mockPhoto]} onOpen={() => setIsOpen(true)} />
      </section>

      {/* ✅ Testar Pagination */}
      <section className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Pagination</h2>
        <Pagination page={1} pageSize={10} total={50} onPageChange={() => {}} />
      </section>

      {/* ✅ Testar Modal */}
      <section className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">ImageModal</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setIsOpen(true)}
        >
          Abrir Modal
        </button>

        <ImageModal
          photo={mockPhoto}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        />
      </section>
    </div>
  );
}
