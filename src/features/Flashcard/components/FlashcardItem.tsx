import React from 'react';
import type { FlashcardItem } from '../types';
import './FlashcardItem.css';

interface FlashcardItemProps {
  flashcard: FlashcardItem;
  onDelete: (id: string) => void;
  onChange: (field: 'question' | 'answer', value: string) => void;
}

const Flashcard: React.FC<FlashcardItemProps> = ({ flashcard, onDelete, onChange  }) => {
  return (
    <div>
      <span>Question: </span>
      <textarea value={flashcard.question}
        onChange={(e) => onChange('question', e.target.value)} ></textarea>
      <span>Answer: </span>
      <textarea  value={flashcard.answer}
        onChange={(e) => onChange('answer', e.target.value)} ></textarea>
      <button type='button' className="btn-delete" onClick={() => onDelete(flashcard.id)}>
        Delete</button>
    </div>
   
  );
};

export default Flashcard;