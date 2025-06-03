// import { data } from "react-router-dom";
import api from "../../../api/api"; 
import type { FlashcardSet,FlashcardSetMeta, FlashcardItem } from "../types";

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

export const getFlashcardsInSet = async (flashcardSetId: string = ""): Promise<FlashcardSet> => {
  const response = await api.get<FlashcardSet>(`/flashcardSets/${flashcardSetId}/flashcards`);
  return response.data;
};



export const getFlashcardById = async (flashcardSetId: string,flashcardId: string): Promise<FlashcardItem> => {
  const response = await api.get<FlashcardItem>(`/flashcardSets/${flashcardSetId}/flashcards/${flashcardId}`);
  return response.data;
};

export const createFlashcard = async (
  flashcardSetId: string,
  data: Omit<FlashcardItem, 'id'>
): Promise<FlashcardItem> => {
  const response = await api.post<FlashcardItem>(`/flashcardSets/${flashcardSetId}/flashcards`, data);
  return response.data;
};

export const updateFlashcard = async (
  flashcardSetId: string,
  flashcardId: string,
  data: Omit<FlashcardItem, 'id'>
): Promise<FlashcardItem> => {
  const response = await api.put<FlashcardItem>(`/flashcardSets/${flashcardSetId}/flashcards/${flashcardId}`, data);
  return response.data;
};

export const deleteFlashcard = async (flashcardSetId:string,flashcardId: string): Promise<void> => {
  await api.delete(`/flashcardSets/${flashcardSetId}/flashcards/${flashcardId}`);
};