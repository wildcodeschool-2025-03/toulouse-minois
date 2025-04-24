import { useContext } from "react";
import HarvardMuseumAPIContext from "../../context/HavardMuseumAPIContext.tsx";

function Gallery() {
  const context = useContext(HarvardMuseumAPIContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { art } = context;

  return (
    <div>
      {art.map((art) => {
        if (art.primaryimageurl) {
          return (
            <div key={art.objectid} className="case">
              <img src={art.primaryimageurl} alt={art.title} />
              <p>{art.title}</p>
              <p>{art.dimensions}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
export default Gallery;
