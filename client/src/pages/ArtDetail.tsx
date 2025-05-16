import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import HarvardMuseumAPIContext from "../../context/HavardMuseumAPIContext.tsx";

const generateSlug = (artistName?: string) => {
  return artistName
    ? artistName.toLowerCase().replace(/[\s-']/g, "-")
    : "unknown-artist";
};

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

  const currentArtistName = artwork.people?.[0]?.displayname;

  const sameArtistArtworks = currentArtistName
    ? artMemo.filter(
        (art) =>
          art.objectid !== artwork.objectid &&
          art.people?.some(
            (person) => person.displayname === currentArtistName,
          ),
      )
    : [];

  return (
    <div className="artwork-container">
      <div className="main-section">
        <div className="image-container">
          {artwork.primaryimageurl ? (
            <img
              src={artwork.primaryimageurl}
              alt={artwork.title || "Artwork image"}
              className="artwork-image"
            />
          ) : (
            <div className="artwork-image placeholder">No Image Available</div>
          )}
        </div>

        <div className="info-container">
          {artwork.people?.[0]?.displayname && (
            <h2>{artwork.people[0].displayname}</h2>
          )}
          <h1>{artwork.title || "Unknown Title"}</h1>
          {artwork.dated && <h2>{artwork.dated}</h2>}
        </div>
      </div>

      <div className="info-blocks">
        {/* Block A: Paint Details */}
        <div className="info-block">
          <h3>Paint</h3>
          {artwork.dated && (
            <p>
              <strong>Dated:</strong> {artwork.dated}
            </p>
          )}
          {artwork.dimensions && (
            <p>
              <strong>Dimensions:</strong> {artwork.dimensions}
            </p>
          )}
          {artwork.medium && (
            <p>
              <strong>Medium:</strong> {artwork.medium}
            </p>
          )}
          {artwork.classification && (
            <p>
              <strong>Classification:</strong> {artwork.classification}
            </p>
          )}
          {artwork.century && (
            <p>
              <strong>Century:</strong> {artwork.century}
            </p>
          )}
        </div>

        {/* Block B: Contexte Details */}
        <div className="info-block">
          <h3>Contexte</h3>
          {artwork.accessionyear != null && (
            <p>
              <strong>Accession Year:</strong> {artwork.accessionyear}
            </p>
          )}
          {artwork.accessionmethod && (
            <p>
              <strong>Accession Method:</strong> {artwork.accessionmethod}
            </p>
          )}
          {artwork.creditline && (
            <p>
              <strong>Credit Line:</strong> {artwork.creditline}
            </p>
          )}
          {artwork.provenance && (
            <p>
              <strong>Provenance:</strong> {artwork.provenance}
            </p>
          )}
        </div>

        {/* Block C: Artist Details */}
        <div className="info-block">
          <h3>Artist</h3>
          {artwork.people?.[0]?.displayname && (
            <p>
              <strong>Name:</strong> {artwork.people[0].displayname}
            </p>
          )}
          {artwork.people?.[0]?.gender && (
            <p>
              <strong>Gender:</strong> {artwork.people?.[0]?.gender}
            </p>
          )}
          {artwork.people?.[0]?.role && (
            <p>
              <strong>Role:</strong> {artwork.people[0].role}
            </p>
          )}
          {artwork.people?.[0]?.culture && (
            <p>
              <strong>Culture:</strong> {artwork.people[0].culture}
            </p>
          )}
          {artwork.people?.[0]?.displaydate && (
            <p>
              <strong>Dates:</strong> {artwork.people[0].displaydate}
            </p>
          )}
          {artwork.people?.[0]?.birthplace && (
            <p>
              <strong>Birthplace:</strong> {artwork.people[0].birthplace}
            </p>
          )}
          {artwork.people?.[0]?.deathplace && (
            <p>
              <strong>Deathplace:</strong> {artwork.people[0].deathplace}
            </p>
          )}
        </div>

        {/* Block D: Conservations Details */}
        <div className="info-block">
          <h3>Conservations</h3>
          {artwork.verificationleveldescription && (
            <p>
              <strong>Data Verification Level:</strong>{" "}
              {artwork.verificationleveldescription}
            </p>
          )}
          {artwork.state && (
            <p>
              <strong>Object State:</strong> {artwork.state}
            </p>
          )}
          <p>Note: Specific conservation history not always available.</p>
        </div>

        {/* Block E: Exhibition Details */}
        <div className="info-block">
          <h3>Exhibition</h3>
          {artwork.exhibitioncount != null && (
            <p>
              <strong>Exhibition Count:</strong> {artwork.exhibitioncount}
            </p>
          )}
        </div>
      </div>

      <div className="same-artist-section">
        <h2>Same artist</h2>
        <div className="same-artist-gallery">
          {sameArtistArtworks.length > 0 ? (
            sameArtistArtworks.map((relatedArt) => (
              <Link
                to={`/${generateSlug(relatedArt.people?.[0]?.displayname)}/${relatedArt.objectid}`}
                className="gallery-item"
                key={relatedArt.objectid}
              >
                {relatedArt.primaryimageurl ? (
                  <img
                    src={relatedArt.primaryimageurl}
                    alt={relatedArt.title || "Related artwork image"}
                  />
                ) : (
                  <div className="gallery-item placeholder">
                    {relatedArt.title || relatedArt.objectnumber || "Image"}
                  </div>
                )}
              </Link>
            ))
          ) : (
            <p>No other artworks found by this artist.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtDetail;
