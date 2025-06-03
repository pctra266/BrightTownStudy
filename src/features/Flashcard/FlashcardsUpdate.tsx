import React, { use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FlashcardForm from "./components/FlashcardForm";
import type { FlashcardSet } from "./types";
import {
  getFlashcardSetById,
  updateFlashcardSet,
} from "./services/flashcardService";

const FlashcardsUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [flashcardSet, setFlashcardSet] = React.useState<FlashcardSet>();

  React.useEffect(() => {
    const fetchFlashcardSet = async () => {
      if (id) {
        const response = await getFlashcardSetById(id);
        setFlashcardSet(response);
      }
    };
    fetchFlashcardSet();
  }, []);
  const testDelete = (id: string) => {};

  const handleSubmitEidt = async (data: FlashcardSet) => {
    if (!id) return;
    try {
      await updateFlashcardSet(id, data);
      alert('Cập nhật thành công!');
      navigate('/flashcard'); // hoặc chuyển hướng sau khi cập nhật
    } catch (error) {
      console.error('Lỗi khi cập nhật flashcard set:', error);
      alert('Cập nhật thất bại!');
    }
  };
  return (
    <>
      <button onClick={() => navigate("/flashcard")}>Back</button>
      <h1>Current ID: {id}</h1>
      <FlashcardForm
        FlashcardSet={flashcardSet}
        onDelete={testDelete}
        onSubmit={handleSubmitEidt}
      />
    </>
  );
};

export default FlashcardsUpdate;
