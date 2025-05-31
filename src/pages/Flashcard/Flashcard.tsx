import { useState, useEffect } from "react";
import api from "../../api/api";
import "./Flashcard.css";

const Flashcard = () => {
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [flashcard, setFlashcard] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await api.get("/flashcards");
      if (response.data.length > 0) {
        setFlashcards(response.data);
        setFlashcard(response.data[0]);
      } else {
        setError("Không tìm thấy flashcards nào");
      }
    } catch (err) {
      setError("Có lỗi khi tải dữ liệu từ server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      flashcards.length > 0 &&
      currentIndex >= 0 &&
      currentIndex < flashcards.length
    ) {
      setFlashcard(flashcards[currentIndex]);
      setIsFlipped(false);
    }
  }, [currentIndex, flashcards]);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      alert("Đã đến câu hỏi đầu tiên");
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("Đã đến câu hỏi cuối cùng");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-box">{error}</div>;
  }

  if (!flashcard) {
    return null;
  }

  return (
    <div className="wrapper">
      <div className="card-container" onClick={handleFlip}>
        <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
          <div className="face">
            <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
              Question:
            </div>
            <div>{flashcard.question}</div>
          </div>

          <div className="face back">
            <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
              Answer:
            </div>
            <div>{flashcard.answer}</div>
          </div>
        </div>
      </div>

      <div className="controls">
        <button
          onClick={handlePrevious}
          className="btn"
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
        <span className="counter">
          {currentIndex + 1}/{flashcards.length}
        </span>
        <button
          onClick={handleNext}
          className="btn"
          disabled={currentIndex === flashcards.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
