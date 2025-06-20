import "./Owl.css"
import OwlImage from "../../assets/images/Owl.png";

const Owl = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-hidden ">
    <img
      src={OwlImage}
      className="absolute rotate-[25deg]  top-[10%] right-[0%] w-[15%] mix-blend-screen animate-owlFloat"
      alt="Floating Book"
    />
  </div>
  )
}

export default Owl