import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import FlashcardList from "./components/FlashcardList";
import FlashcardForm from "./components/FlashcardForm";
import FlashcardViewer from "./components/FlashcardViewer";
import { useFlashcards } from "./hooks/useFlashcards";
import { useFlashcardForm } from "./hooks/useFlashcardForm";
import { createFlashcard, updateFlashcard } from "./services/flashcardService";
import "./FlashcardPage.css";

const FlashcardPage: React.FC = () => {
  const { flashcards, loading, error, removeFlashcard, fetchData } =
    useFlashcards();
  const navigate = useNavigate();
  const [id, setId] = useState<string>();
  const {
    question,
    answer,
    loading: formLoading,
    error: formError,
    fetchData: fetchFormData,
  } = useFlashcardForm(id || "");

  const [submitError, setSubmitError] = useState<string>("");

  const handleCreate = async (data: { question: string; answer: string }) => {
    try {
      await createFlashcard(data);
      await fetchData();
      navigate(`/flashcards`);
    } catch (err) {
      console.error(err);
      setSubmitError("Tạo mới không thành công");
    }
  };

  const handleUpdate = async (data: { question: string; answer: string }) => {
    console.log("Updating flashcard with id:", id, "and data:", data);
    if (!id) return;
    try {
      await updateFlashcard(id, data);
      await fetchData();
      navigate(`/flashcards`);
    } catch (err) {
      console.error(err);
      setSubmitError("Cập nhật không thành công");
    }
  };

  const handleEdit = (editId: string) => {
    console.log("triggered edit for id:", editId);
    fetchFormData(editId);
    setId(editId);
    navigate(`edit/${editId}`);
  };

  const handleDelete = async (delId: string) => {
    try {
      await removeFlashcard(delId);
    } catch {
      alert("Xóa không thành công");
    }
  };

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

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

  const handlePlay = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    navigate(`/flashcards/view`);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-box">{error}</div>;

  return (
    <div className="flashcard-page">
      <Routes>
        <Route
          path=""
          element={
            <FlashcardList
              flashcards={flashcards}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCreate={() => navigate("/flashcards/new")}
              onPlay={handlePlay}
            />
          }
        />
        <Route
          path="new"
          element={
            <FlashcardForm
              initialQuestion=""
              initialAnswer=""
              onSubmit={handleCreate}
              loading={formLoading}
              error={submitError || formError}
            />
          }
        />
        <Route
          path="view"
          element={
            <FlashcardViewer
              flashcards={flashcards}
              currentIndex={currentIndex}
              isFlipped={isFlipped}
              onFlip={handleFlip}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          }
        />
        <Route
          path="edit/:id"
          element={
            <FlashcardForm
              initialQuestion={question}
              initialAnswer={answer}
              onSubmit={handleUpdate}
              loading={formLoading}
              error={submitError || formError}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default FlashcardPage;
