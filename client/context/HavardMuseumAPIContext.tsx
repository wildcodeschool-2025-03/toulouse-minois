import { createContext } from "react";
import type { Record } from "../src/types/HarvardType.tsx";

const HarvardMuseumAPIContext = createContext<{
  art: Record[];
  setArt: React.Dispatch<React.SetStateAction<Record[]>>;
  dailyPortrait: Record;
  artMemo: Record[];
  checkbox: [];
} | null>(null);

export default HarvardMuseumAPIContext;
