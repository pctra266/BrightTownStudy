import React from 'react'
import FlashcardForm from './components/FlashcardForm'
import type { FlashcardSet } from './types'
import { useNavigate } from 'react-router-dom'

const FlashCardsCreate = () => {

  const navigate = useNavigate();

  const testDelete= (id:string) =>{
    
  }

 

  return (
    <>
    <button onClick={()=> navigate('/flashcard')} >Back</button>
    <FlashcardForm onDelete={function (id: string): void {
        throw new Error('Function not implemented.')
      } } onSubmit={function (): void {
        throw new Error('Function not implemented.')
      } } />
    </>
  )
}

export default FlashCardsCreate