
import FlashcardForm from './components/FlashcardForm'
import ButtonToFlashcardSets from './components/ButtonToFlashcardSets'
import {createFlashcardSet} from './services/flashcardService'
import type {FlashcardSet} from './types'
import { useNavigate } from 'react-router-dom'

const FlashCardsCreate = () => {
  const navigate = useNavigate();


  const handleSubmitCreate = async (data: Omit<FlashcardSet, 'id'>) => {
      await createFlashcardSet(data);
      navigate('/library'); 
  }

  return (
    <>
    <ButtonToFlashcardSets/>
    <FlashcardForm  onSubmit={handleSubmitCreate} />
    </>
  );
};

export default FlashCardsCreate;
