import { useState } from "react";
import FlashcardViewer from "./components/FlashcardViewer";
import { useParams } from "react-router-dom";
import ButtonToFlashcardSets from "./components/ButtonToFlashcardSets";
import { useFlashcardSet } from "./hooks/useFlashcardSet";
import { useAuth } from "../../context/AuthContext";

const FlashcardsPlay = () => {
  const { id = "" } = useParams();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const { user } = useAuth();
  const userId = user?.id || "";
  const userRoleId = user?.role || "";

  const { flashcardSet } = useFlashcardSet(id, userId, userRoleId);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcardSet.flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (!id) return <div>Invalid flashcard set ID.</div>;

  if (
    !flashcardSet ||
    !flashcardSet.flashcards ||
    flashcardSet.flashcards.length === 0
  ) {
    return <div>No flashcards found in this set.</div>;
  }
  return (
    <>
      <ButtonToFlashcardSets />
      <FlashcardViewer
        flashcards={flashcardSet.flashcards}
        currentIndex={currentIndex}
        isFlipped={isFlipped}
        onFlip={handleFlip}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
};

export default FlashcardsPlay;
