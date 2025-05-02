import { createContext, useContext } from "react";

export interface FilterState {
  filters: {
    [category: string]: {
      [option: string]: boolean;
    };
  };
  setFilterValue: (category: string, option: string, checked: boolean) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterState | undefined>(undefined);

export const Filter = FilterContext;

export const useFilter = () => {
  const context = useContext(Filter);
  if (!context) {
    throw new Error("Chargement de <Filter.Provider>");
  }
  return context;
};

export default FilterContext;
