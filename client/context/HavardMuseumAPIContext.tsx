import { createContext } from "react";
import type { Record } from "../src/types/HarvardType.tsx";

const HarvardMuseumAPIContext = createContext<{
  art: Record[];
  dailyPortrait: Record;
  artMemo: Record[];
  checkbox: [];
  loadArtwork: (id: string) => { artwork?: Record; error?: string };
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
} | null>(null);

export default HarvardMuseumAPIContext;
