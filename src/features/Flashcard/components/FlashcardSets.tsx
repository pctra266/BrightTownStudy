import React, { useState,useEffect } from "react";
import type { FlashcardSetMeta } from "../types";
import FlashcardSet from "./FlashcardSet";

interface FlashcardSetsProps {
  flashcardSets: FlashcardSetMeta[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPlay: (id: string) => void;
  onCreate: () => void;
}

const FlashcardSets: React.FC<FlashcardSetsProps> = ({
  flashcardSets,
  onEdit,
  onDelete,
  onCreate,
  onPlay
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "description" >("name");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const itemsPerPage = 6;

  const filteredSets = flashcardSets
    .filter(set => 
      set.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (set.description && set.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "description":
          return a.description.localeCompare(b.description);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredSets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredSets.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const showPages = 5; 
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white/70 hover:bg-white/90 rounded-lg border border-gray-300 transition-all duration-200"
          onClick={() => goToPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="start-ellipsis" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
            currentPage === i
              ? "bg-[#1976D2] text-white border-[#1976D2] shadow-lg"
              : "text-gray-700 bg-white/70 hover:bg-white/90 border-gray-300"
          }`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="end-ellipsis" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white/70 hover:bg-white/90 rounded-lg border border-gray-300 transition-all duration-200"
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold  mb-2">
              My Flashcard Sets
            </h1>
            <p className="">
              {flashcardSets.length} total sets • {filteredSets.length} showing
            </p>
          </div>

          <button
            className="z-10 flex items-center gap-3 px-6 py-3 bg-[#1976D2] hover:bg-[#1565C0] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium"
            onClick={onCreate}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Set
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search flashcard sets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent transition-all duration-200"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "description")}
            className="px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent transition-all duration-200"
          >
            <option value="name">Sort by Name</option>
            <option value="description">Sort by Description</option>
          </select>

          <div className="flex bg-white/90 backdrop-blur-sm rounded-lg border border-white/30 p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-[#1976D2] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-[#1976D2] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {filteredSets.length === 0 ? (
        <div className="text-center py-16 px-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-12 max-w-md mx-auto">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {searchTerm ? (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-4">
                  No flashcard sets match your search for "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-[#1976D2] hover:text-[#1565C0] font-medium"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No flashcard sets yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first flashcard set to get started with studying!
                </p>
                <button
                  onClick={onCreate}
                  className="px-6 py-3 bg-[#1976D2] hover:bg-[#1565C0] text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Create Your First Set
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className={`${
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
              : "flex flex-col gap-2"
          }`}>
            {currentItems.map((flashcardSet) => (
              <div key={flashcardSet.id} className="w-full ">
                <FlashcardSet
                  FlashcardSetMeta={flashcardSet}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onPlay={onPlay}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-2">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                <button
                  className="p-2 text-gray-600 hover:text-[#1976D2] hover:bg-white/70 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-600 disabled:hover:bg-transparent"
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <div className="flex items-center gap-1">
                  {renderPaginationButtons()}
                </div>

                <button
                  className="p-2 text-gray-600 hover:text-[#1976D2] hover:bg-white/70 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-600 disabled:hover:bg-transparent"
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FlashcardSets;