import { useContext } from "react";
import { useParams } from "react-router-dom";
import HarvardMuseumAPIContext from "../../context/HavardMuseumAPIContext.tsx";

function ArtDetail() {
  const { id } = useParams();
  const context = useContext(HarvardMuseumAPIContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { artMemo } = context;

  const artwork = artMemo.find((art) => art.objectid === Number(id));

  if (!artwork) {
    return <div>Œuvre non trouvée.</div>;
  }

  return (
    <div>
      <h1>{artwork.title}</h1>
      <p>{artwork.description || "Aucune description disponible."}</p>
      <img src={artwork.primaryimageurl} alt={artwork.title} />
    </div>
  );
}

export default ArtDetail;
