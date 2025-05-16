import { createContext, useContext, useEffect, useState } from "react";
import type { Exhibition } from "../src/types/ExhibitionType";

const ExhibitionContext = createContext<{
  exhibition: Exhibition[];
  setExhibition: React.Dispatch<React.SetStateAction<Exhibition[]>>;
} | null>(null);

export function ExhibitionProvider({
  children,
}: { children: React.ReactNode }) {
  const [exhibition, setExhibition] = useState<Exhibition[]>([]);

  // Fetch exhibition data from the API
  // Adjust the URL and fetch logic as per your API
  useEffect(() => {
    async function fetchExhibition() {
      const res = await fetch(" https://www.eventbriteapi.com/v3.");
      const data = await res.json();
      // Adjust this line based on your API response structure
      setExhibition(data.records);
    }
    fetchExhibition();
  }, []);

  return (
    <ExhibitionContext.Provider value={{ exhibition, setExhibition }}>
      {children}
    </ExhibitionContext.Provider>
  );
}

export const useExhibition = () => {
  const value = useContext(ExhibitionContext);
  if (value == null) {
    throw new Error("useExhibition must be used within <ExhibitionProvider>");
  }
  return value;
};

export default ExhibitionContext;
