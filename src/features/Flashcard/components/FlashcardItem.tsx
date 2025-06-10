import React from 'react';
import type { FlashcardItem } from '../types';

interface FlashcardItemProps {
  flashcard: FlashcardItem;
  onDelete: () => void;
  onChange: (field: 'question' | 'answer', value: string) => void;
  index?: number;
}

const Flashcard: React.FC<FlashcardItemProps> = ({ flashcard, onDelete, onChange, index }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 ">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-700">{index}</span>
        <button
          type="button"
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            value={flashcard.question}
            onChange={(e) => onChange('question', e.target.value)}
            placeholder="Enter term"
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none focus:border-[#1976D2] resize-none transition-colors"
            rows={2}
          />
          <p className="text-xs text-gray-500 mt-1">TERM</p>
        </div>
        
        <div>
          <textarea
            value={flashcard.answer}
            onChange={(e) => onChange('answer', e.target.value)}
            placeholder="Enter definition"
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none focus:border-[#1976D2] resize-none transition-colors"
            rows={2}
          />
          <p className="text-xs text-gray-500 mt-1">DEFINITION</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;