import React from 'react'
import Flashcards from '../features/Flashcard/Flashcards'
import {useNavigate} from 'react-router-dom'
 
const Library = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => {alert('not develop yet')}} >Go to Pomodoro</button>
      <button onClick={() => navigate('/flashcard')} >Go to Flashcard</button>
    </div>
  )
}

export default Library