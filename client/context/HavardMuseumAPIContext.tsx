import { createContext } from "react";
import type { Record } from "../src/types/HarvardType.tsx";

interface HarvardMuseumAPIContextValue {
  art: Record[];
  dailyPortrait: Record;
  artMemo: Record[];
  checkbox: [];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  allArtForFilters?: Record[];
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
}

const HarvardMuseumAPIContext = createContext<HarvardMuseumAPIContextValue>({
  art: [],
  dailyPortrait: {} as Record,
  artMemo: [],
  checkbox: [],
});

export default HarvardMuseumAPIContext;