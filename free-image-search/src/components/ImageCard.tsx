import React from 'react';
import type { PhotoResult } from '../types';

interface Props {
  photo: PhotoResult;
  onOpen: (photo: PhotoResult) => void;
}

export default function ImageCard({ photo, onOpen }: Props) {
  return (
    <div className="rounded overflow-hidden shadow-sm">
      <img
        src={photo.thumbnailUrl}
        alt={photo.author}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => onOpen(photo)}
      />
      <div className="p-2 text-sm flex justify-between items-center">
        <div className="text-gray-700 font-medium">{photo.author}</div>
        <a
          href={photo.originalUrl}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 text-xs"
        >
          Abrir
        </a>
      </div>
    </div>
  );
}
