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
      <img src={artwork.primaryimageurl} alt={artwork.title} />
      <h1>{artwork.title || "Unknown title"}</h1>
      <h2>
        <strong>Work Id :</strong> {artwork.id || "Unknown"}
      </h2>
      <h2>
        <strong>Artist: </strong>
        {artwork.people?.[0]?.displayname || "Unknown"}
      </h2>
      <h2>
        <strong>Culture: </strong>
        {artwork.people?.[0]?.culture || "Unknown"}
      </h2>
      <h2>
        <strong>Style :</strong> {artwork.classification || "Unknown"}
      </h2>
      <h2>
        <strong>Period :</strong> {artwork.dated || "Unknown"}
      </h2>
      <h2>
        <strong>Accession year :</strong> {artwork.accessionyear || "Unknown"}
      </h2>
      <h2>
        <strong>Technical :</strong> {artwork.technique || "Unknown"}
      </h2>
      <h2>
        <strong>Medium :</strong> {artwork.medium || "Unknown"}
      </h2>
      <h2>
        <strong>Dimensions :</strong> {artwork.dimensions || "Unknown"}
      </h2>
      <h2>
        <strong>Colors: </strong>{" "}
        <p>Color count: {artwork.colorcount || "Unknown"}</p>
        <p>Hexadecimal color code: {artwork.colors?.[0]?.color || "Unknown"}</p>
        <p>Spectrum color: {artwork.colors?.[0]?.spectrum || "Unknown"}</p>
        <p>Tint color: {artwork.colors?.[0]?.hue || "Unknown"}</p>
        <p>Percent color: {artwork.colors?.[0]?.percent || "Unknown"}</p>
      </h2>
      <h2>
        <strong>Division :</strong> {artwork.division || "Unknown"}
      </h2>
      <h2>
        <strong>Credit line :</strong> {artwork.creditline || "Unknown"}
      </h2>
      <h2>
        <strong>Contact :</strong> {artwork.contact || "Unknown"}
      </h2>
      <h2>
        <strong>Copyright :</strong> {artwork.copyright || "Unknown"}
      </h2>
    </div>
  );
}

export default ArtDetail;
