import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <>

      <div className="flex justify-center items-center mt-6 space-x-1 mb-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 rounded-full ${currentPage === index + 1
                ? 'bg-purple-600 text-white'
                : 'hover:bg-gray-100'
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>

    </>
  );
}

export default Pagination;