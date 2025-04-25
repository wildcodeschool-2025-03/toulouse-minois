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
        <h2>Bienvenue sur Minois</h2>
        <p>
          Si vous avez atterri ici c'est que vous aimez l'art, et plus
          particulièrement les portraits dans l'art et ça tombe bien nous aussi.
          A travers les collections de grands musées que nous avons
          selectionner, découvrer ou redécouvrer les portraits créer par divers
          artistes dans le temps et l'histoire. De nombreuses techniques comme
          la photographie, l'aquarelle, la peinture, ... sont utiliés et
          témoignent d'une expression multiple qui tourne toujours autour d'un
          même sujet, le portrait. Reflet de l'âme, le portrait est alors le
          témoin d'un temps d'une histoire, d'un brin de vie figé qui évoque,
          suggère et bouleverse parfois. Le portrait aussi figé puisse il être
          reste ainsi vivant par les émotions qu'il fait émergé. Il est parfois
          garant du souvenir qui peut se perdre au fil du temps et des époques.
          Un défi pour les artistes qui capturent l'expression d'un visage,
          cherchant à garantir toute l'authenticité de la personne et de
          l'instant. Ami.e.s curieux et curieuse ce site est fait pour vous et
          le plaisir de découvrir ou se redécouvrir.{"."}
        </p>
      </div>
    </main>
  );
}

export default Home;
