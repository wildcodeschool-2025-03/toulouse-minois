import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { Filter } from "../../../context/FilterContext.tsx";
import type { FilterState } from "../../../context/FilterContext.tsx";

interface Props {
  children: React.ReactNode;
}

const USER_ID_COOKIE_NAME = "user_session_id";
const FILTER_STORAGE_KEY_PREFIX = "filters_session_";
const COOKIE_EXPIRATION_DAYS = 2;

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    [category: string]: { [option: string]: boolean };
  }>({});

  useEffect(() => {
    const existingUserId = Cookies.get(USER_ID_COOKIE_NAME);
    if (existingUserId) {
      setUserId(existingUserId);
    } else {
      const newUserId = Math.random().toString(36).substring(2, 15); // Générer un ID aléatoire
      Cookies.set(USER_ID_COOKIE_NAME, newUserId, {
        expires: COOKIE_EXPIRATION_DAYS,
      });
      setUserId(newUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const storedFilters = localStorage.getItem(
        FILTER_STORAGE_KEY_PREFIX + userId,
      );
      if (storedFilters) {
        try {
          setFilters(JSON.parse(storedFilters));
        } catch (error) {
          console.error(
            "Erreur lors de la lecture des filtres depuis le localStorage",
            error,
          );
        }
      }
    }
  }, [userId]);

  const setFilterValue = useCallback(
    (category: string, option: string, checked: boolean) => {
      setFilters((prevFilters) => {
        const updatedFilters = {
          ...prevFilters,
          [category]: {
            ...prevFilters[category],
            [option]: checked,
          },
        };

        if (userId) {
          localStorage.setItem(
            FILTER_STORAGE_KEY_PREFIX + userId,
            JSON.stringify(updatedFilters),
          );
        }
        return updatedFilters;
      });
    },
    [userId],
  );

  const resetFilters = useCallback(() => {
    setFilters({});
    if (userId) {
      localStorage.removeItem(FILTER_STORAGE_KEY_PREFIX + userId);
    }
  }, [userId]);

  const contextValue: FilterState = {
    filters,
    setFilterValue,
    resetFilters,
  };

  return <Filter.Provider value={contextValue}>{children}</Filter.Provider>;
};

export default FilterProvider;
