import { useCallback, useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import HarvardMuseumAPIContext from "../context/HavardMuseumAPIContext.tsx";
import type { Record } from "./types/HarvardType.tsx";
import "./App.css";

const subject = "portrait";
const classificationA = "Paintings";
const classificationB = "Photographs";
const packageSize = 100;
const page = 1;

function App() {
  const [art, setArt] = useState<Record[]>([]);
  const [dailyPortrait, setDailyPortrait] = useState<Record>({} as Record);

  const harvardMuseumApiFetch = useCallback(async () => {
    const urlHarvard = `https://api.harvardartmuseums.org/object?apikey=${import.meta.env.VITE_REACT_APP_HARVARD_MUSEUM_API}&q=classification=${classificationA}&q=classification=${classificationB}&keyword=${subject}&size=${packageSize}&page=${page}`;
    const fetchHarvard = await fetch(urlHarvard);
    const artHarvard = await fetchHarvard.json();
    setArt(artHarvard.records);
  }, []);

  const selectRandomPortrait = useCallback(() => {
    if (art?.length > 0) {
      const randomIndex = Math.floor(Math.random() * art.length);
      setDailyPortrait(art[randomIndex]);
    }
  }, [art]);

  useEffect(() => {
    selectRandomPortrait();
    const interval = setInterval(
      () => {
        selectRandomPortrait();
      },
      15 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [selectRandomPortrait]);

  useEffect(() => {
    harvardMuseumApiFetch();
  }, [harvardMuseumApiFetch]);

  return (
    <HarvardMuseumAPIContext.Provider value={{ art, setArt, dailyPortrait }}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Gallery">Gallery</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </HarvardMuseumAPIContext.Provider>
  );
}

export default App;
