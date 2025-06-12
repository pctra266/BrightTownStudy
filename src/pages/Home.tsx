import { Link } from "react-router-dom";
import "./Home.css";
import InspirationHall from "../assets/images/InspirationHall.png";
import Cloud from "../assets/images/Cloud.png";
import Balloon from "../assets/images/Ballon.png";

const Home = () => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-blue-400 overflow-hidden p-4 flex flex-col gap-4 justify-center">
      {/* Background layer các đám mây, chim */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Bên trái */}
        <img
          src={Balloon}
          className="absolute top-[75%] left-[2%] w-[170px] opacity-80 animate-balloon3 hidden md:block"
        />

        {/* Bên phải */}
        <img
          src={Balloon}
          className="absolute top-[15%] right-[10%] w-[90px] opacity-90 animate-balloon2 hidden md:block"
        />
        <img
          src={Balloon}
          className="absolute top-[70%] right-[2%] w-[75px] opacity-80 animate-balloon1 hidden md:block"
        />

        {/* Đám mây */}
        {/* Mây động: bay từ trái sang phải */}
        <img
          src={Cloud}
          className="absolute top-[5%] left-[-300px] w-[160px] opacity-80 blur-sm animate-cloud1 hidden md:block"
        />
        <img
          src={Cloud}
          className="absolute top-[75%] left-[-290px] w-[150px] opacity-80 blur-[1px] animate-cloud7 hidden md:block"
        />

        {/* Mây tĩnh bồng bềnh ngay giữa màn hình */}
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

        {/* Mây mờ xa xa ở tầng thấp hơn */}
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
      <div className="relative z-10">
        {/* Hàng 1: 2 ảnh */}
        <div className="flex justify-center gap-16 h-[300px]">
          <div className="relative h-full inline-block  glow-on-hover">
            <Link to="/library" className="h-full inline-block">
              <img
                src={InspirationHall}
                alt="Library"
                className="h-full object-contain"
              />
              <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white px-4 py-1 text-lg font-bold text-shadow-stroke">
                Library
              </h2>
            </Link>
          </div>

          <div className="relative h-full inline-block glow-on-hover">
            <Link to="/inspo" className="h-full inline-block">
              <img
                src={InspirationHall}
                alt="Inspo"
                className="h-full object-contain "
              />
              <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white px-4 py-1 text-lg font-bold text-shadow-stroke">
                Inspiration
              </h2>
            </Link>
          </div>
        </div>

        {/* Hàng 2: 1 ảnh căn giữa */}
        <div className="flex justify-center items-center h-[300px]">
          <div className="relative h-full inline-block glow-on-hover">
            <Link to="/talk" className="h-full inline-block">
              <img
                src={InspirationHall}
                alt="Talk"
                className="h-full object-contain "
              />
              <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white px-4 py-1 text-lg font-bold text-shadow-stroke">
                Discussion
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
