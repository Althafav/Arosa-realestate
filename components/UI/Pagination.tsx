// components/Pagination.tsx
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-6 mt-6">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`
          p-2 rounded-full border
          ${
            currentPage === 1
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-primary text-primary hover:bg-primary hover:text-white"
          }
        `}
      >
        <FaChevronLeft size={16} />
      </button>

      <span className="text-gray-700">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`
          p-2 rounded-full border
          ${
            currentPage === totalPages
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-primary text-primary hover:bg-primary hover:text-white"
          }
        `}
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
