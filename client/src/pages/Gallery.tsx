import { useContext } from "react";
import { Link } from "react-router";
import { useFilter } from "../../context/FilterContext";
import HarvardMuseumAPIContext from "../../context/HavardMuseumAPIContext.tsx";
import InfiniteScroll from "../components/InfiniteScroll/InfiniteScroll.tsx";

function Gallery() {
  const context = useContext(HarvardMuseumAPIContext);

  const { filters } = useFilter();

  if (!context) {
    return <div>Loading...</div>;
  }

  const { artMemo, fetchNextPage, hasNextPage, isFetchingNextPage } = context;

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

  const generateSlug = (artistName?: string) => {
    return artistName
      ? artistName.toLowerCase().replace(/[\s-']/g, "-")
      : "unknown-artist";
  };

  return (
    <div className="gallery">
      {filteredArtMemo.map((art) => {
        const artistSlug = generateSlug(art.people?.[0]?.name);
        const artworkId = art.objectid;
        return (
          <div key={art.objectid} className="case">
            <Link to={`/${artistSlug}/${artworkId}`}>
              <img src={art.primaryimageurl} alt={art.title} />
            </Link>
          </div>
        );
      })}
      <InfiniteScroll
        fetchNextPage={fetchNextPage || (() => {})}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage ?? false}
      />
    </div>
  );
}
export default Gallery;
