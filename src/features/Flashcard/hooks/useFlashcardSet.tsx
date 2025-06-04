import {useEffect, useState} from 'react'
import type { FlashcardSet } from '../types'
import { getFlashcardSetById } from '../services/flashcardService';

export const useFlashcardSet = (id:string) => {
    const [flashcardSet, setFlashcardSet] = useState<FlashcardSet>();
    
    useEffect(() => {fetchFlashcardSet(id);}, []);
    const fetchFlashcardSet = async (id: string) => {setFlashcardSet(await getFlashcardSetById(id));}
    
    return { flashcardSet }
}
