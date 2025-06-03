import React from 'react'
import type { FlashcardSetMeta } from '../types'
import { useNavigate } from 'react-router-dom'


interface FlashcardSetProps{
    FlashcardSetMeta: FlashcardSetMeta,
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
}

const FlashcardSet: React.FC<FlashcardSetProps> = ({FlashcardSetMeta: FlashcardSet,onEdit,onDelete}) => {
  const navigate = useNavigate();
  return (
    <div>
        <p>ID: {FlashcardSet.id}</p>
        <p>Name: {FlashcardSet.name}</p>
        <p>Description: {FlashcardSet.description}</p>
        <div>
            <button onClick={() => onEdit(FlashcardSet.id)}>Edit</button>  
            <button onClick={() => onDelete(FlashcardSet.id)} >Delete </button>
            <button onClick={() => navigate(`/flashcard/${FlashcardSet.id}/play`)} >Play</button>
        </div>
    </div>
  )
}

export default FlashcardSet