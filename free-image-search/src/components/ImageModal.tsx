import Modal from 'react-modal';
import type { PhotoResult } from '../types';

Modal.setAppElement('#root');

interface Props {
  isOpen: boolean;
  photo?: PhotoResult | null;
  onRequestClose: () => void;
}

export default function ImageModal({ isOpen, photo, onRequestClose }: Props) {
  if (!photo) return null;

  const fileName = photo.originalUrl.split('/').pop()?.split('?')[0] ?? 'image.jpg';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Visualizar imagem"
      overlayClassName="modal-overlay fixed inset-0 flex items-center justify-center z-50"
      className="bg-white rounded max-w-4xl w-full mx-4 p-4 outline-none"
    >
      <div className="flex flex-col">
        <div className="flex justify-end">
          <button onClick={onRequestClose} className="text-gray-600">Fechar</button>
        </div>

        <div className="flex justify-center items-center">
          <img src={photo.originalUrl} alt={photo.author} className="max-h-[70vh] object-contain" />
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700">
            Autor: <strong>{photo.author}</strong><br/>
            Resolução: {photo.width} x {photo.height}
          </div>

          <a
            href={photo.originalUrl}
            download={fileName}
            className="bg-blue-600 text-white px-3 py-2 rounded"
            target="_blank"
            rel="noreferrer"
          >
            Baixar
          </a>
        </div>
      </div>
    </Modal>
  );
}
