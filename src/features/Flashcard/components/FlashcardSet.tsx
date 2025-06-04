import React from 'react'
import type { FlashcardSetMeta } from '../types'

interface FlashcardSetProps{
    FlashcardSetMeta: FlashcardSetMeta,
    onEdit: (id: string) => void,
    onDelete: (id: string) => void,
    onPlay:(id: string)=> void
}

const FlashcardSet: React.FC<FlashcardSetProps> = ({FlashcardSetMeta: FlashcardSet,onEdit,onDelete,onPlay}) => {
  return (
    <div>
        <p>Name: {FlashcardSet.name}</p>
        <p>Description: {FlashcardSet.description}</p>
        <div>
            <button onClick={() => onEdit(FlashcardSet.id)}>Edit</button>  
            <button onClick={() => onDelete(FlashcardSet.id)} >Delete </button>
            <button onClick={() => onPlay(FlashcardSet.id)} >Play</button>
        </div>
    </div>
  )
}

export default FlashcardSet