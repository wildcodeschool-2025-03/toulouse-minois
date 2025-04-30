import { useContext, useState } from "react";
import HarvardMuseumAPIContext from "../../../context/HavardMuseumAPIContext.tsx";
import type { CategoryOptions } from "../../types/SearchType.tsx";
import "../../stylesheets/normalize.css";
import "../../stylesheets/filter.css";

function FilterGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCategory = (categoryName: string | null) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  const context = useContext(HarvardMuseumAPIContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { artMemo } = context;
  const categoriesData = [
    "classification",
    "artist",
    "century",
    "medium",
    "culture",
  ];

  const categoryOptions: CategoryOptions = {
    category: [],
    classification: [...new Set(artMemo.map((art) => art.classification))],
    artist: [
      ...new Set(artMemo.map((art) => art.people?.[0]?.name).filter(Boolean)),
    ],
    century: [...new Set(artMemo.map((art) => art.century))],
    medium: [...new Set(artMemo.map((art) => art.medium))],
    culture: [...new Set(artMemo.map((art) => art.culture))],
  };

  return (
    <div className="search-body">
      <div className="search-button-body">
        <button onClick={toggleMenu} className="search-button" type="button">
          Search
        </button>
      </div>
      {isOpen && (
        <div className="search-menu">
          {categoriesData.map((category) => (
            <div key={category} className="search-category">
              <button
                onClick={() => toggleCategory(category)}
                className="category-button"
                type="button"
              >
                {category}
              </button>
              {openCategory === category && (
                <ul className="dropdown-submenu">
                  {categoryOptions[category as keyof CategoryOptions]?.map(
                    (option) => (
                      <li key={option as string}>
                        <label className="checkbox-label">
                          <input type="checkbox" className="checkbox-input" />
                          {option}
                        </label>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterGallery;
