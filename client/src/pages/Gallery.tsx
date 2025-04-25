import { useContext } from "react";
import HarvardMuseumAPIContext from "../../context/HavardMuseumAPIContext.tsx";

function Gallery() {
  const context = useContext(HarvardMuseumAPIContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { artMemo } = context;

  return (
    <div className="gallery">
      {artMemo.map((artMemo) => {
        if (artMemo.primaryimageurl) {
          return (
            <div key={artMemo.objectid} className="case">
              <img src={artMemo.primaryimageurl} alt={artMemo.title} />
              <p>{artMemo.title}</p>
              <p>{artMemo.people?.[0]?.name}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
export default Gallery;
