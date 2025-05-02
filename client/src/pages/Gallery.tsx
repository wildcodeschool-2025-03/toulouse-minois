import { useContext } from "react";
import { useFilter } from "../../context/FilterContext";
import HarvardMuseumAPIContext from "../../context/HavardMuseumAPIContext.tsx";

function Gallery() {
  const context = useContext(HarvardMuseumAPIContext);
  const { filters } = useFilter(); // Accès à l'état filters

  if (!context) {
    return <div>Loading...</div>;
  }

  const { artMemo } = context;

  const filteredArtMemo = artMemo.filter((art) => {
    let matchesAllCategories = true;

    for (const category in filters) {
      const selectedOptions = filters[category];
      let artValue: string | string[] | undefined;

      if (category === "artist") {
        artValue = art.people?.[0]?.name;
      } else if (
        typeof art[category as keyof typeof art] === "string" ||
        Array.isArray(art[category as keyof typeof art])
      ) {
        artValue = art[category as keyof typeof art] as
          | string
          | string[]
          | undefined;
      } else {
        artValue = undefined;
      }

      if (
        selectedOptions &&
        Object.keys(selectedOptions).some((key) => selectedOptions[key])
      ) {
        let matchesCategory = false;
        for (const option in selectedOptions) {
          if (selectedOptions[option]) {
            if (
              typeof artValue === "string" &&
              artValue?.toLowerCase() === option.toLowerCase()
            ) {
              matchesCategory = true;
              break;
            }
            if (
              Array.isArray(artValue) &&
              artValue.some(
                (item) => item?.toLowerCase() === option.toLowerCase(),
              )
            ) {
              matchesCategory = true;
              break;
            }
          }
        }
        if (!matchesCategory) {
          matchesAllCategories = false;
          break;
        }
      }
    }
    return matchesAllCategories;
  });

  console.log("Résultats filtrés :", filteredArtMemo);

  return (
    <div className="gallery">
      {filteredArtMemo.map((art) => {
        if (art.primaryimageurl) {
          return (
            <div key={art.objectid} className="case">
              <img src={art.primaryimageurl} alt={art.title} />
              <p className={"b"}>{art.title}</p>
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
