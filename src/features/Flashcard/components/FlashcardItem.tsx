import React from 'react';
import type { FlashcardType } from '../types';
import './FlashcardItem.css';

interface FlashcardItemProps {
  flashcard: FlashcardType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const FlashcardItem: React.FC<FlashcardItemProps> = ({ flashcard, onEdit, onDelete }) => {
  return (
    <div className="flashcard-item">
      <div className="flashcard-content">
        <div className="flashcard-question">{flashcard.question}</div>
        <div className="flashcard-question">{flashcard.answer}</div>
      </div>
      <div className="flashcard-actions">
        <button className="btn-edit" onClick={() => onEdit(flashcard.id)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(flashcard.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default FlashcardItem;