import api from "../../../api/api";
import type { FlashcardSet, FlashcardSetMeta } from "../types";

export const getFlashcardSets = async () => {
  const response = await api.get<FlashcardSetMeta[]>('/flashcardSets');
  return response.data;
};

export const getFlashcardSetPublicById = async (flashcardSetId: string) => {
  const response = await api.get<FlashcardSet>(`/flashcardSets/${flashcardSetId}`);
  return response.data;
}

export const getFlashcardSetById = async (flashcardSetId: string, userId: string, role: string): Promise<FlashcardSet> => {
  const response = await api.get<FlashcardSet>(`/flashcardSets/${flashcardSetId}`);
  if (role !== '1' && response.data.userId !== userId) {
    throw new Error('Unauthorized access');
  }
  return response.data;
};

export const createFlashcardSet = async (data: Omit<FlashcardSet, 'id'>, userId: string): Promise<FlashcardSet> => {
  const flashcardSet = { ...data, userId };
  const response = await api.post<FlashcardSet>('/flashcardSets', flashcardSet);
  return response.data;
};

export const updateFlashcardSet = async (
  flashcardSetId: string,
  data: Omit<FlashcardSet, 'id'>,
  userId: string,
  role: string
): Promise<FlashcardSet> => {
  if (role !== '1') {
    const set = await getFlashcardSetById(flashcardSetId, userId, role);
    if (set.userId !== userId) {
      throw new Error('Unauthorized access');
    }
  }
  const response = await api.put<FlashcardSet>(`/flashcardSets/${flashcardSetId}`, data);
  return response.data;
};

export const deleteFlashcardSet = async (flashcardSetId: string, userId: string, role: string): Promise<void> => {
  if (role !== '1') {
    const set = await getFlashcardSetById(flashcardSetId, userId, role);
    if (set.userId !== userId) {
      throw new Error('Unauthorized access');
    }
  }
  await api.delete(`/flashcardSets/${flashcardSetId}`);
};
