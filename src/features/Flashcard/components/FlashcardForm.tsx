import { useState, useEffect } from "react";
import type { FlashcardItem, FlashcardSet } from "../types";
import { useAuth } from "../../../context/AuthContext";
import Flashcard from "./FlashcardItem";
import type { Image } from '../types';


interface FlashcardFormProps {
  FlashcardSet?: FlashcardSet;
  onSubmit: (data: any) => void;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({
  FlashcardSet,
  onSubmit,
}) => {
  const { user } = useAuth();
  const userId = user?.id || "";
  const minimumFlashcards = 2;
 
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

  const handleFlashcardChange = (
    index: number,
    field: 'question' | 'answer' | 'image',
    value: string | Image | null
  ) =>{
    setFlashcards(flashcards => {
      const newCards = [...flashcards];
      if (field === 'image') {
        newCards[index].image = value as Image | undefined; 
      } else {
        newCards[index][field] = value as string;
      }
      return newCards;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cards = flashcards
      .filter(f => f.question.trim() || f.answer.trim())
      .map(f => ({
        id: f.id || crypto.randomUUID(),
        question: f.question.trim(),
        answer: f.answer.trim(),
        image: f.image ?? null,    
      }));
  
    const payload: Omit<FlashcardSet, "id"> = {
      name: name.trim(),
      description: description.trim(),
      flashcards: cards,
      userId,
    };
  
    if (FlashcardSet?.id) {
      onSubmit({ ...payload, id: FlashcardSet.id });
    } else {
      onSubmit(payload);
    }
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
              <Flashcard
                key={index}
                flashcard={flashcard}
                index={index + 1}
                onDelete={() => handleDelete(index)}
                onChange={(field, value) => handleFlashcardChange(index, field, value)}
              />
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