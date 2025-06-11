export interface Image {
  type: 'base64' | 'url';
  data: string;
}

export interface FlashcardItem {
  id: string;
  question: string;
  answer: string;
  image?: Image | null;
}

export interface FlashcardSet {
  id: string;
  name: string;
  description: string;
  userId: string;
  flashcards: FlashcardItem[];
}

export interface FlashcardSetMeta {
  id: string;
  name: string;
  description: string;
  userId: string;
}