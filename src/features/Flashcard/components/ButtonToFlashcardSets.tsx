import { useNavigate } from "react-router-dom";

const ButtonToFlashcardSets = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/flashcard")}>Back</button>;
};

export default ButtonToFlashcardSets;
