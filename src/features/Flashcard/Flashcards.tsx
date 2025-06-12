import FlashcardSets from "./components/FlashcardSets";
import { deleteFlashcardSet } from "./services/flashcardService";

import { useNavigate } from "react-router-dom";
import { useFlashcardSets } from "./hooks/useFlashcardSets";
import { useAuth } from "../../context/AuthContext";

const Flashcards = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id || "";
  const userRoleId = user?.role || "";

  const {flashcardSets, fetchData:fetchFlashcardSetData} = useFlashcardSets();

  const handleCreate = () => {navigate(`/library/flashcard/new`);};
  const handleDelete = async (id: string) => {await deleteFlashcardSet(id,userId,userRoleId);fetchFlashcardSetData();};
  const handleEdit = (id: string) => {navigate(`/library/flashcard/edit/${id}`);};
  const handlePlay = (id: string) =>{ navigate(`/library/flashcard/${id}/play`);};
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


