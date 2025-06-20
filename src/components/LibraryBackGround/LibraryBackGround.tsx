import Fog from "../Fog/Fog";
import Sparkle from "../Spakle/Spakle";
import Owl from "../Owl/Owl";
import Scroll from "../../assets/images/Scroll.png";
import LibraryBackGroundImg from "../../assets/images/newLibrary.jpg";

interface LibraryBackGroundProps {
  children: React.ReactNode;
}

const LibraryBackGround = ({ children }: LibraryBackGroundProps) => {
  return (
    <div
      className=" min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center py-12"
      style={{ backgroundImage: `url(${LibraryBackGroundImg})` }}
    >
      <Fog></Fog>
      <Sparkle></Sparkle>
      <Owl></Owl>
      <div className="relative w-full">
        <img src={Scroll} className="w-full" alt="Scroll Background" />
        <div className="absolute top-[16%] left-[11%] w-[78%] h-[70%] flex-col flex justify-center items-center gap-8 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LibraryBackGround;
