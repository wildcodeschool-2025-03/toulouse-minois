import { useContext } from "react";
import { Link } from "react-router";
import HarvardMuseumAPIContext from "../../context/HavardMuseumAPIContext.tsx";
import "../stylesheets/Home.css";

const generateSlug = (artistName?: string) => {
  return artistName
    ? artistName.toLowerCase().replace(/[\s-']/g, "-")
    : "unknown-artist";
};

function Home() {
  const context = useContext(HarvardMuseumAPIContext);

  if (!context) {
    return <p>Loading...</p>;
  }

  const { dailyPortrait } = context;
  const artistSlug = generateSlug(dailyPortrait?.people?.[0]?.name);
  const artworkId = dailyPortrait?.objectid;

  return (
    <main style={{ margin: "2vw" }}>
      <h1 className="home-h1">Portrait of the Day</h1>
      <div className="home-div">
        <Link to={`/${artistSlug}/${artworkId}`}>
          <img
            className="home-img"
            src={dailyPortrait?.primaryimageurl}
            alt={dailyPortrait?.title}
            style={{ height: "50vh" }}
          />
          <h2 className="home-h2">{dailyPortrait?.title}</h2>
          <p className="home-p">
            Artist: {dailyPortrait?.people?.[0]?.name || "Unknown"}
          </p>
        </Link>
      </div>
      <div className="home-div">
        <h2 className="home-h2">Welcome to Minois</h2>
        <p className="home-p">
          If you are on this website, that's you love art and specificly
          portrait. Cool we too! Through great museum collections that we
          selected, discover or rediscover portraits created by a lot of artists
          during time and history. A lost of tecnicals like photography,
          watercolor, paint, ... are used and testifies multitude of expression
          who turns around the same subject, portrait. Soul reflect, portrait is
          time and history witness of a little bit of life, fixed who evoke,
          suggest and sometimes upset. The portrait, however frozen it may be,
          stay alive by emotions is emerging. Sometimes he can be a legacy
          guardian. A challenge for artists who capture face expressions, try to
          ensure moment person authenticity. Curious friends this website is for
          you and for your discover pleasure.
          {"."}
        </p>
      </div>
    </main>
  );
}

export default Home;
