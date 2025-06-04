import React from "react";
import type { FlashcardSetMeta } from "../types";
import FlashcardSet from "./FlashcardSet";

interface FlashcardSetsProps {
  flashcardSets: FlashcardSetMeta[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPlay: (id: string) => void;
  onCreate: () => void;
}

const FlashcardSets: React.FC<FlashcardSetsProps> = ({
  flashcardSets,
  onEdit,
  onDelete,
  onCreate,
  onPlay,
}) => {
  return (
    <>
      <h1>Total Flashcard Set</h1>
      <button onClick={onCreate}>Create</button>
      <div>
        {flashcardSets.map((flashcardSet) => (
          <>
            <FlashcardSet
              FlashcardSetMeta={flashcardSet}
              onEdit={onEdit}
              onDelete={onDelete}
              onPlay={onPlay}
            />
            <hr></hr>
          </>
        ))}
      </div>
    </>
  );
};

export default FlashcardSets;
