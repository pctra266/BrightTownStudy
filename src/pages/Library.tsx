import { useNavigate } from "react-router-dom";
import LibraryBackGround from "../assets/images/newLibrary.jpg";
import Fog from "../assets/images/Fog.png";
import Spakle from "../assets/images/Sparkle.png";
import Owl from "../assets/images/Owl.png";
import Scroll from "../assets/images/Scroll.png";
import Pomo from "../assets/images/PomodoroIcon.png";
import Flashcard from "../assets/images/FlashcardIcon.png";
import "./Library.css";

const Library = () => {
  const navigate = useNavigate();

  return (
    <div
      className=" min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-12
      "
      style={{ backgroundImage: `url(${LibraryBackGround})` }}
    >
      {/* Fog Layer - minimal version */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Fog phía trên */}
        <img
          src={Fog}
          className="absolute  left-[20%]  w-[400px]  animate-fog1"
        />
        <img
          src={Fog}
          className="absolute  left-[70%] w-[350px] animate-fog2"
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
          className="fixed top-[55%] left-[-15%] w-[1000px] opacity-80 animate-fogHero"
        />
      </div>
      {/* Sparkle Layer */}
      <img
        src={Spakle} // bạn đổi lại path nếu ảnh khác
        alt="Sparkle Layer"
        className="absolute inset-0 w-full h-full object-cover animate-twinkle pointer-events-none z-10"
      />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-hidden ">
        <img
          src={Owl}
          className="absolute rotate-[25deg]  bottom-[50%] right-[0%] w-[20%] mix-blend-screen  animate-bookFloat3"
          alt="Floating Book"
        />
      </div>
      <div className="relative w-[60%] right-[0%]  animate-bookFloat1">
        <img src={Scroll} className="w-full" alt="Scroll Background" />

        {/* Content container */}
        <div className="absolute top-[15%] left-[10%] w-[78%] h-[70%] flex-col flex justify-center items-center gap-8 ">
          <div
            onClick={() => navigate("/flashcard")}
            className="grayscale cursor-pointer glow-on-hover flex items-center justify-center "
          >
            <img src={Flashcard} className="w-[120px]" alt="Flashcard Icon" />
            <p>
              Summon your scrolls and challenge your mind! Review mystical
              knowledge through interactive flashcards crafted to sharpen memory
              and unlock ancient truths.
            </p>
          </div>

          <div
            onClick={() => alert("not develop yet")}
            className="grayscale cursor-pointer glow-on-hover  flex items-center justify-center"
          >
            <img src={Pomo} className="w-[120px]" alt="Pomodoro Icon" />{" "}
            <p>
              Enter the sacred time loop. Focus deeply for 25 minutes, then
              rest. A method proven by the ancients to boost clarity, banish
              distraction, and maintain study stamina.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
