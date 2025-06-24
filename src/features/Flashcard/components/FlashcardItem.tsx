import React, { useEffect, useState } from 'react';
import type { FlashcardItem } from '../types';
import ImageSelector from './ImageSelector';
import type { Image } from '../types';

interface FlashcardItemProps {
  flashcard: FlashcardItem;
  onDelete: () => void;
  onChange: (field: 'question' | 'answer' | 'image', value: string | Image | null) => void;
  index?: number;
}

const Flashcard: React.FC<FlashcardItemProps> = ({ 
  flashcard, 
  onDelete, 
  onChange, 
  index 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<Image | null>(flashcard.image ?? null);
  
  const handleSelectImage = (img: Image) => {
    setSelectedImage(img);
    onChange('image', img);
  }
  const handleClearImage = () => {
    setSelectedImage(null);
    onChange('image', null);
  };
  useEffect(() => {
    setSelectedImage(flashcard.image ?? null);
  }, [flashcard.image]);
  
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-700">{index}</span>
        <button
          type="button"
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
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

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Add Image (Optional)</h4>
        
        <div className="mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term for images..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Search for images related to this flashcard (leave empty to use the term above)
          </p>
        </div>
        
        <ImageSelector 
          query={searchTerm.trim() || flashcard.question} 
          onSelect={handleSelectImage} 
        />

        {selectedImage && (
          <div className="mt-3 p-3 border border-gray-200 rounded-md bg-white">
            <p className="text-sm font-medium text-gray-700 mb-2">Selected Image:</p>
            <div className="flex items-start space-x-3">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.alt} 
                className="w-16 h-16 object-cover rounded-md" 
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 truncate">{selectedImage.alt}</p>
                <p className="text-xs text-gray-400 truncate">ID: {selectedImage.id}</p>
              </div>
              <button
                type="button"
                onClick={handleClearImage}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Remove selected image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;