import { createContext } from "react";
import type { Record } from "../src/types/HarvardType.tsx";

const HarvardMuseumAPIContext = createContext<{
  art: Record[];
  dailyPortrait: Record;
  artMemo: Record[];
  checkbox: [];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
} | null>(null);

export default HarvardMuseumAPIContext;
