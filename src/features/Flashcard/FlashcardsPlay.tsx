import React, { use } from "react";
import FlashcardViewer from "./components/FlashcardViewer";
import type { FlashcardItem, FlashcardSet } from "./types";
import { getFlashcardSetById } from "./services/flashcardService";
import { useNavigate, useParams } from "react-router-dom";

const FlashcardsPlay = () => {
    const {id = '' } = useParams();
    const navigate = useNavigate();


  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isFlipped, setIsFlipped] = React.useState<boolean>(false);

  const [flashcards, setFlashcards] = React.useState<FlashcardItem[]>([]);

  React.useEffect(() => {
    const fetchFlashcards = async () => {
      const fetchedFlashcards: FlashcardSet = await getFlashcardSetById(
        id
      );
      setFlashcards(fetchedFlashcards.flashcards);
    };

    fetchFlashcards();
  }, [id]);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (!id) return <div>Invalid flashcard set ID.</div>;
if (flashcards.length === 0) return <div>No flashcards found in this set.</div>;
  return (
    <>
    <button onClick={()=> navigate('/flashcard')} >Back</button>
    <FlashcardViewer
      flashcards={flashcards}
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
