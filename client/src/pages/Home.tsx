import { useContext } from "react";
import HarvardMuseumAPIContext from "../../context/HavardMuseumAPIContext.tsx";

function Home() {
  const context = useContext(HarvardMuseumAPIContext);

  if (!context) {
    return <p>Error: Context not available</p>;
  }

  const { dailyPortrait } = context;

  if (!dailyPortrait) {
    return <p>Loading...</p>;
  }
  return (
    <main>
      <div>
        <h1>Portrait of the Day</h1>
        <img
          src={dailyPortrait.primaryimageurl}
          alt={dailyPortrait.title}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <h2>{dailyPortrait.title}</h2>
        <p>Artist: {dailyPortrait.people?.[0]?.name || "Unknown"}</p>
      </div>
      <div>
        <h2>Welcome to Minois</h2>
        <p>
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
