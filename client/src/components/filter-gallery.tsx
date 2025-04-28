import { useContext } from "react";
import HarvardMuseumAPIContext from "../../context/HavardMuseumAPIContext.tsx";

function filterGallery() {
  const context = useContext(HarvardMuseumAPIContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  return <h1>hello world</h1>;
}

export default filterGallery();
