import { createContext } from "react";
import type { Record } from "../src/types/HarvardType.tsx";

const HarvardMuseumAPIContext = createContext<{
  art: Record[];
  setArt: React.Dispatch<React.SetStateAction<Record[]>>;
  dailyPortrait: Record | null;
} | null>(null);

export default HarvardMuseumAPIContext;
