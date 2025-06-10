import { useState, useEffect } from "react";
import Flashcard from "./FlashcardItem";
import type { FlashcardItem, FlashcardSet } from "../types";

interface FlashcardFormProps {
  FlashcardSet?: FlashcardSet;
  onSubmit: (data: any) => void;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({
  FlashcardSet,
  onSubmit,
}) => {
  const [name, setName] = useState(FlashcardSet?.name || "");
  const [description, setDescription] = useState(
    FlashcardSet?.description || ""
  );
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(
    FlashcardSet?.flashcards || [
      { id: "", question: "", answer: "" },
      { id: "", question: "", answer: "" },
    ]
  );

  const minimumFlashcards = 2;

  useEffect(() => {
    if (FlashcardSet) {
      setName(FlashcardSet.name);
      setDescription(FlashcardSet.description);
      setFlashcards(
        Array.isArray(FlashcardSet.flashcards) &&
          FlashcardSet.flashcards.length > 0
          ? FlashcardSet.flashcards
          : [
              { id: "", question: "", answer: "" },
              { id: "", question: "", answer: "" },
            ]
      );
    }
  }, [FlashcardSet]);

  const addMoreCard = () => {
    setFlashcards((prev) => [...prev, { id: "", question: "", answer: "" }]);
  };

  const handleDelete = (index: number) => {
    if (flashcards.length <= minimumFlashcards) {
      alert("You must have at least two flashcards.");
    } else {
      setFlashcards((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<FlashcardSet, "id"> = {
      name: name.trim(),
      description: description.trim(),
      flashcards: flashcards
        .filter((f) => f.question.trim() !== "" || f.answer.trim() !== "")
        .map((f) => ({
          id: f.id || crypto.randomUUID(),
          question: f.question.trim(),
          answer: f.answer.trim(),
        })),
    };

    if (FlashcardSet?.id) {
      onSubmit({ ...payload, id: FlashcardSet.id });
    } else {
      onSubmit(payload);
    }
  };

  const updateCard = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFlashcards((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-center">
            {FlashcardSet?.id ? "Edit study set" : "Create a new study set"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter a title..."
                className="w-full px-4 py-3 text-lg border-b-2 border-gray-300 focus:outline-none focus:border-[#1976D2] transition-colors"
              />
            </div>

            <div>
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Add a description..."
                className="w-full px-4 py-3 text-lg border-b-2 border-gray-300 focus:outline-none focus:border-[#1976D2]  transition-colors"
              />
            </div>
          </div>

          {/* Flashcards */}
          <div className="space-y-4">
            {flashcards.map((flashcard, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 "
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-700">
                    {index + 1}
                  </span>
                  {flashcards.length > minimumFlashcards && (
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <textarea
                      value={flashcard.question}
                      onChange={(e) =>
                        updateCard(index, "question", e.target.value)
                      }
                      placeholder="Enter term"
                      className="w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none focus:border-[#1976D2] resize-none  transition-colors"
                      rows={2}
                    />
                    <p className="text-xs text-gray-500 mt-1">TERM</p>
                  </div>

                  <div>
                    <textarea
                      value={flashcard.answer}
                      onChange={(e) =>
                        updateCard(index, "answer", e.target.value)
                      }
                      placeholder="Enter definition"
                      className="w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none focus:border-[#1976D2] resize-none  transition-colors"
                      rows={2}
                    />
                    <p className="text-xs text-gray-500 mt-1">DEFINITION</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Card Button */}
            <button
              type="button"
              onClick={addMoreCard}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#1976D2] hover:text-[#1976D2] transition-colors flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Add card
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-[#1976D2] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {FlashcardSet?.id ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlashcardForm;
