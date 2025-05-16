import { useCallback, useContext, useMemo, useState } from "react";
import { useFilter } from "../../../context/FilterContext.tsx";
import HarvardMuseumAPIContext from "../../../context/HavardMuseumAPIContext.tsx";
import type { CategoryOptions } from "../../types/SearchType.tsx";
import "../../stylesheets/normalize.css";
import "../../stylesheets/filter.css";

function FilterGallery(): React.ReactElement {
  const { filters, setFilterValue, resetFilters } = useFilter();
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCategory = (categoryName: string | null) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  const handleSearch = (category: string, term: string) => {
    setSearchTerms({ ...searchTerms, [category]: term });
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

  const normalizeOption = useCallback((option: string): string => {
    let normalized = option.trim().toLowerCase();
    normalized = normalized.startsWith("?")
      ? normalized.substring(1)
      : normalized;
    normalized = normalized.endsWith("?")
      ? normalized.slice(0, -1)
      : normalized;
    return normalized.trim();
  }, []);

  const generateUniqueNormalizedOptions = useCallback(
    (values: (string | undefined | null)[]): string[] => {
      const normalizedValues: { [key: string]: string } = {};
      const uniqueNormalizedValues: string[] = [];

      for (const value of values.filter(Boolean) as string[]) {
        const normalized = normalizeOption(value);
        if (!normalizedValues[normalized]) {
          normalizedValues[normalized] = value;
          uniqueNormalizedValues.push(value);
        }
      }

      return uniqueNormalizedValues.sort((a, b) => a.localeCompare(b));
    },
    [normalizeOption],
  );

  const categoryOptions: CategoryOptions = useMemo(
    () => ({
      category: [],
      classification: generateUniqueNormalizedOptions(
        artMemo.map((art) => art.classification),
      ),
      artist: generateUniqueNormalizedOptions(
        artMemo.map((art) => art.people?.[0]?.name),
      ),
      century: generateUniqueNormalizedOptions(
        artMemo.map((art) => art.century),
      ),
      medium: generateUniqueNormalizedOptions(artMemo.map((art) => art.medium)),
      culture: generateUniqueNormalizedOptions(
        artMemo.map((art) => art.culture),
      ),
    }),
    [artMemo, generateUniqueNormalizedOptions],
  );

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
                  <div className="dropdown-content">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search"
                      value={searchTerms[category] || ""}
                      onChange={(e) => handleSearch(category, e.target.value)}
                    />
                    <ul className="dropdown-submenu">
                      {(
                        categoryOptions[category as keyof CategoryOptions] || []
                      )
                        .filter((option) =>
                          normalizeOption(option as string).includes(
                            normalizeOption(searchTerms[category] || ""),
                          ),
                        )
                        .sort((a, b) => {
                          const isCheckedA =
                            filters?.[category]?.[a as string] || false;
                          const isCheckedB =
                            filters?.[category]?.[b as string] || false;
                          if (isCheckedA && !isCheckedB) {
                            return -1;
                          }
                          if (!isCheckedA && isCheckedB) {
                            return 1;
                          }
                          return (a as string).localeCompare(b as string);
                        })
                        .map((option) => (
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
                        ))}
                    </ul>
                  </div>
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
