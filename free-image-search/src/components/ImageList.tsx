import ImageCard from './ImageCard';
import type { PhotoResult } from '../types';

interface Props {
  photos: PhotoResult[];
  onOpen: (photo: PhotoResult) => void;
}

export default function ImageList({ photos, onOpen }: Props) {
  if (!photos.length) return <p className="text-center mt-8">Nenhuma imagem</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {photos.map((p) => (
        <ImageCard key={p.id} photo={p} onOpen={onOpen} />
      ))}
    </div>
  );
}
