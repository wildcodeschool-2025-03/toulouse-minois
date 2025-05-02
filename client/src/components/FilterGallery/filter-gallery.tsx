import { useContext, useState } from "react";
import { useFilter } from "../../../context/FilterContext.tsx";
import HarvardMuseumAPIContext from "../../../context/HavardMuseumAPIContext.tsx";
import type { CategoryOptions } from "../../types/SearchType.tsx";
import "../../stylesheets/normalize.css";
import "../../stylesheets/filter.css";

function FilterGallery(): React.ReactElement {
  const { filters, setFilterValue, resetFilters } = useFilter();
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
    classification: [
      ...new Set(artMemo.map((art) => art.classification).filter(Boolean)),
    ],
    artist: [
      ...new Set(artMemo.map((art) => art.people?.[0]?.name).filter(Boolean)),
    ],
    century: [...new Set(artMemo.map((art) => art.century).filter(Boolean))],
    medium: [...new Set(artMemo.map((art) => art.medium).filter(Boolean))],
    culture: [...new Set(artMemo.map((art) => art.culture).filter(Boolean))],
  };

  return (
    <div className="search-body">
      <div className="search-button-body">
        <button onClick={toggleMenu} className="search-button" type="button">
          <span data-hover="Filter">Filter</span>
        </button>
      </div>
      {isOpen && (
        <>
          <button
            onClick={resetFilters}
            className={"search-reset"}
            type="button"
          >
            reset
          </button>
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
                            <input
                              type="checkbox"
                              className="checkbox-input"
                              name={category}
                              value={option ?? ""}
                              checked={
                                filters?.[category]?.[option ?? ""] || false
                              }
                              onChange={(event) => {
                                setFilterValue(
                                  category,
                                  option ?? "",
                                  event.target.checked,
                                );
                              }}
                            />
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
        </>
      )}
    </div>
  );
}

export default FilterGallery;
