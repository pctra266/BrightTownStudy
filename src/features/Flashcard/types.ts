export interface FlashcardItem {
  id: string;
  question: string;
  answer: string;
}

export interface FlashcardSet {
  id: string;
  name: string;
  description: string;
  flashcards: FlashcardItem[];
}

export interface FlashcardSetMeta {
  id: string;
  name: string;
  description: string;
}
