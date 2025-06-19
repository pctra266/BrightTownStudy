import InspirationHall from "../assets/images/InspirationHall.png";
import BackGround from "../components/Background/BackGround";
import Tower from "../components/Tower/Tower";


const Home = () => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-blue-400 overflow-hidden p-4 flex flex-col gap-4 justify-center">
      <BackGround></BackGround>
      <div className="relative z-10">
        <div className="flex justify-center gap-16 h-[300px]">
          <Tower srcImage={InspirationHall} nameTower={"Library"} path={"/library"} ></Tower>
          <Tower srcImage={InspirationHall} nameTower={"Inspiration"} path={"/inspo"} ></Tower>
        </div>
        <div className="flex justify-center items-center h-[300px]">
          <Tower srcImage={InspirationHall} nameTower={"Discussion"} path={"/talk"} ></Tower>
        </div>
      </div>
    </div>
  );
};

export default Home;
