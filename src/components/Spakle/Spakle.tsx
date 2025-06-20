import SpakleImage from "../../assets/images/Sparkle.png";
import "./Spakle.css"

const Spakle = () => {
  return (
    <img
    src={SpakleImage}
    alt="Sparkle Layer"
    className="absolute inset-0 w-full h-full object-cover animate-twinkle pointer-events-none z-10"
  />
  )
}

export default Spakle