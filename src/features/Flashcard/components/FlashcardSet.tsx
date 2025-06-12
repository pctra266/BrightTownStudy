import React, { useState } from "react";
import type { FlashcardSetMeta } from "../types";
import { useAuth } from "../../../context/AuthContext";

interface FlashcardSetProps {
  FlashcardSetMeta: FlashcardSetMeta;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPlay: (id: string) => void;
}

const FlashcardSet: React.FC<FlashcardSetProps> = ({
  FlashcardSetMeta: FlashcardSet,
  onEdit,
  onDelete,
  onPlay,
  
}) => {
  const { user } = useAuth();
  const userId = user?.id || "";

  const handleEdit = () => {
    onEdit(FlashcardSet.id);
  };

  const handleDelete = () => {
    onDelete(FlashcardSet.id);
  };

  const handlePlay = () => {
    onPlay(FlashcardSet.id);
  };

  const isUserOwner = () =>{
    return FlashcardSet.userId == userId;
  }

  return (
    <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-20">
      {/* Main content */}
      <div className="min-w-full px-2.5">
        <div className="flex items-center justify-between h-full">
          {/* Left section - Main content */}
          <div className="flex-1 cursor-pointer h-full" onClick={handlePlay}>
            <div className="flex items-center gap-4 h-full">
              {/* Play button icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-[#1976D2] hover:bg-[#1565C0] rounded-full flex items-center justify-center transition-colors duration-200 group">
                <svg
                  className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-center h-full py-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate hover:text-[#1976D2] transition-colors duration-200">
                  {FlashcardSet.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed flex-1 overflow-hidden">
                  {FlashcardSet.description || "No description provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Right section - Action buttons */}
          <div className="flex items-center gap-3 ml-6">
            {/* Edit button */}
            {isUserOwner() && (
            <button
              onClick={handleEdit}
              className="p-2 text-gray-500 hover:text-[#1976D2] hover:bg-blue-50 rounded-lg transition-all duration-200 group"
              title="Edit flashcard set"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            )}

            {/* Delete button */}
            {isUserOwner()&& (
              <button
              onClick={handleDelete}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
              title="Delete flashcard set"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardSet;