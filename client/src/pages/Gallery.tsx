import { useContext } from "react";
import HarvardMuseumAPIContext from "../../context/HavardMuseumAPIContext.tsx";

function Gallery() {
  const context = useContext(HarvardMuseumAPIContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { art } = context;

  return (
    <div className="gallery">
      {art.map((art) => {
        if (art.primaryimageurl) {
          return (
            <div key={art.objectid} className="case">
              <img src={art.primaryimageurl} alt={art.title} />
              <p>{art.title}</p>
              <p>{art.people?.[0]?.name}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
export default Gallery;
