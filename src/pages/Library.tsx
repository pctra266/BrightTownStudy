import LibraryBackGround from "../assets/images/newLibrary.jpg";
import Fog from "../assets/images/Fog.png";
import Spakle from "../assets/images/Sparkle.png";
import Owl from "../assets/images/Owl.png";
import Scroll from "../assets/images/Scroll.png";
import "./Library.css";
import Flashcards from "../features/Flashcard/Flashcards";
const Library = () => {
  return (
    <div
      className=" min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center  py-12
      "
      style={{ backgroundImage: `url(${LibraryBackGround})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <img
          src={Fog}
          className="absolute  left-[20%]  w-[400px]  animate-fog1"
        />
        <img
          src={Fog}
          className="absolute  left-[70%] w-[350px] animate-fog2"
        />
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
        <img
          src={Fog}
          className="fixed top-[55%] left-[-15%] w-[1000px] opacity-80 animate-fogHero"
        />
      </div>
      <img
        src={Spakle}
        alt="Sparkle Layer"
        className="absolute inset-0 w-full h-full object-cover animate-twinkle pointer-events-none z-10"
      />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-hidden ">
        <img
          src={Owl}
          className="absolute rotate-[25deg]  top-[10%] right-[0%] w-[15%] mix-blend-screen animate-owlFloat"
          alt="Floating Book"
        />
      </div>
      <div className="relative w-full ">
        <img src={Scroll} className="w-full" alt="Scroll Background" />
        <div className="absolute top-[16%] left-[11%] w-[78%] h-[70%] flex-col flex justify-center items-center gap-8 ">
          <Flashcards />
        </div>
      </div>
    </div>
  );
};

export default Library;
