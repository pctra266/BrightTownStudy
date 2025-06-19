import "./BackGround.css"
import Cloud from "../../assets/images/Cloud.png";
import Balloon from "../../assets/images/Ballon.png";
const BackGround = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <img
          src={Balloon}
          className="absolute top-[75%] left-[2%] w-[170px] opacity-80 animate-balloon3 hidden md:block"
        />
        <img
          src={Balloon}
          className="absolute top-[15%] right-[10%] w-[90px] opacity-90 animate-balloon2 hidden md:block"
        />
        <img
          src={Balloon}
          className="absolute top-[70%] right-[2%] w-[75px] opacity-80 animate-balloon1 hidden md:block"
        />
        <img
          src={Cloud}
          className="absolute top-[5%] left-[-300px] w-[160px] opacity-80 blur-sm animate-cloud1 hidden md:block"
        />
        <img
          src={Cloud}
          className="absolute top-[75%] left-[-290px] w-[150px] opacity-80 blur-[1px] animate-cloud7 hidden md:block"
        />
        <img
          src={Cloud}
          className="absolute top-[30%] left-[20%] w-[180px] opacity-90 blur-[1px] animate-floating1 hidden md:block"
        />
        <img
          src={Cloud}
          className="absolute top-[50%] left-[45%] w-[200px] opacity-95 blur-[1px] animate-floating2 hidden md:block"
        />
        <img
          src={Cloud}
          className="absolute top-[65%] left-[60%] w-[160px] opacity-85 blur-[0.5px] animate-floating3 hidden md:block"
        />
        <img
          src={Cloud}
          className="absolute top-[40%] left-[70%] w-[140px] opacity-80 blur-[1px] animate-floating4 hidden md:block"
        />
        <img
          src={Cloud}
          className="absolute top-[20%] left-[50%] w-[170px] opacity-70 blur-[1px] animate-floating5 hidden md:block"
        />
        <img
          src={Cloud}
          className="absolute top-[80%] left-[10%] w-[220px] opacity-40 blur-[3px] animate-cloud6 hidden md:block"
        />
        <img
          src={Cloud}
          className="absolute top-[90%] left-[80%] w-[200px] opacity-35 blur-[4px] animate-cloud5 hidden md:block"
        />
        <img
          src={Cloud}
          className="absolute top-[95%] left-[60%] w-[180px] opacity-30 blur-[4px] animate-cloud7 hidden md:block"
        />
      </div>
  )
}

export default BackGround