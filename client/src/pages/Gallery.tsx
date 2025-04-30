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
          console.log(artMemo.people?.[0]?.name);
          return (
            <div key={artMemo.objectid} className="case">
              <img src={artMemo.primaryimageurl} alt={artMemo.title} />
              <p className={"b"}>{artMemo.title}</p>
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
