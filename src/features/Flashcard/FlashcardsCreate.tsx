
import FlashcardForm from './components/FlashcardForm'
import ButtonToFlashcardSets from './components/ButtonToFlashcardSets'
import {createFlashcardSet} from './services/flashcardService'
import type {FlashcardSet} from './types'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const FlashCardsCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
    const userId = user?.id || "";

  const handleSubmitCreate = async (data: Omit<FlashcardSet, 'id'>) => {
      await createFlashcardSet(data,userId);
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
