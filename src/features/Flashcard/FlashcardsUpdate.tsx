
import {useNavigate, useParams } from "react-router-dom";
import {updateFlashcardSet} from "./services/flashcardService";
import {useFlashcardSet } from "./hooks/useFlashcardSet";
import ButtonToFlashcardSets from "./components/ButtonToFlashcardSets";
import FlashcardForm from "./components/FlashcardForm";
import type { FlashcardSet } from "./types";
import { useAuth } from "../../context/AuthContext";

const FlashcardsUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
    const userId = user?.id || "";
    const userRoleId = user?.role || "";

  const { flashcardSet } = useFlashcardSet(id || "",userId,userRoleId);

  const handleSubmitEidt = async (data: FlashcardSet) => {
    if (id) {
      await updateFlashcardSet(id, data,userId,userRoleId);
      navigate("/library");
    } else {
      alert("Không tìm thấy ID của bộ flashcard để cập nhật.");
      navigate("/library");
    }
  };

  return (
    <>
      <ButtonToFlashcardSets />
      <FlashcardForm FlashcardSet={flashcardSet} onSubmit={handleSubmitEidt} />
    </>
  );
};

export default FlashcardsUpdate;
