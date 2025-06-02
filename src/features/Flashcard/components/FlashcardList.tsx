import React from 'react';
import type { FlashcardType } from '../types';
import FlashcardItem from './FlashcardItem';
import './FlashcardList.css';

interface FlashcardListProps {
  flashcards: FlashcardType[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  onPlay?: () => void;
}

const FlashcardList: React.FC<FlashcardListProps> = ({ flashcards, onEdit, onDelete, onCreate, onPlay }) => {
  return (
    <div className="flashcard-list-container">
      <div className="list-header">
        <h2>My Flashcards</h2>
        <button className="btn-play" onClick={onPlay}>Play</button>
        <button className="btn-create" onClick={onCreate}>Create</button>
      </div>
      <div className="flashcard-list">
        {flashcards.map((fc) => (
          <FlashcardItem key={fc.id} flashcard={fc} onEdit={onEdit} onDelete={onDelete} />
        ))}
        {flashcards.length === 0 && <div>Empty List</div>}
      </div>
    </div>
  );
};

export default FlashcardList;