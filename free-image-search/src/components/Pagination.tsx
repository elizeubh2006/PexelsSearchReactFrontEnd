import React from "react";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null; // não exibe se só tiver 1 página

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:bg-gray-100 disabled:text-gray-400"
      >
        ◀ Anterior
      </button>

      <span className="text-gray-700">
        Página {page} de {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:bg-gray-100 disabled:text-gray-400"
      >
        Próxima ▶
      </button>
    </div>
  );
};

export default Pagination;
