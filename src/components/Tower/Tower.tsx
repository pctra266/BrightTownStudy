import { Link } from "react-router-dom";
interface TowerProp{
  srcImage:string,
  nameTower:string,
  path:string
}

const Tower:React.FC<TowerProp> = ({srcImage,nameTower,path}) => {
  return (
    <div className="relative h-full inline-block glow-on-hover">
    <Link to={path} className="h-full inline-block">
      <img
        src={srcImage}
        alt={nameTower}
        className="h-full object-contain "
      />
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white px-4 py-1 text-lg font-bold text-shadow-stroke">
        {nameTower}
      </h2>
    </Link>
  </div>
  )
}

export default Tower