"use client";
import { useState } from "react";

export const Pagination = ({ currentPage, totalPages, onChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onChange(currentPage + 1);
  };

  const handlePageClick = (page) => {
    onChange(page);
  };

  return (
    <div className="flex justify-center gap-2 py-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-full bg-white cursor-pointer"
      >
        ◀︎
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`w-8 h-8 rounded-full cursor-pointer ${
              currentPage === page
                ? "bg-black text-white"
                : "bg-white border border-gray-400"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-full bg-white cursor-pointer"
      >
        ▶︎
      </button>
    </div>
  );
};
