import api from "../../../api/api"; 
import type { FlashcardType } from "../types";

export const getAllFlashcards = async (): Promise<FlashcardType[]> => {
  const response = await api.get<FlashcardType[]>('/flashcards');
  return response.data;
};

export const getFlashcardById = async (id: string): Promise<FlashcardType> => {
  const response = await api.get<FlashcardType>(`/flashcards/${id}`);
  return response.data;
};

export const createFlashcard = async (
  data: Omit<FlashcardType, 'id'>
): Promise<FlashcardType> => {
  const response = await api.post<FlashcardType>('/flashcards', data);
  return response.data;
};

export const updateFlashcard = async (
  id: string,
  data: Omit<FlashcardType, 'id'>
): Promise<FlashcardType> => {
  const response = await api.put<FlashcardType>(`/flashcards/${id}`, data);
  return response.data;
};

export const deleteFlashcard = async (id: string): Promise<void> => {
  await api.delete(`/flashcards/${id}`);
};