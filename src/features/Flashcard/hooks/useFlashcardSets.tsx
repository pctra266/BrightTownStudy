import { useState, useEffect } from "react";
import {getFlashcardSets } from "../services/flashcardService";
import type { FlashcardSetMeta } from "../types";

export const useFlashcardSets = () => {
const [flashcardSets, setFlashcardSets] = useState<FlashcardSetMeta[]>([]);

useEffect(() => {fetchData();}, []);
const fetchData = async () => {setFlashcardSets(await getFlashcardSets());};

  return{flashcardSets, fetchData};
}

