import FlashcardSets from "./components/FlashcardSets";
import { deleteFlashcardSet } from "./services/flashcardService";
import { useNavigate } from "react-router-dom";
import { useFlashcardSets } from "./hooks/useFlashcardSets";

const Flashcards = () => {
  const navigate = useNavigate();
  const { flashcardSets, fetchData: fetchFlashcardSetData } =
    useFlashcardSets();

  const handleCreate = () => {
    navigate(`/flashcard/new`);
  };
  const handleDelete = async (id: string) => {
    await deleteFlashcardSet(id);
    fetchFlashcardSetData();
  };
  const handleEdit = (id: string) => {
    navigate(`/flashcard/edit/${id}`);
  };
  const handlePlay = (id: string) => {
    navigate(`/flashcard/${id}/play`);
  };

  return (
    <FlashcardSets
      flashcardSets={flashcardSets}
      onCreate={handleCreate}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onPlay={handlePlay}
    />
  );
};

export default Flashcards;
