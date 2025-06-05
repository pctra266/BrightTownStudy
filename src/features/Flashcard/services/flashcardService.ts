import api from "../../../api/api";
import type { FlashcardSet, FlashcardSetMeta } from "../types";

export const getFlashcardSets = async () => {
  const response = await api.get<FlashcardSetMeta[]>('/flashcardSets');
  return response.data;
}

export const getFlashcardSetById = async (flashcardSetId: string) => {
  const response = await api.get<FlashcardSet>(`/flashcardSets/${flashcardSetId}`);
  return response.data;
}

export const createFlashcardSet = async (data: Omit<FlashcardSet, 'id'>): Promise<FlashcardSet> => {
  const response = await api.post<FlashcardSet>('/flashcardSets', data);
  return response.data;
}

export const updateFlashcardSet = async (flashcardSetId: string, data: Omit<FlashcardSet, 'id'>): Promise<FlashcardSet> => {
  const response = await api.put<FlashcardSet>(`/flashcardSets/${flashcardSetId}`, data);
  return response.data;
}

export const deleteFlashcardSet = async (flashcardSetId: string): Promise<void> => {
  await api.delete(`/flashcardSets/${flashcardSetId}`);
}
