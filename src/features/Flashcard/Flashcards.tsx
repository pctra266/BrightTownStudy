import React, { useEffect } from 'react'
import FlashcardSets from './components/FlashcardSets';
import {getFlashcardSets, createFlashcardSet, deleteFlashcardSet} from './services/flashcardService'
import type { FlashcardItem, FlashcardSetMeta } from './types';
import { useNavigate } from 'react-router-dom';

const Flashcards = () => {
  const [flashcardSets, setFlashcardSets] = React.useState<FlashcardSetMeta[]>([]);
  const navigate = useNavigate();
  useEffect( () => {
    const fetchFlashcardSet = async () =>{
      setFlashcardSets(await getFlashcardSets());
    }
    fetchFlashcardSet();
  },[])

  const handleCreate = async (data: {
    name: string;
    description: string;
    flashcards: FlashcardItem[];}) => {

      await createFlashcardSet(data);
  }

  const handleDelete = async (id: string) => { // chay thanh cong
    await deleteFlashcardSet(id);
    const newFlashcardSets = await getFlashcardSets();
    setFlashcardSets(newFlashcardSets);
  }

  const handleEdit = (id: string) => {
    navigate(`/flashcard/edit/${id}`);
  }

  return (
    <FlashcardSets flashcardSets={flashcardSets} onCreate={()=>navigate(`/flashcard/new`)} onDelete={handleDelete} onEdit={handleEdit} />
  )
}

export default Flashcards