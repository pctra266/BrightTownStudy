import FlashcardSets from "./components/FlashcardSets";
import { deleteFlashcardSet } from "./services/flashcardService";

import { useNavigate } from "react-router-dom";
import { useFlashcardSets } from "./hooks/useFlashcardSets";

import LibraryBackGround from "../../assets/images/newLibrary.jpg";
import Fog from "../../assets/images/Fog.png";

const Flashcards = () => {
  const navigate = useNavigate();

  const {flashcardSets, fetchData:fetchFlashcardSetData} = useFlashcardSets();

  const handleCreate = () => {navigate(`/flashcard/new`);};
  const handleDelete = async (id: string) => {await deleteFlashcardSet(id);fetchFlashcardSetData();};
  const handleEdit = (id: string) => {navigate(`/flashcard/edit/${id}`);};
  const handlePlay = (id: string) =>{ navigate(`/flashcard/${id}/play`);};
  return (
    <div
      className=" min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-12
      "
      style={{ backgroundImage: `url(${LibraryBackGround})`}}
    >
      {/* Fog Layer - minimal version */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -scale-z-1">
        {/* Fog phía trên */}
        <img
          src={Fog}
          className="absolute  left-[20%]  w-[400px] opacity-30 animate-fog1"
        />
        <img
          src={Fog}
          className="absolute  left-[70%] w-[350px] opacity-30 animate-fog2"
        />
  
        {/* Fog phía dưới */}
        <img
          src={Fog}
          className="absolute  left-[10%]  w-[450px] animate-fog3"
        />
        <img
          src={Fog}
          className="absolute  left-[-5%] opacity-30  w-[400px] animate-fog4"
        />
        <img
          src={Fog}
          className="absolute  left-[75%] w-[350px] animate-fog5"
        />
        {/* Fog lớn làm điểm nhấn ở đáy */}
        <img
          src={Fog}
          className="fixed top-[55%] left-[-15%] w-[1000px] opacity-30 animate-fogHero"
        />
      </div>
      <FlashcardSets
        flashcardSets={flashcardSets}
        onCreate={handleCreate}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onPlay={handlePlay}
      />
    </div>
  );
};

export default Flashcards;


