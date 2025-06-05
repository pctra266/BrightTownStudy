import React from 'react';
import type { FlashcardItem } from '../types';
import './FlashcardViewer.css';

interface FlashcardViewerProps {
  flashcards: FlashcardItem[];
  currentIndex: number;
  isFlipped: boolean;
  onFlip: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const FlashcardViewer: React.FC<FlashcardViewerProps> = ({ flashcards, currentIndex, isFlipped, onFlip, onPrevious, onNext }) => {
  const flashcard = flashcards[currentIndex];
  if (!flashcard) return null;
  return (

    <div className="viewer-wrapper">
      <div className="card-container" onClick={onFlip}>
        <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="face front">
            <div className="title">Question:</div>
            <div className="content">{flashcard.question}</div>
          </div>
          <div className="face back">
            <div className="title">Answer:</div>
            <div className="content">{flashcard.answer}</div>
          </div>
        </div>
      </div>
      <div className="viewer-controls">
        <button onClick={onPrevious} className="btn-nav" disabled={currentIndex === 0}>&lt;</button>
        <span className="counter">{currentIndex + 1}/{flashcards.length}</span>
        <button onClick={onNext} className="btn-nav" disabled={currentIndex === flashcards.length - 1}>&gt;</button>
      </div>
    </div>
  );
};

export default FlashcardViewer;