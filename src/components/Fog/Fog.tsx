import FogImg from "../../assets/images/Fog.png";
import "./Fog.css"

const Fog = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <img src={FogImg} className="absolute left-[20%] w-[400px] animate-fog1" />
      <img src={FogImg} className="absolute left-[70%] w-[350px] animate-fog2" />
      <img src={FogImg} className="absolute left-[10%] w-[450px] animate-fog3" />
      <img src={FogImg} className="absolute left-[-5%] opacity-30 w-[400px] animate-fog4" />
      <img src={FogImg} className="absolute left-[75%] w-[350px] animate-fog5" />
      <img src={FogImg} className="fixed top-[55%] left-[-15%] w-[1000px] opacity-80 animate-fogHero" />
    </div>
  );
};

export default Fog;
