import React from "react";
import type { FlashcardItem } from "../types";
import "./FlashcardViewer.css";

interface FlashcardViewerProps {
  flashcards: FlashcardItem[];
  currentIndex: number;
  isFlipped: boolean;
  onFlip: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const FlashcardViewer: React.FC<FlashcardViewerProps> = ({
  flashcards,
  currentIndex,
  isFlipped,
  onFlip,
  onPrevious,
  onNext,
}) => {
  const flashcard = flashcards[currentIndex];
  if (!flashcard) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 mb-4">
            <span className="text-sm font-medium text-gray-600">
              {currentIndex + 1} of {flashcards.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-[#1976D2] h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="flex justify-center mb-8">
          <div 
            className="card-container cursor-pointer group"
            onClick={onFlip}
            style={{ perspective: '1000px' }}
          >
            <div className={`card-inner w-80 sm:w-96 md:w-[500px] lg:w-[600px] h-64 sm:h-72 md:h-80 lg:h-96 relative transition-transform duration-700 ${isFlipped ? 'flipped' : ''}`}>
              {/* Front Side */}
              <div className="face front absolute w-full h-full flex flex-col justify-center items-center bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 group-hover:shadow-2xl transition-shadow duration-300">
                <div className="absolute top-4 left-4 flex items-center">
                  <div className="w-3 h-3 bg-[#1976D2] rounded-full mr-2"></div>
                  <span className="text-sm font-semibold text-[#1976D2] uppercase tracking-wide">Question</span>
                </div>
                
                <div className="flex-1 flex flex-col justify-center items-center w-full">
                  {flashcard.image && (
                    <div className="mb-6">
                      <img
                        src={flashcard.image.url}
                        alt={flashcard.image.alt}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-md"
                      />
                    </div>
                  )}
                  <div className="text-center text-gray-800 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-full overflow-hidden">
                    {flashcard.question}
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 text-xs text-gray-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.121 2.122" />
                  </svg>
                  Click to flip
                </div>
              </div>

              {/* Back Side */}
              <div className="face back absolute w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-[#1976D2] to-[#1565C0] rounded-2xl shadow-xl border border-blue-200 p-6 sm:p-8 text-white">
                <div className="absolute top-4 left-4 flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
                  <span className="text-sm font-semibold text-white uppercase tracking-wide">Answer</span>
                </div>
                
                <div className="flex-1 flex flex-col justify-center items-center w-full">
                  <div className="text-center text-white text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-full overflow-hidden">
                    {flashcard.answer}
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 text-xs text-blue-100 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Got it!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 sm:gap-6">
          <button
            onClick={onPrevious}
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white border-2 border-gray-200 rounded-full shadow-md hover:shadow-lg hover:border-[#1976D2] hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white transition-all duration-200 group"
            disabled={currentIndex === 0}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-[#1976D2] group-disabled:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex flex-col items-center">
            <div className="bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-md border border-gray-200">
              <span className="text-sm sm:text-base font-semibold text-gray-700">
                {currentIndex + 1} / {flashcards.length}
              </span>
            </div>
            <button
              onClick={onFlip}
              className="mt-2 px-3 py-1 text-xs sm:text-sm text-[#1976D2] hover:text-[#1565C0] font-medium transition-colors duration-200"
            >
              {isFlipped ? 'Show Question' : 'Show Answer'}
            </button>
          </div>

          <button
            onClick={onNext}
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white border-2 border-gray-200 rounded-full shadow-md hover:shadow-lg hover:border-[#1976D2] hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white transition-all duration-200 group"
            disabled={currentIndex === flashcards.length - 1}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-[#1976D2] group-disabled:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default FlashcardViewer;