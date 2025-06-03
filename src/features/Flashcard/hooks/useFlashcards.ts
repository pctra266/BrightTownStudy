import { useState, useEffect } from "react";
import {
  getFlashcardsInSet,
  deleteFlashcard,
} from "../services/flashcardService";
import type { FlashcardSet } from "../types";

export const useFlashcards = () => {
  const [flashcards, setFlashcards] = useState<FlashcardSet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const list = await getFlashcardsInSet();
      // setFlashcards('1',list);
    } catch (err) {
      setError("Không tải được danh sách flashcards");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFlashcard = async (id: string) => {
    try {
      await deleteFlashcard('1',id);
      setFlashcards((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
      throw new Error("Xóa flashcard không thành công");
    }
  };

  return { flashcards, loading, error, removeFlashcard, fetchData};
};
